const crypto = require("crypto");
const catchAsyncError = require("../../../../bFunction/aCatchAsyncError")
const ErrorHandler = require("../../../../bFunction/bErrorHandler")
const handleImage = require("../../../../bFunction/hHandleImage")
const SearchFilterPaginate = require("../../../../bFunction/fSearchFilterPaginate")
const UserModel = require("../../aModel/bAdministration/aUserModel");
const generateCookie = require("../../../../bFunction/cGenerateCookie");
const RoleModel = require("../../aModel/bAdministration/bRoleModel");
const MenuModel = require("../../aModel/bAdministration/cMenuModel");
const sendEmail = require("../../../../bFunction/iSendEmail");
const sendMessage = require("../../../../bFunction/kSendMessage");
const companyToCompany = require("../../../../dStaticData/aEmailData/aCompanyToCompany");
const invalidateCache = require("../../../../bFunction/pInvalidateCache")
const nodeCache = require("../../../../bFunction/qNodeCache")
const destroyImage = require("../../../../bFunction/rDestroyImage")


exports.userController = (Model= UserModel, Label= 'User', Cache= 'userController') => {
	return {
		// List Controller
		list: catchAsyncError(async (request, response, next) => {
			// API Feature
			const searchFilterPaginate = new SearchFilterPaginate(Model.find().populate(['bCreatedBy', 'bUpdatedBy']), request.query).search().filter().paginate(100)

			// Cache
			if (nodeCache.has(`${Cache}List`)) {
				console.log("List Cached...")
				object_list = JSON.parse(nodeCache.get(`${Cache}List`))
			} else {
				console.log("List Not Cached...")
				object_list = await searchFilterPaginate.query
				nodeCache.set(`${Cache}List`, JSON.stringify(object_list), 600);
			}
			
			// Response
			response.status(201).json({
				success: true,
				message: `${Label} Listed Successfully`,
				total_count: await Model.countDocuments(),
				page_count: object_list.length,
				list: object_list
			})
		}),

		// Create Controller
		create: catchAsyncError(async (request, response, next) => {
			// Personal Info
			request.body.bCreatedAt = new Date(Date.now()),
			request.body.bCreatedBy = request.user || "Lana Del Rel"

			// Image
			request.body.aImage && (
				request.body.aImage = await handleImage(
					request.body.aImage, 
					Label,
					'create'
				)
			)
			request.body.eImage && (
				request.body.eImage = await handleImage(
					request.body.eImage, 
					Label,
					'create'
				)
			)
			
			// Create
			const object_create = await Model.create(request.body)
	
			// Invalidate Cache
			await invalidateCache(Model, nodeCache, [`${Cache}List`], `${Cache}Retrieve`, "Created")
	
			// Retrieve User Details For Email
			const fella_user = await UserModel.findById(request.user, 'eEmail')

			// Not Found
			if (!fella_user) next(new ErrorHandler(`Fella User Not Found`, 404))

			// Send Mail - Company To Company
			object_create && await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: `Someone Created ${Label} Instance`,
				text: `User ${fella_user.eEmail} has created '${Label}' instance named '${object_create.aTitle}' using our administration.`
			})

			// Send Mail - Company To User
			object_create && await sendEmail(option={
				from: companyToCompany,
				to: fella_user.eEmail,
				subject: `You Created ${Label} Instance`,
				text: `You created '${Label}' instance named '${object_create.aTitle}' using our administration.`
			})			

			// Response
			response.status(201).json({
				success: true,
				message: `${Label} Created Successfully`,
				create: object_create
			})
		}),

		// Retrieve Controller
		retrieve: catchAsyncError(async (request, response, next) => {
			// List
			let object_retrieve;

			// Cache
			if (nodeCache.has(`${Cache}Retrieve-${request.params.id}`)) {
				console.log("Object Cached...")
				object_retrieve = JSON.parse(nodeCache.get(`${Cache}Retrieve-${request.params.id}`))
			} else {
				console.log("Object Not Cached...")
				object_retrieve = await Model.findById(request.params.id).populate(['bCreatedBy', 'bUpdatedBy']).populate({
					path: 'cRole',
					model: RoleModel,
					populate: {
						path: 'cMenus.menu',
						model: MenuModel,
					}
				})
				nodeCache.set(`${Cache}Retrieve-${request.params.id}`, JSON.stringify(object_retrieve), 600);
			}
			
			// Not Found
			if (!object_retrieve) next(new ErrorHandler(`${Label} Not Found`, 404))

			// Response
			response.status(200).json({
				success: true,
				message: `${Label} Reterived Successfully`,
				retrieve: object_retrieve
			})
		}),

		// Update Controller
		update: catchAsyncError(async (request, response, next) => {
			// Retrieve
			let object_retrieve = await Model.findById(request.params.id).populate(['bCreatedBy', 'bUpdatedBy']).populate({
        path: 'cRole',
        model: RoleModel,
        populate: {
          path: 'cMenus.menu',
          model: MenuModel,
        }
			})

			// Not Found
			if (!object_retrieve) next(new ErrorHandler(`${Label} Not Found`, 404))

			// Personal Info
			request.body.bUpdatedAt = new Date(Date.now()),
			request.body.bUpdatedBy = request.user || "Kiss Me Hard"

			// Image
			request.body.aImage && (
				request.body.aImage = await handleImage(
					request.body.aImage, 
					Label,
					'update',
					object_retrieve.aImage
				)      
			) 
			request.body.eImage && (
				request.body.eImage = await handleImage(
					request.body.eImage, 
					Label,
					'update',
					object_retrieve.eImage
				)
			)

			// Update
			object_retrieve = await Model.findByIdAndUpdate(
				request.params.id,
				request.body, {
					new: true,
					runValidators: true,
					useFindAndModify: false
				}
			)

			// Invalidate Cache
			await invalidateCache(Model, nodeCache, [`${Cache}List`], `${Cache}Retrieve`, "Updated")

			// Retrieve User Details For Email
			const fella_user = await UserModel.findById(request.user, 'eEmail')

			// Not Found
			if (!fella_user) next(new ErrorHandler(`Fella User Not Found`, 404))

			// Send Mail - Company To Company
			object_retrieve && await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: `Someone Updated ${Label} Instance`,
				text: `User ${fella_user.eEmail} has updated '${Label}' instance named '${object_retrieve.aTitle}' using our administration.`
			})

			// Send Mail - Company To User
			object_retrieve && await sendEmail(option={
				from: companyToCompany,
				to: fella_user.eEmail,
				subject: `You Updated ${Label} Instance`,
				text: `You updated '${Label}' instance named '${object_retrieve.aTitle}' using our administration.`
			})			
			
			// Response
			response.status(200).json({
				success: true,
				message: `${Label} Updated Successfully`,
				update: object_retrieve
			})
		}),

		// Update Password Controller
		updatePassword: catchAsyncError(async (request, response, next) => {
			// Destructure Body
			const {old_password, new_password, confirm_password} = request.body

			// Retrieve
			const user = await Model.findById(request.params.id).select("+password").populate({
				path: 'cRole',
				model: RoleModel,
				populate: {
					path: 'cMenus.menu',
					model: MenuModel,
				}
			});

			// Not Found
			if (!user) next(new ErrorHandler(`${Label} Not Found`, 404))

			// Check 1
			if (!old_password, !new_password, !confirm_password) next(new ErrorHandler("Please enter old password, new password and confirm password", 400))

			// Check 2
			if (old_password === new_password)  next(new ErrorHandler("New password connot be same as old password", 404));

			// Check 3
			if (new_password !== confirm_password)  next(new ErrorHandler("Please match both password", 400));

			// Match Password 1
			const isPasswordMatched1 = await user.comparePassword(old_password)

			// Not Matched
			if (!isPasswordMatched1) next(new ErrorHandler("Old password is incorrect", 401))

			// // Match Password 2
			// const isPasswordMatched2 = await user.comparePassword(new_password)

			// // Not Matched
			// if (isPasswordMatched2) next(new ErrorHandler("New password connot be same as old password", 401))

			// Save
			user.password = new_password;
			await user.save();
			
			// Response
			generateCookie(201, `${Label} Profile Password Updated Successfully`, `profile_password_update`, user, response)
		}),		

		// Delete Controller
		delete: catchAsyncError(async (request, response, next) => {
			// Retrieve
			let object_retrieve = await Model.findById(request.params.id).populate(['bCreatedBy', 'bUpdatedBy']).populate({
        path: 'cRole',
        model: RoleModel,
        populate: {
          path: 'cMenus.menu',
          model: MenuModel,
        }
			})

			// Not Found
			if (!object_retrieve) next(new ErrorHandler(`${Label} Not Found`, 404))

			// Destroy Image
			object_retrieve?.aImage?.public_id && await destroyImage(object_retrieve?.aImage?.public_id)

			// Delete
			await object_retrieve.deleteOne({"_id": "_id"})

			// Invalidate Cache
			await invalidateCache(Model, nodeCache, [`${Cache}List`], `${Cache}Retrieve`, "Deleted")

			// Retrieve User Details For Email
			const fella_user = await UserModel.findById(request.user, 'eEmail')

			// Not Found
			if (!fella_user) next(new ErrorHandler(`Fella User Not Found`, 404))

			// Send Mail - Company To Company
			object_retrieve && await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: `Someone Deleted ${Label} Instance`,
				text: `User ${fella_user.eEmail} has deleted '${Label}' instance named '${object_retrieve.aTitle}' using our administration.`
			})

			// Send Mail - Company To User
			object_retrieve && await sendEmail(option={
				from: companyToCompany,
				to: fella_user.eEmail,
				subject: `You Deleted ${Label} Instance`,
				text: `You deleted '${Label}' instance named '${object_retrieve.aTitle}' using our administration.`
			})			
			
			// Response
			response.status(200).json({
				success: true,
				message: `${Label} Deleted Successfully`,
				delete: object_retrieve
			})
		}),
		
		///////////////////////// User Authentication Controller //////////////////////////
		// Register Controller
		register: catchAsyncError(async (request, response, next) => {
			// Personal Info
			request.body.bCreatedAt = new Date(Date.now()),
			request.body.bCreatedBy = request.user || "Lana Del Rel"

			// Image
			request.body.eImage && (
				request.body.eImage = await handleImage(
					request.body.eImage, 
					Label,
					'create'
				)
			)

			// Create
			const user = await Model.create(request.body)

			// Send Mail - Company To Company
			user && await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Signed Up",
				text: `User ${user.eEmail} has registered to our application`
			})

			// Send Mail - Company To User
			user && await sendEmail(option={
				from: companyToCompany,
				to: user.eEmail,
				subject: "You Signed In",
				text: `Signed in Successfully as ${user.eEmail}`
			})			
			
			// Response
			generateCookie(201, `User Registered Successfully`, `user_register`, user, response)
		}),

		// Login Controller
		login: catchAsyncError(async (request, response, next) => {
			// Destructure Body
			const {eEmail, ePassword} = request.body

			// Check
			if (!eEmail || !ePassword) next(new ErrorHandler("Please enter email & password", 400))

			// Retrieve
			const user = await Model.findOne({eEmail}).select("+ePassword")

			// Not Found
			if (!user) next(new ErrorHandler("Invalid email or password", 401))

			// Match Password
			const isPasswordMatched = await user.comparePassword(ePassword)

			// Not Matched
			if (!isPasswordMatched) next(new ErrorHandler("Invalid email or password", 401))

			// Send Mail - Company To Company
			user && await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Logged In",
				text: `User ${user.eEmail} has logged in to our application`
			})

			// Send Mail - Company To User
			user && await sendEmail(option={
				from: companyToCompany,
				to: user.eEmail,
				subject: "You Logged In",
				text: `Logged in Successfully ${user.eEmail}`
			})

			// Response
			generateCookie(200, "User Logged In Successfully", "user_login", user, response)
		}),

		// Logout Controller
		logout: catchAsyncError(async (request, response, next) => {
			// Remove Token
			const options = {
					expires: new Date(Date.now()),
					httpOnly: true,
					secure: true,
					sameSite: "none"	
			}

			// Retrieve
			const user = await UserModel.findById(request.user._id).populate({
        path: 'cRole',
        model: RoleModel,
        populate: {
          path: 'cMenus.menu',
          model: MenuModel,
        }
			});

			// Not Found
			if (!user) next(new ErrorHandler("Invalid email or password", 401))

			// Send Mail - Company To Company
			user && await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Logged Out",
				text: `User ${user.eEmail} has logged out of our application`
			})

			// Send Mail - Company To User
			user && await sendEmail(option={
				from: companyToCompany,
				to: user.eEmail,
				subject: "You Logged Out",
				text: `Logged out Successfully ${user.eEmail}`
			})
			
			// Response
			response.status(200).cookie('token', null, options).json({ 
				success: true,
				message: "User Logged Out Successfully",
				user_logout: request.user
			})
		}),

		// Forgot Password Controller
		forgotPassword: catchAsyncError(async (request, response, next) => {
			// Destructure Body
			const {eEmail} = request.body

			// Check
			if (!eEmail) next(new ErrorHandler("Please enter email", 400))

			// Retrieve
			const user = await Model.findOne({"eEmail": eEmail})

			// Not Found
			if (!user) next(new ErrorHandler("User Not Found", 404))
		
			// Get Reset Password Token
			const resetPasswordToken = await user.getResetPasswordToken();

			// Save 
			await user.save({ validateBeforeSave: false });
		
			// Message
			const textMessage = `Reset Password Token: ${resetPasswordToken}`;
				
			// Send Mail - Company To Company
			user && await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Forgot Password",
				text: `User ${user.eEmail} has forgot password to our application`
			})

			// Send Mail - Company To User
			user && await sendEmail(option={
				from: companyToCompany,
				to: user.eEmail,
				subject: "You Forgot Password",
				text: `Forgotten Password for ${user.eEmail}`
			})
			
			// Response
			response.status(200).json({
				success: true,
				message: textMessage,
				user_forgot_password: user,
				token: resetPasswordToken
			});

		}),

		// Reset Password
		resetPassword: catchAsyncError(async (request, response, next) => {
			// Destructure Body & Params
			const {token} = request.params
			const {new_password, confirm_password} = request.body

			// Hash Token
			const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

			// Retrieve
			const user = await UserModel.findOne({'eResetPasswordToken': resetPasswordToken, 'eResetPasswordTokenExpire': { $gt: Date.now() }});
			
			// Not Found
			if (!user) next(new ErrorHandler("Reset password link is invalid or has been expired", 400));
			
			// Check 1
			if (!new_password, !confirm_password) next(new ErrorHandler("Please enter new password and confirm password", 400))

			// Check 2
			if (new_password !== confirm_password) next(new ErrorHandler("Please match both password", 400));
			
			// // Match Password 2
			// const isPasswordMatched = await user.comparePassword(new_password)

			// // Not Matched
			// if (isPasswordMatched) next(new ErrorHandler("New password connot be same as old password", 401))

			// Save
			user.ePassword = new_password;
			user.eResetPasswordToken = undefined;
			user.eResetPasswordTokenExpire = undefined;
			await user.save({ validateBeforeSave: false });
			
			// Send Mail - Company To Company
			user && await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Reset Password",
				text: `User ${user.eEmail} has reset password to our application`
			})

			// Send Mail - Company To User
			user && await sendEmail(option={
				from: companyToCompany,
				to: user.eEmail,
				subject: "You Reset Password",
				text: `Reset Password Successfully for ${user.eEmail}`
			})			
			
			// Response
			generateCookie(201, `Password Recovered Successfully`, `user_reset_password`, user, response)
		}),        

		// Profile Retrieve Controller
		profileRetrieve: catchAsyncError(async (request, response, next) => {
			// Retrieve
			const user = await UserModel.findById(request.user._id).populate({
        path: 'cRole',
        model: RoleModel,
        populate: {
          path: 'cMenus.menu',
          model: MenuModel,
        }
			});

			// Not Found
			if (!user) next(new ErrorHandler(`${Label} Not Found`, 404))
			
			response.status(200).json({
				success: true,
				message: `${Label} Profile Reterived Successfully`,
				profile_retrieve: user
			})
		}),

		// Profile Update Controller
		profileUpdate: catchAsyncError(async (request, response, next) => {
			// Retrieve
			let user = await Model.findById(request.user._id).populate({
        path: 'cRole',
        model: RoleModel,
        populate: {
          path: 'cMenus.menu',
          model: MenuModel,
        }
			})

			// Not Found
			if (!user) next(new ErrorHandler(`${Label} Not Found`, 404))

			// Personal Info
			request.body.bUpdatedAt = new Date(Date.now()),
			request.body.bUpdatedBy = request.user || "Kiss Me Hard"

			// Image
			request.body.aImage && (
				request.body.aImage = await handleImage(
					request.body.aImage, 
					Label,
					'update',
					user.aImage
				)      
			)  
			request.body.eImage && (
				request.body.eImage = await handleImage(
					request.body.eImage, 
					Label,
					'update',
					user.eImage
				)
			)    

			// Update
			user = await Model.findByIdAndUpdate(
				request.user,
				request.body, 
				{
					new: true,
					runValidators: true,
					useFindAndModify: false
				}
			)

			// Send Mail - Company To Company
			user && await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Updated Profile",
				text: `User ${user.eEmail} has updated his profile to our application`
			})

			// Send Mail - Company To User
			user && await sendEmail(option={
				from: companyToCompany,
				to: user.eEmail,
				subject: "You Updated Profile",
				text: `Updated Profile for ${user.eEmail}`
			})
			
			// Response
			response.status(200).json({
				success: true,
				message: `${Label} Profile Updated Successfully`,
				update: user
			})
		}),

		// Profile Update Password Controller
		profileUpdatePassword: catchAsyncError(async (request, response, next) => {
			// Destructure Body
			const {old_password, new_password, confirm_password} = request.body

			// Retrieve
			const user = await Model.findById(request.user._id).select("+ePassword").populate({
        path: 'cRole',
        model: RoleModel,
        populate: {
          path: 'cMenus.menu',
          model: MenuModel,
        }
			});

			// Not Found
			if (!user) next(new ErrorHandler(`${Label} Not Found`, 404))

			// Check 1
			if (!old_password, !new_password, !confirm_password) next(new ErrorHandler("Please enter old password, new password and confirm password", 400))

			// Check 2
			if (old_password === new_password)  next(new ErrorHandler("New password connot be same as old password", 404));

			// Check 3
			if (new_password !== confirm_password)  next(new ErrorHandler("Please match both password", 400));

			// Match Password 1
			const isPasswordMatched1 = await user.comparePassword(old_password)

			// Not Matched
			if (!isPasswordMatched1) next(new ErrorHandler("Old password is incorrect", 401))

			// // Match Password 2
			// const isPasswordMatched2 = await user.comparePassword(new_password)

			// // Not Matched
			// if (isPasswordMatched2) next(new ErrorHandler("New password connot be same as old password", 401))

			// Save
			user.ePassword = new_password;
			await user.save();
			
			// Send Mail - Company To Company
			user && await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Updated Profile Password",
				text: `User ${user.eEmail} has updated his profile password to our application`
			})

			// Send Mail - Company To User
			user && await sendEmail(option={
				from: companyToCompany,
				to: user.eEmail,
				subject: "You Updated Profile Profile",
				text: `Updated Profile Password for ${user.eEmail}`
			})
			
			// Response
			generateCookie(201, `${Label} Profile Password Updated Successfully`, `profile_password_update`, user, response)
		}),

		// Profile Delete Controller
		profileDelete: catchAsyncError(async (request, response, next) => {
			// Retrieve
			let user = await Model.findById(request.user._id).populate({
				path: 'cRole',
				model: RoleModel,
				populate: {
					path: 'cMenus.menu',
					model: MenuModel,
				}
			})

			// Not Found
			if (!user) next(new ErrorHandler(`${Label} Not Found`, 404))

			// Delete
			await user.deleteOne({"_id": "_id"})

			// Send Mail - Company To Company
			user && await sendEmail(option={
				from: companyToCompany,
				to: companyToCompany,
				subject: "Someone Closed Profile",
				text: `User ${user.eEmail} has closed his profile to our application`
			})

			// Send Mail - Company To User
			user && await sendEmail(option={
				from: companyToCompany,
				to: user.eEmail,
				subject: "You Closed Profile",
				text: `Closed Profile for ${user.eEmail}`
			})
			
			// Response
			response.status(200).json({
				success: true,
				message: `${Label} Profile Deleted Successfully`,
				delete: user
			})
		}),

	}   
}
