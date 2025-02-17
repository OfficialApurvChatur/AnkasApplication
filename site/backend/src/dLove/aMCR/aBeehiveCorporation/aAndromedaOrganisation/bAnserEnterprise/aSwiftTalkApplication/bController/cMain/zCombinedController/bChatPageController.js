const cloudinary = require("cloudinary")
const catchAsyncError = require("../../../../../../../../bFunction/aCatchAsyncError")
const ErrorHandler = require("../../../../../../../../bFunction/bErrorHandler")
const handleImage = require("../../../../../../../../bFunction/hHandleImage")
const SearchFilterPaginate = require("../../../../../../../../bFunction/fSearchFilterPaginate")
const UserModel = require("../../../../../../../bCommon/aModel/bAdministration/aUserModel")
const ChatModel = require("../../../aModel/cMain/cChatModel")
const emitEvent = require("../../../../../../../../bFunction/mEmitEvent")
const { ALERT, REFETCH_CHATS, NEW_ATTACHMENT, NEW_MESSAGE_ALERT } = require("../../../../../../../../dStaticData/bEventConstant/aEvent")
const MessageModel = require("../../../aModel/cMain/dMessageModel")


exports.chatPageController = (Model= ChatModel, Label= 'Chat') => {
	return {
		// Create Group Chat Controller
		createGroupChat: catchAsyncError(async (request, response, next) => {
      const { members } = request.body;

      if (request.body.members.length < 2) {
        return next(new ErrorHandler("Group chat must have atleast 3 members", 400))
      }

      const allMembers = [...members, request.user]

      // Personal Info
			request.body.bCreatedAt = new Date(Date.now()),
			request.body.bCreatedBy = request.user ? request.user : "4c616e612044656c1052656a"

			// Image
			request.body.aImage && (
				request.body.aImage = await handleImage(
					request.body.aImage, 
					Label,
					'create'
				)
			)

      // Create
      const chat = await Model.create({
        aTitle: request.body.aTitle,
        aSubtitle: request.body.aSubtitle,
        aImage: request.body.aImage,

        bCreatedAt: request.body.bCreatedAt,
        bCreatedBy: request.body.bCreatedBy,

        cMembers: allMembers,

        dIsGroupChat: true,
      })

      // Emit Event
      emitEvent(request, ALERT, allMembers, `Welcome to ${request.body.aTitle} group`)
      emitEvent(request, REFETCH_CHATS, members)

			// Response
			response.status(201).json({
				success: true,
				message: `${Label} Created Successfully`,
				created: chat
			})
		}),

		// User Chat List
		userChatList: catchAsyncError(async (request, response, next) => {
			const chats = await ChatModel.find({ cMembers: request.user }).populate("cMembers", "aTitle eImage");

			const transformedChat = chats.map(({_id, aTitle, aSubtitle, cMembers, dIsGroupChat,}) => {
				const getOtherMember = (members, userID) => {
					return members.find((each1) => each1._id.toString() !== userID.toString())
				}

				return {
					_id,
					aTitle,
					aSubtitle,
					cMembers,
					dIsGroupChat,
					dAvatar: dIsGroupChat ? 
						cMembers.slice(0, 3).map(({eImage}) => eImage.url) : 
						[getOtherMember(cMembers, request.user).eImage.url]
				}
			})

			// Response
			response.status(200).json({
				success: true,
				message: `${Label} Listed Successfully`,
				list_count: transformedChat.length,
				list: transformedChat
			})
		}),

		// User Group Chat List
		userGroupChatList: catchAsyncError(async (request, response, next) => {
			const chats = await ChatModel.find({ 
				cMembers: request.user,
				dIsGroupChat: true,
				bCreatedBy: request.user
			}).populate("cMembers", "aTitle eImage");

			const transformedChat = chats.map(({_id, aTitle, aSubtitle, bCreatedBy, cMembers, dIsGroupChat,}) => {
				return {
					_id,
					aTitle,
					aSubtitle,
					bCreatedBy,
					cMembers,
					dIsGroupChat,
					dAvatar: cMembers.slice(0, 3).map(({eImage}) => eImage.url)
				}
			})

			// Response
			response.status(200).json({
				success: true,
				message: `Group ${Label} Listed Successfully`,
				list_count: transformedChat.length,
				list: transformedChat
			})
		}),
		
		// Add Member
		addMember: catchAsyncError(async (request, response, next) => {
			const {chatID, members } = request.body; 

			const chat = await ChatModel.findById(chatID);

			if (!chat) return next(new ErrorHandler("Chat Not Found", 404));
			if (!chat.dIsGroupChat) return next(new ErrorHandler("Not Group Chat", 400));
			if (chat.bCreatedBy.toString() !== request.user.toString()) return next(new ErrorHandler("Not Allowed To Add Members", 403));
			if (!members || members.length < 1) return next(new ErrorHandler("Please Provide Members", 400));

			const allNewMembersPromise = members.map((i) => UserModel.findById(i, "aTitle"));
			const allNewMembers = await Promise.all(allNewMembersPromise);
			const uniqueMembers = allNewMembers.filter(each => !chat.cMembers.includes(each._id.toString())).map(each1 => each1._id);

			chat.cMembers.push(...uniqueMembers);

			if (chat.cMembers.length > 100) return next(new ErrorHandler("Group Limit Reached", 400));
			await chat.save();

			const allUsersName = allNewMembers.map(each => each.aTitle).join(",")

			emitEvent(request, ALERT, chat.cMembers, `${allUsersName} has been added to group.`)
      emitEvent(request, REFETCH_CHATS, chat.cMembers)

			// Response
			response.status(200).json({
				success: true,
				message: `Group ${Label} Members Added Successfully`,
				update: chat
			})
		}),
		
		// Remove Member
		removeMember: catchAsyncError(async (request, response, next) => {
			const { chatID, userID } = request.body; 

			const [ chat, removingUser ] = await Promise.all([
				ChatModel.findById(chatID),
				UserModel.findById(userID, "aTitle"),
			]);

			if (!chat) return next(new ErrorHandler("Chat Not Found", 404));
			if (!chat.dIsGroupChat) return next(new ErrorHandler("Not Group Chat", 400));
			if (chat.bCreatedBy.toString() !== request.user.toString()) return next(new ErrorHandler("Not Allowed To Add Members", 403));
			if (chat.cMembers.length <= 3) return next(new ErrorHandler("Group Mus Have 3 Members", 400));

			chat.cMembers = chat.cMembers.filter(each => each.toString() !== userID.toString())
			await chat.save()

			emitEvent(request, ALERT, chat.cMembers, `${removingUser.aTitle} has been removed from group.`)
      emitEvent(request, REFETCH_CHATS, chat.cMembers)

			// Response
			response.status(200).json({
				success: true,
				message: `Group ${Label} Member Removed Successfully`,
				update: chat
			})
		}),

		// Leave Group Chat
		leaveGroup: catchAsyncError(async (request, response, next) => {
			const chatID = request.params.id; 

			const chat = await ChatModel.findById(chatID)

			if (!chat) return next(new ErrorHandler("Chat Not Found", 404));
			// if (!chat.dIsGroupChat) return next(new ErrorHandler("Not Group Chat", 400));
			
			const remainingMembers = chat.cMembers.filter(each => each.toString() !== request.user.toString());

			if (chat.bCreatedBy.toString() === request.user.toString()) {
				const randomElement = Math.floor(Math.random() * remainingMembers.length);
				const newCreator = remainingMembers[randomElement];
				chat.bCreatedBy = newCreator
			}

			chat.cMembers = remainingMembers
			await Promise.all([
				UserModel.findById(request.user, "name"),
				chat.save()
			])

			emitEvent(request, ALERT, chat.cMembers, `${user.aTitle} has been removed from group.`)

			// Response
			response.status(200).json({
				success: true,
				message: `Group ${Label} Member Leaved Successfully`,
				update: chat
			})
		}),
				
		// Send Attachment
		sendAttachment: catchAsyncError(async (request, response, next) => {
			const { chatID } = request.body; 

			const [ chat, user ] = await Promise.all([
				ChatModel.findById(chatID),
				UserModel.findById(request.user, "aTitle"),
			]);

			if (!chat) return next(new ErrorHandler("Chat Not Found", 404));
			
			const files = request.files || []

			if (files.length < 1) return next(new ErrorHandler("Please Provide Attachments", 400));

			// Upload Files Here
			const attachments = ["lol", "lol", "lol"]

			// Message For Real Time
			const messageForRealTime = {
				content: "",
				attachments,
				sender: {
					_id: request.user,
					name: user.name
				},
				chatID
			}

			// Message For DB
			const messageForDB = {
				content: "",
				attachments,
				sender: request.user,
				chatID
			}

			const message = await MessageModel.create(messageForDB)

			emitEvent(request, NEW_ATTACHMENT, chat.cMembers, {
				message: messageForRealTime,
				chatID
			})
      emitEvent(request, NEW_MESSAGE_ALERT, chat.cMembers, {
				chatID
			})

			// Response
			response.status(200).json({
				success: true,
				message: `${Label} Attachment Sent Successfully`,
				update: message
			})
		}),

		// Retrieve Chat
		retrieveChat: catchAsyncError(async (request, response, next) => {
			if (request.query.populate === "true") {
				const chat = await ChatModel.findById(request.params.id).populate("cMembers", "aTitle eImage").lean();
				if (!chat) return next(new ErrorHandler("Chat Not Found", 404));

				chat.cMembers = chat.cMembers.map(({ _id, aTitle, eImage }) => ({ _id, aTitle, eImage: eImage?.url }))

				return response.status(200).json({
					success: true,
					chat
				})
			} else {
				const chat = await ChatModel.findById(request.params.id);
				if (!chat) return next(new ErrorHandler("Chat Not Found", 404));

				return response.status(200).json({
					success: true,
					message: `${Label} Retrieved Successfully`,
					chat
				})
			}
		}),
				
		// Rename Group Chat
		renameChat: catchAsyncError(async (request, response, next) => {
			const chatID = request.params.id; 
			const { name } = request.body
			const chat = await ChatModel.findById(chatID)

			if (!chat) return next(new ErrorHandler("Chat Not Found", 404));
			if (!chat.dIsGroupChat) return next(new ErrorHandler("Not Group Chat", 400));
			if (chat.bCreatedBy.toString() !== request.user.toString()) return next(new ErrorHandler("Not Allowed To Rename", 403));

			chat.aTitle = name
			await chat.save();

			return response.status(200).json({
				success: true,
				message: `Group ${Label} Renamed Successfully`,
				chat
			})
		}),
				
		// Get Messages
		getMessages: catchAsyncError(async (request, response, next) => {
			const chatID = request.params.id; 
			const { page = 1 } = request.query

			const resultPerPage = 20
			const skip = (page -1) * resultPerPage;

			const [messages, totalMessagesCount] = await Promise.all([
				MessageModel
					.find({ cChat: chatID })
					.sort({ bCreatedAt: -1 })
					.skip(skip)
					.limit(resultPerPage)
					.populate("aCreatedBy", "aTitle eImage")
					.lean(),
				MessageModel.countDocuments({ cChat: chatID })
			])

			const totalPages = Math.ceil(totalMessagesCount / resultPerPage);

			return response.status(200).json({
				success: true,
				message: `${Label} Messages Retrieved Successfully`,
				chat_messages: messages.reverse(),
				totalPages
			})
		}),
				
		// Search User
		searchUser: catchAsyncError(async (request, response, next) => {
			const { name } = request.query

			const myChats = await ChatModel.find({ dIsGroupChat: false, cMembers: request.user }); 

			const myUsers = myChats.flatMap(each => each.cMembers);

			const remainingUsers = await UserModel.find({
				_id: { $nin: myUsers },
				aTitle: { $regex: name || "", $options: "i" },
			})

			const users = remainingUsers.map(({ _id, aTitle, eImage }) => ({
				_id, aTitle, 
				eImage: eImage.url
			}));

			return response.status(200).json({
				success: true,
				message: `Users Retrieved Successfully`,
				users
			})
		}),				
		
	}
}
