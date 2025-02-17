const cloudinary = require("cloudinary")
const catchAsyncError = require("../../../../bFunction/aCatchAsyncError")
const ErrorHandler = require("../../../../bFunction/bErrorHandler")
const handleImage = require("../../../../bFunction/hHandleImage")
const SearchFilterPaginate = require("../../../../bFunction/fSearchFilterPaginate")
const RoleModel = require("../../aModel/bAdministration/bRoleModel")
const invalidateCache = require("../../../../bFunction/pInvalidateCache")
const companyToCompany = require("../../../../dStaticData/aEmailData/aCompanyToCompany")
const UserModel = require("../../../bCommon/aModel/bAdministration/aUserModel")
const sendEmail = require("../../../../bFunction/iSendEmail")
const nodeCache = require("../../../../bFunction/qNodeCache")
const destroyImage = require("../../../../bFunction/rDestroyImage")


exports.roleController = (Model= RoleModel, Label= 'Role', Cache= 'roleController') => {
	return {
		// List Controller
		list: catchAsyncError(async (request, response, next) => {
			// API Feature
			const searchFilterPaginate = new SearchFilterPaginate(Model.find().populate(['bCreatedBy', 'bUpdatedBy']), request.query).search().filter().paginate(100)

			// List
			let object_list;

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
			response.status(200).json({
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
			request.body.bCreatedBy = request.user ? request.user : "Kiss Me Hard"

			// Image
			request.body.aImage && (
				request.body.aImage = await handleImage(
					request.body.aImage, 
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
				object_retrieve = await Model.findById(request.params.id).populate(['bCreatedBy', 'bUpdatedBy'])
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
			let object_retrieve = await Model.findById(request.params.id).populate(['bCreatedBy', 'bUpdatedBy'])

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

		// Delete Controller
		delete: catchAsyncError(async (request, response, next) => {
			// Retrieve
			let object_retrieve = await Model.findById(request.params.id).populate(['bCreatedBy', 'bUpdatedBy'])

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
	}
}
