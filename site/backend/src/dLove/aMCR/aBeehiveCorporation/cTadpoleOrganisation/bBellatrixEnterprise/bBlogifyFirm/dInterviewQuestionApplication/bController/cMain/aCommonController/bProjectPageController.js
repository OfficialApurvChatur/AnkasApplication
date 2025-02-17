const cloudinary = require("cloudinary")
const catchAsyncError = require("../../../../../../../../../bFunction/aCatchAsyncError")
const ErrorHandler = require("../../../../../../../../../bFunction/bErrorHandler")
const handleImage = require("../../../../../../../../../bFunction/hHandleImage")
const SearchFilterPaginate = require("../../../../../../../../../bFunction/fSearchFilterPaginate")
const HeroModel = require("../../../aModel/cMain/aHeroModel")
const CounterModel = require("../../../aModel/cMain/bCounterModel")
const AdminHeroModel = require("../../../../../../../../bCommon/aModel/aSetting/bAdminHeroModel")
const AboutModel = require("../../../aModel/cMain/cAboutModel")
const ServiceModel = require("../../../aModel/cMain/dServiceModel")
const ProjectSectionModel = require("../../../aModel/cMain/hProjectSectionModel")
const ProjectGroupModel = require("../../../aModel/cMain/iProjectGroupModel")
const ProjectModel = require("../../../aModel/cMain/jProjectModel")


exports.projectPageController = (Label= 'Project Page') => {
	return {
    // Retrieve Controller
		retrieve: catchAsyncError(async (request, response, next) => {
			// Retrieve
			let retrieve = await ProjectModel.findById(request.params.id)

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
