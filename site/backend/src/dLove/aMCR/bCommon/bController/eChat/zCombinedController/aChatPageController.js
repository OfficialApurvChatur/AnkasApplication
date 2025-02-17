const cloudinary = require("cloudinary")
const catchAsyncError = require("../../../../../bFunction/aCatchAsyncError")
const ErrorHandler = require("../../../../../bFunction/bErrorHandler")
const handleImage = require("../../../../../bFunction/hHandleImage")
const SearchFilterPaginate = require("../../../../../bFunction/fSearchFilterPaginate")
const UserModel = require("../../../../bCommon/aModel/bAdministration/aUserModel")
const ChatModel = require("../../../aModel/eChat/aChatModel")
const emitEvent = require("../../../../../bFunction/mEmitEvent")
const { ALERT, REFETCH_CHATS, NEW_ATTACHMENT, NEW_MESSAGE_ALERT } = require("../../../../../dStaticData/bEventConstant/aEvent")
const MessageModel = require("../../../aModel/eChat/bMessageModel")
const RequestModel = require("../../../aModel/eChat/cRequestModel")

const getOtherMember = (members, userID) => {
	return members.find((each1) => each1._id.toString() !== userID.toString())
}

exports.chatPageController = (Model= ChatModel, Label= 'Chat') => {
	return {
		// Create Group Chat Controller
		createGroupChat: catchAsyncError(async (request, response, next) => {

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

			// Add Current User
			const allMembers = [...request.body.cMembers, request.user]

      // Create
      const chat = await Model.create({
        aTitle: request.body.aTitle,
        aSubtitle: request.body.aSubtitle,
        aDescription: request.body.aDescription,
        aImage: request.body.aImage,

        bCreatedAt: request.body.bCreatedAt,
        bCreatedBy: request.body.bCreatedBy,

        cCreator: request.body.cCreator,
        cAdmin: request.body.cAdmin,
        cMembers: allMembers,

        dIsGroupChat: true,
      })

      // Emit Event
      emitEvent(request, ALERT, allMembers, `Welcome to ${request.body.aTitle} group`)
      emitEvent(request, REFETCH_CHATS, allMembers)

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

			const transformedChat = chats.map(({_id, aTitle, aSubtitle, cCreator, cAdmin, cMembers, dIsGroupChat,}) => {

				return {
					_id,
					aTitle,
					// aSubtitle,
					// cCreator,
					// cAdmin,
					cMembers,
					dName: dIsGroupChat ? aTitle : getOtherMember(cMembers, request.user).aTitle,
					dIsGroupChat,
					dAvatar: dIsGroupChat ? // dAvatar is Temporary Field, not DB field.
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
				cAdmin: request.user,
				dIsGroupChat: true,
			}).populate("cMembers", "aTitle eImage");

			const transformedChat = chats.map(({_id, aTitle, aSubtitle, cCreator, cAdmin, cMembers, dIsGroupChat,}) => {
				return {
					_id,
					aTitle,
					// aSubtitle,
					// cCreator, 
					// cAdmin,
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
			const { chatID, members } = request.body; 

			const chat = await ChatModel.findById(chatID);

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
			if (!chat.cMembers.includes(request.user.toString())) return next(new ErrorHandler("You are not the member of this group", 400));
			if (!chat.cMembers.includes(userID.toString())) return next(new ErrorHandler("User is not the member of this group", 400));
			if (chat.cAdmin.toString() !== request.user.toString()) return next(new ErrorHandler("Not Allowed To Remove Members", 403));
			if (userID.toString() === request.user.toString()) return next(new ErrorHandler("You cannot remove yourself", 403));
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
			if (!chat.dIsGroupChat) return next(new ErrorHandler("Not Group Chat", 400));
			if (!chat.cMembers.includes(request.user.toString())) return next(new ErrorHandler("You are already not a member of this group", 400));

			const remainingMembers = chat.cMembers.filter(each => each.toString() !== request.user.toString());

			if (remainingMembers.length < 3) return next(new ErrorHandler("Group must have at least 3 members", 400));

			if (chat.cAdmin && chat.cAdmin.toString() === request.user.toString()) {
				const randomElement = Math.floor(Math.random() * remainingMembers.length);
				const newCreator = remainingMembers[randomElement];
				chat.cAdmin = newCreator
			}

			chat.cMembers = remainingMembers

			const [user] = await Promise.all([
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
				
		// // Send Attachment
		// sendAttachment: catchAsyncError(async (request, response, next) => {
		// 	const { chatID } = request.body; 

		// 	const [ chat, user ] = await Promise.all([
		// 		ChatModel.findById(chatID),
		// 		UserModel.findById(request.user, "aTitle"),
		// 	]);

		// 	if (!chat) return next(new ErrorHandler("Chat Not Found", 404));
			
		// 	const files = request.files || []

		// 	if (files.length < 1) return next(new ErrorHandler("Please Provide Attachments", 400));

		// 	// Upload Files Here
		// 	const attachments = ["lol", "lol", "lol"]

		// 	// Message For Real Time
		// 	const messageForRealTime = {
		// 		content: "",
		// 		attachments,
		// 		sender: {
		// 			_id: request.user,
		// 			name: user.name
		// 		},
		// 		chatID
		// 	}

		// 	// Message For DB
		// 	const messageForDB = {
		// 		content: "",
		// 		attachments,
		// 		sender: request.user,
		// 		chatID
		// 	}

		// 	const message = await MessageModel.create(messageForDB)

		// 	emitEvent(request, NEW_ATTACHMENT, chat.cMembers, {
		// 		message: messageForRealTime,
		// 		chatID
		// 	})
    //   emitEvent(request, NEW_MESSAGE_ALERT, chat.cMembers, {
		// 		chatID
		// 	})

		// 	// Response
		// 	response.status(200).json({
		// 		success: true,
		// 		message: `${Label} Attachment Sent Successfully`,
		// 		update: message
		// 	})
		// }),

		// Retrieve Chat
		retrieveChat: catchAsyncError(async (request, response, next) => {
			if (request.query.populate === "true") {
				const chat = await ChatModel.findById(request.params.id)
					.populate("cMembers", "aTitle aSubtitle aDescription eFirstName eLastName eImage eEmail")
					.populate("cAdmin", "aTitle eImage eEmail")
					.lean();

				if (!chat) return next(new ErrorHandler("Chat Not Found", 404));

				// chat.cMembers = chat.cMembers

				if (!chat?.dIsGroupChat) {
					chat.cOtherMember = getOtherMember(chat.cMembers, request.user)
				}

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
			const { aTitle } = request.body
			const chat = await ChatModel.findById(chatID)

			if (!chat) return next(new ErrorHandler("Chat Not Found", 404));
			if (!chat.dIsGroupChat) return next(new ErrorHandler("Not Group Chat", 400));
			if (!chat.cMembers.includes(request.user.toString())) return next(new ErrorHandler("You are not the member of this group", 400));
			if (chat.cAdmin.toString() !== request.user.toString()) return next(new ErrorHandler("Not Allowed To Rename", 403));

			chat.aTitle = aTitle
			await chat.save();

			return response.status(200).json({
				success: true,
				message: `Group ${Label} Renamed Successfully`,
				chat
			})
		}),

		// Delete Chat
		deleteChat: catchAsyncError(async (request, response, next) => {
			const chatId = request.params.id;
		
			const chat = await ChatModel.findById(chatId);
		
			if (!chat) return next(new ErrorHandler("Chat not found", 404));
		
			const members = chat.cMembers;
		
			if (chat.dIsGroupChat && chat.cAdmin.toString() !== request.user.toString())
				return next(
					new ErrorHandler("You are not allowed to delete the group", 403)
				);
		
			if (!chat.dIsGroupChat && !chat.cMembers.includes(request.user.toString())) {
				return next(
					new ErrorHandler("You are not allowed to delete the chat", 403)
				);
			}
		
			//   Here we have to dete All Messages as well as attachments or files from cloudinary
		
			const messagesWithAttachments = await MessageModel.find({
				cChat: chatId,
				dAttachments: { $exists: true, $ne: [] },
			});
		
			const public_ids = [];
		
			messagesWithAttachments.forEach(({ attachments }) =>
				attachments.forEach(({ public_id }) => public_ids.push(public_id))
			);
		
			await Promise.all([
				// deletFilesFromCloudinary(public_ids),
				chat.deleteOne(),
				MessageModel.deleteMany({ cChat: chatId }),
			]);
		
			emitEvent(request, REFETCH_CHATS, members);
		
			return response.status(200).json({
				success: true,
				message: "Chat deleted successfully",
			});
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
					.populate("cSender", "aTitle eImage")
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
				_id: { $nin: [...myUsers, request.user._id] },
				aTitle: { $regex: name || "", $options: "i" },
			})
			.populate("aTitle eFirstName eLastName eImage eEmail");

			const users = remainingUsers;

			return response.status(200).json({
				success: true,
				message: `Users Retrieved Successfully`,
				users
			})
		}),				
		
		// Send Friend Request
		sendFriendRequest: catchAsyncError(async (request, response, next) => {
			const { userID } = request.body;
		
			const requestBro = await RequestModel.findOne({
				$or: [
					{ cSender: request.user, cReceiver: userID },
					{ cSender: userID, cReceiver: request.user },
				],
			});
		
			if (requestBro) return next(new ErrorHandler("Request already sent", 400));
		
			await RequestModel.create({
				aTitle: `${request.user}-${userID}`,
				aSubtitle: `${request.user} has sent request to ${userID}`,

				cSender: request.user,
				cReceiver: userID,
			});
		
			emitEvent(request, "NEW_REQUEST", [userID]);
		
			return response.status(200).json({
				success: true,
				message: "Friend Request Sent",
			});
		}),

		// Get Friend Request
		getFriendRequest: catchAsyncError(async (request, response) => {
			const requests = await RequestModel.find({ cReceiver: request.user }).populate(
				"cSender",
				"aTitle eFirstName eLastName eImage eEmail"
			);
		
			const allRequests = requests.map(({ _id, cSender }) => ({
				_id,
				cSender: {
					_id: cSender._id,
					aTitle: cSender.aTitle,
					eFirstName: cSender.eFirstName,
					eLastName: cSender.eLastName,
					eImage: cSender.eImage,
					eEmail: cSender.eEmail,
				},
			}));
		
			return response.status(200).json({
				success: true,
				message: "Friend Request Retrieved",
				allRequests,
			});
		}),
		
		// Accept Friend Request
		acceptFriendRequest: catchAsyncError(async (request, response, next) => {
			const { requestID, accept } = request.body;
		
			const requestBro = await RequestModel.findById(requestID)
				.populate("cSender", "aTitle")
				.populate("cReceiver", "aTitle");
		
			if (!requestBro) return next(new ErrorHandler("Request not found", 404));
		
			if (requestBro.cReceiver._id.toString() !== request.user.toString())
				return next(
					new ErrorHandler("You are not authorized to accept this request", 401)
				);
		
			if (!accept) {
				await requestBro.deleteOne();
		
				return response.status(200).json({
					success: true,
					message: "Friend Request Rejected",
				});
			}
		
			const members = [requestBro.cSender._id, requestBro.cReceiver._id];
		
			await Promise.all([
				ChatModel.create({
					cMembers: members,
					aTitle: `${requestBro.cSender.aTitle}-${requestBro.cReceiver.aTitle}`,
					aSubtitle: `${requestBro.cSender.aTitle}-${requestBro.cReceiver.aTitle}`,
				}),
				requestBro.deleteOne(),
			]);
		
			emitEvent(request, REFETCH_CHATS, members);
		
			return response.status(200).json({
				success: true,
				message: "Friend Request Accepted",
				senderId: requestBro.cSender._id,
			});
		}),
		
		
		// Get Friends
		getMyFriends: catchAsyncError(async (request, response) => {
			const chatId = request.query.chatId;
		
			const chats = await ChatModel.find({
				cMembers: request.user,
				dIsGroupChat: false,
			}).populate("cMembers", "aTitle eFirstName eLastName eImage eEmail");
		
			const friends = chats.map(({ cMembers }) => {
				const otherUser = cMembers.find((member) => member._id.toString() !== request.user.toString());
		
				return {
					_id: otherUser._id,
					aTitle: otherUser.aTitle,
					eFirstName: otherUser.eFirstName,
					eLastName: otherUser.eLastName,
					eImage: otherUser.eImage,
					eEmail: otherUser.eEmail,
				};
			});
		
			if (chatId) {
				const chat = await ChatModel.findById(chatId);
		
				const availableFriends = friends.filter(
					(friend) => !chat.cMembers.includes(friend._id)
				);
		
				return response.status(200).json({
					success: true,
					message: "Other Friends Retrieved Successfully",
					friends: availableFriends,
				});
			} else {
				return response.status(200).json({
					success: true,
					message: "Friends Retrieved Successfully",
					friends,
				});
			}
		}),
		
	}
}
