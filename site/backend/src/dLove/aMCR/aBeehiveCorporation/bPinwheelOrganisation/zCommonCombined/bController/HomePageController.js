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
const AdminHeroModel = require("../../../../bCommon/aModel/aSetting/bAdminHeroModel")
const nodeCache = require("../../../../../bFunction/qNodeCache")


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
          home_retrieve: {
            admin: await HeroModel.findOne({ dType: "Admin" }).sort({ _id: -1 }),
            frontend: await HeroModel.findOne({ dType: "Frontend" }).sort({ _id: -1 }),
          },
          counter_list: await CounterModel.find().sort({ _id: -1 }).limit(3),
          about_retrieve: {
            actually: await AboutModel.findOne({ dTag: "actually" }).sort({ _id: -1 }),
            comparatively: await AboutModel.findOne({ dTag: "comparatively" }).sort({ _id: -1 })
          },
          service_list: await ServiceModel.find().sort({ _id: -1 }).limit(4),
          branch_retrieve: await BranchModel.findOne().sort({ _id: -1 }).populate({
            path: 'cSubBranches',
            model: SubBranchModel,
            populate: {
              path: 'cSubSubBranches',
              model: SubSubBranchModel,
            },
          }),
          project_section_retrieve: await ProjectSectionModel.findOne().sort({ _id: -1 }).populate({
            path: 'cProjectGroups',
            model: ProjectGroupModel,
            populate: {
              path: 'cProjects',
              model: ProjectModel,
            },
          })
        };
  
				nodeCache.set(`${Cache}Retrieve`, JSON.stringify(object));
			}

      // let hero_retrieve = {
      //   admin: await HeroModel.findOne({ dType: "Admin" }).sort({ _id: -1 }),
      //   frontend: await HeroModel.findOne({ dType: "Frontend" }).sort({ _id: -1 }),
      // };
      // let counter_list = await CounterModel.find().sort({ _id: -1 }).limit(3);
      // let about_retrieve = {
      //   actually: await AboutModel.findOne({ dTag: "actually" }).sort({ _id: -1 }),
      //   comparatively: await AboutModel.findOne({ dTag: "comparatively" }).sort({ _id: -1 })
      // };
      // let service_list = await ServiceModel.find().sort({ _id: -1 }).limit(4);
      // let branch_retrieve = await BranchModel.findOne().sort({ _id: -1 }).populate({
      //   path: 'cSubBranches',
      //   model: SubBranchModel,
      //   populate: {
      //     path: 'cSubSubBranches',
      //     model: SubSubBranchModel,
      //   },
      // });
      // let project_section_retrieve = await ProjectSectionModel.findOne().sort({ _id: -1 }).populate({
      //   path: 'cProjectGroups',
      //   model: ProjectGroupModel,
      //   populate: {
      //     path: 'cProjects',
      //     model: ProjectModel,
      //   },
      // });

      // Not Found
      // if (!home_retrieve) next(new ErrorHandler(`Home Not Found`, 404))
  
      // Response
      response.status(200).json({
        success: true,
        message: `${Label} Reterived Successfully`,
        retrieve: {
          hero_retrieve: object["home_retrieve"],
          counter_list: object["counter_list"],
          about_retrieve: object["about_retrieve"],
          service_list: object["service_list"],
          branch_retrieve: object["branch_retrieve"],
          project_section_retrieve: object["project_section_retrieve"]
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
