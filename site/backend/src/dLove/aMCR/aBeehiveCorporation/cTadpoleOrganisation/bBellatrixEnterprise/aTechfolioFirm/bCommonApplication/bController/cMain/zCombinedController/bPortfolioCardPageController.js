const cloudinary = require("cloudinary")
const catchAsyncError = require("../../../../../../../../../bFunction/aCatchAsyncError")
const ErrorHandler = require("../../../../../../../../../bFunction/bErrorHandler")
const handleImage = require("../../../../../../../../../bFunction/hHandleImage")
const SearchFilterPaginate = require("../../../../../../../../../bFunction/fSearchFilterPaginate")
const HeroModel = require("../../../aModel/cMain/aHeroModel")
const AboutModel = require("../../../aModel/cMain/bAboutModel")
const ExperienceModel = require("../../../aModel/cMain/cExperienceModel")
const ServiceModel = require("../../../aModel/cMain/dServiceModel")
const PortfolioModel = require("../../../aModel/cMain/ePortfolioModel")
const EventModel = require("../../../aModel/cMain/gEventModel")
const BlogModel = require("../../../aModel/cMain/iBlogModel")
const PortfolioCardModel = require("../../../aModel/cMain/fPortfolioCardModel")
const EventCardModel = require("../../../aModel/cMain/hEventCardModel")
const BlogCardModel = require("../../../aModel/cMain/jBlogCardModel")


exports.portfolioCardPageController = (Label= 'Portfolio Card Page') => {
	return {
		// List Controller
		list: catchAsyncError(async (request, response, next) => {
      let list = await PortfolioModel.findOne().sort({ _id: -1 }).populate({
        path: 'cPortfolioCards',
        model: PortfolioCardModel,
      });

      // Not Found
      // if (!home_retrieve) next(new ErrorHandler(`Home Not Found`, 404))
  
      // Response
      response.status(200).json({
        success: true,
        message: `${Label} Listed Successfully`,
        list
      })
    }),

    // Retrieve Controller
		retrieve: catchAsyncError(async (request, response, next) => {
			// Retrieve
			let retrieve = await PortfolioCardModel.findById(request.params.id)

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
