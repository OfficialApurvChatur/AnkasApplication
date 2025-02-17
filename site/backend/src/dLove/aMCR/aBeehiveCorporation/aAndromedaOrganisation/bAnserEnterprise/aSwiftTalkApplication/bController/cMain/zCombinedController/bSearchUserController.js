const cloudinary = require("cloudinary")
const catchAsyncError = require("../../../../../../../../bFunction/aCatchAsyncError")
const ErrorHandler = require("../../../../../../../../bFunction/bErrorHandler")
const handleImage = require("../../../../../../../../bFunction/hHandleImage")
const SearchFilterPaginate = require("../../../../../../../../bFunction/fSearchFilterPaginate")
const UserModel = require("../../../../../../../bCommon/aModel/bAdministration/aUserModel")


exports.searchUserController = (Model= "HeroModel", Label= 'Hero') => {
	return {
		// List Controller
		list: catchAsyncError(async (request, response, next) => {

			// List
			const object_list = await UserModel

			// Response
			response.status(201).json({
				success: true,
				message: `${Label} Listed Successfully`,
				total_count: await Model.countDocuments(),
				page_count: object_list.length,
				list: object_list
			})
		}),

	}
}
