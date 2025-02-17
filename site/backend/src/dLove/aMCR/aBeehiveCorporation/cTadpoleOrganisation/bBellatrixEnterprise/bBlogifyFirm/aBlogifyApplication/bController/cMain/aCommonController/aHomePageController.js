const cloudinary = require("cloudinary")
const catchAsyncError = require("../../../../../../../../../bFunction/aCatchAsyncError")
const ErrorHandler = require("../../../../../../../../../bFunction/bErrorHandler")
const handleImage = require("../../../../../../../../../bFunction/hHandleImage")
const SearchFilterPaginate = require("../../../../../../../../../bFunction/fSearchFilterPaginate")
const HeroModel = require("../../../aModel/cMain/aHeroModel")
const CounterModel = require("../../../aModel/cMain/bCounterModel")
const ProgramSectionModel = require("../../../aModel/cMain/cProgramSectionModel")
const ProgramModel = require("../../../aModel/cMain/dProgramModel")
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
          hero_retrieve: {
            admin: await HeroModel.findOne({ dType: "Admin" }).sort({ _id: -1 }),
            frontend: await HeroModel.findOne({ dType: "Frontend" }).sort({ _id: -1 }),
          },
          counter_list: await CounterModel.find().sort({ _id: -1 }).limit(3),
          program_section_retrieve: await ProgramSectionModel.findOne().sort({ _id: -1 }).populate({
            path: 'cPrograms',
            model: ProgramModel,
          }),
        };
  
				nodeCache.set(`${Cache}Retrieve`, JSON.stringify(object));
			}

      // let hero_retrieve = {
      //   admin: await HeroModel.findOne({ dType: "Admin" }).sort({ _id: -1 }),
      //   frontend: await HeroModel.findOne({ dType: "Frontend" }).sort({ _id: -1 }),
      // };
      // let counter_list = await CounterModel.find().sort({ _id: -1 }).limit(3);
      // let program_section_retrieve = await ProgramSectionModel.findOne().sort({ _id: -1 }).populate({
      //   path: 'cPrograms',
      //   model: ProgramModel,
      // });

      // Not Found
      // if (!home_retrieve) next(new ErrorHandler(`Home Not Found`, 404))
  
      // Response
      response.status(200).json({
        success: true,
        message: `${Label} Reterived Successfully`,
        retrieve: {
          hero_retrieve: object["hero_retrieve"],
          counter_list: object["counter_list"],
          program_section_retrieve: object["program_section_retrieve"],
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
