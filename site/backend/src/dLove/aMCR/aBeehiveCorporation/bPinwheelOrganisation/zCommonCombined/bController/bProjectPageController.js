const cloudinary = require("cloudinary")
const catchAsyncError = require("../../../../../bFunction/aCatchAsyncError")
const ErrorHandler = require("../../../../../bFunction/bErrorHandler")
const handleImage = require("../../../../../bFunction/hHandleImage")
const SearchFilterPaginate = require("../../../../../bFunction/fSearchFilterPaginate")
const HeroModel = require("../../zCommon/aModel/cMain/aHeroModel")
const CounterModel = require("../../zCommon/aModel/cMain/bCounterModel")
const AboutModel = require("../../zCommon/aModel/cMain/cAboutModel")
const ServiceModel = require("../../zCommon/aModel/cMain/dServiceModel")
const BranchModel = require("../../zCommon/aModel/cMain/eBranchModel")
const SubSubBranchModel = require("../../zCommon/aModel/cMain/gSubSubBranchModel")
const SubBranchModel = require("../../zCommon/aModel/cMain/fSubBranchModel")
const ProjectSectionModel = require("../../zCommon/aModel/cMain/hProjectSectionModel")
const ProjectGroupModel = require("../../zCommon/aModel/cMain/iProjectGroupModel")
const ProjectModel = require("../../zCommon/aModel/cMain/jProjectModel")


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
