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
const AdminHeroModel = require("../../../../../../../../bCommon/aModel/aSetting/bAdminHeroModel")
const nodeCache = require("../../../../../../../../../bFunction/qNodeCache")


exports.homePageController = (Label= 'Home Page', Cache= 'homePageController') => {
	return {
		// Retrieve Controller
		retrieve: catchAsyncError(async (request, response, next) => {

      // Object
			let object = {};

			// Cache
			if (nodeCache.has(`${Cache}Retrieve`)) {
				console.log("Home Object Cached...")
				object = JSON.parse(nodeCache.get(`${Cache}Retrieve`))
			} else {
				console.log("Home Object Not Cached...")

        object = {
          ...object, 
          hero_retrieve: await HeroModel.findOne().sort({ _id: -1 }),
          about_retrieve: await AboutModel.findOne().sort({ _id: -1 }),
          experience_retrieve: await ExperienceModel.findOne().sort({ _id: -1 }),
          service_retrieve: await ServiceModel.findOne().sort({ _id: -1 }),
          portfolio_retrieve: await PortfolioModel.findOne().sort({ _id: -1 }).populate({
            path: 'cPortfolioCards',
            model: PortfolioCardModel,
            options: { limit: 6 }
          }),
          event_retrieve: await EventModel.findOne().sort({ _id: -1 }).populate({
            path: 'cEventCards',
            model: EventCardModel,
            options: { limit: 6 }
          }),
          blog_retrieve: await BlogModel.findOne().sort({ _id: -1 }).populate({
            path: 'cBlogCards',
            model: BlogCardModel,
            options: { limit: 6 }
          }),
        };
  
				nodeCache.set(`${Cache}Retrieve`, JSON.stringify(object));
			}

      // let hero_retrieve = await HeroModel.findOne().sort({ _id: -1 });
      // let about_retrieve = await AboutModel.findOne().sort({ _id: -1 });
      // let experience_retrieve = await ExperienceModel.findOne().sort({ _id: -1 });
      // let service_retrieve = await ServiceModel.findOne().sort({ _id: -1 });
      // let portfolio_retrieve = await PortfolioModel.findOne().sort({ _id: -1 }).populate({
      //   path: 'cPortfolioCards',
      //   model: PortfolioCardModel,
      //   options: { limit: 6 }
      // });
      // let event_retrieve = await EventModel.findOne().sort({ _id: -1 }).populate({
      //   path: 'cEventCards',
      //   model: EventCardModel,
      //   options: { limit: 6 }
      // });
      // let blog_retrieve = await BlogModel.findOne().sort({ _id: -1 }).populate({
      //   path: 'cBlogCards',
      //   model: BlogCardModel,
      //   options: { limit: 6 }
      // });

      // Not Found
      // if (!home_retrieve) next(new ErrorHandler(`Home Not Found`, 404))
  
      // Response
      response.status(200).json({
        success: true,
        message: `${Label} Reterived Successfully`,
        retrieve: {
          hero_retrieve: object["hero_retrieve"],
          about_retrieve: object["about_retrieve"],
          experience_retrieve: object["experience_retrieve"],
          service_retrieve: object["service_retrieve"],
          portfolio_retrieve: object["portfolio_retrieve"],
          event_retrieve: object["event_retrieve"],
          blog_retrieve: object["blog_retrieve"]
        }
      })
    }),

    // Admin Retrieve Controller
		admin_retrieve: catchAsyncError(async (request, response, next) => {

      // Object
			let object = {};

			// Cache
			if (nodeCache.has(`${Cache}AdminRetrieve`)) {
				console.log("Admin Home Object Cached...")
				object = JSON.parse(nodeCache.get(`${Cache}AdminRetrieve`))
			} else {
				console.log("Admin Home Object Not Cached...")

        object = {
          ...object, 
          hero_retrieve: await AdminHeroModel.findOne().sort({ _id: -1 }),
        };
  
				nodeCache.set(`${Cache}AdminRetrieve`, JSON.stringify(object));
			}

      // let hero_retrieve = await AdminHeroModel.findOne().sort({ _id: -1 });

      // Not Found
      // if (!home_retrieve) next(new ErrorHandler(`Home Not Found`, 404))
  
      // Response
      response.status(200).json({
        success: true,
        message: `${Label} Reterived Successfully`,
        retrieve: {
          hero_retrieve: object["hero_retrieve"],
        }
      })
    }),
    
	}
}
