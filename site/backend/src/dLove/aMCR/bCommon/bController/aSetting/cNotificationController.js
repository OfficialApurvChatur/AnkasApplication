const cloudinary = require("cloudinary")
const catchAsyncError = require("../../../../bFunction/aCatchAsyncError")
const ErrorHandler = require("../../../../bFunction/bErrorHandler")
const handleImage = require("../../../../bFunction/hHandleImage")
const SearchFilterPaginate = require("../../../../bFunction/fSearchFilterPaginate")
const NotificationModel = require("../../aModel/aSetting/cNotificationModel")


exports.notificationController = (Model= NotificationModel, Label= 'Notification') => {
	return {
		// List Controller
		list: catchAsyncError(async (request, response, next) => {
			// API Feature
			const searchFilterPaginate = new SearchFilterPaginate(Model.find().populate(['bCreatedBy', 'bUpdatedBy']), request.query).search().filter().paginate(100)

			// List
			const object_list = await searchFilterPaginate.query

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
			const object_create = await Model.create(request.body)
	
			// Response
			response.status(201).json({
				success: true,
				message: `${Label} Created Successfully`,
				create: object_create
			})
		}),

		// Retrieve Controller
		retrieve: catchAsyncError(async (request, response, next) => {
			// Retrieve
			let object_retrieve = await Model.findById(request.params.id).populate(['bCreatedBy', 'bUpdatedBy'])

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

			// Response
			response.status(200).json({
				success: true,
				message: `${Label} Deleted Successfully`,
				delete: object_retrieve
			})
		}),
	}
}
