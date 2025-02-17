const cloudinary = require("cloudinary")
const catchAsyncError = require("../../../../../../bFunction/aCatchAsyncError")
const ErrorHandler = require("../../../../../../bFunction/bErrorHandler")
const handleImage = require("../../../../../../bFunction/hHandleImage")
const SearchFilterPaginate = require("../../../../../../bFunction/fSearchFilterPaginate")
const HeroModel = require("../../zCommon/aModel/cMain/aHeroModel")
const CounterModel = require("../../zCommon/aModel/cMain/bCounterModel")
const ProgramSectionModel = require("../../zCommon/aModel/cMain/cProgramSectionModel")
const ProgramModel = require("../../zCommon/aModel/cMain/dProgramModel")


exports.programPageController = (Label= 'Program Page') => {
	return {
    // Retrieve Controller
		retrieve: catchAsyncError(async (request, response, next) => {
			// Retrieve
			let retrieve = await ProgramModel.findById(request.params.id)

			// Not Found
			if (!retrieve) next(new ErrorHandler(`${Label} Not Found`, 404))

			// Response
			response.status(200).json({
				success: true,
				message: `${Label} Reterived Successfully`,
				retrieve
			})
		}),

	}
}
