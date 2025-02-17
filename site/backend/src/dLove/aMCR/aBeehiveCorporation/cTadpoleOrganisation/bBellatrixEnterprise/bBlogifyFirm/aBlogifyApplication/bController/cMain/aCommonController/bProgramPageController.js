const cloudinary = require("cloudinary")
const catchAsyncError = require("../../../../../../../../../bFunction/aCatchAsyncError")
const ErrorHandler = require("../../../../../../../../../bFunction/bErrorHandler")
const handleImage = require("../../../../../../../../../bFunction/hHandleImage")
const SearchFilterPaginate = require("../../../../../../../../../bFunction/fSearchFilterPaginate")
const HeroModel = require("../../../aModel/cMain/aHeroModel")
const CounterModel = require("../../../aModel/cMain/bCounterModel")
const ProgramSectionModel = require("../../../aModel/cMain/cProgramSectionModel")
const ProgramModel = require("../../../aModel/cMain/dProgramModel")


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
