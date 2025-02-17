import API from "@/love/aAPI/API";
import clearFormObject from "@/love/dFunction/aClearFormObject";
import loading from "@/love/dFunction/fLoading";
import FinalRouteName from "@/love/gRoute/FinalRouteName";


const APIs = {
  // Home Page Retrieve API
  HomePageAPI: (Redux, ReduxUltimate) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.UnprotectedAPI.HomePageAPI.RetrieveAPI()
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
          ...Redux.state.ReceivedObject,
          Retrieve: {
            HeroRetrieve: serverResponse.retrieve?.hero_retrieve?.frontend && {
              image: serverResponse.retrieve?.hero_retrieve?.frontend?.aImage,
              title: serverResponse.retrieve?.hero_retrieve?.frontend?.aTitle,
              subtitle: serverResponse.retrieve?.hero_retrieve?.frontend?.aSubtitle,
              description: serverResponse.retrieve?.hero_retrieve?.frontend?.aDescription,
              tag: serverResponse.retrieve?.hero_retrieve?.frontend?.dTag,
              webLinks: serverResponse.retrieve?.hero_retrieve?.frontend?.dWebLinks,
              socialLinks: serverResponse.retrieve?.hero_retrieve?.frontend?.dSocialLinks,
            },
            CounterList: serverResponse.retrieve?.counter_list &&
              serverResponse.retrieve?.counter_list?.map(each => {
                return {
                  image: each?.aImage,
                  title: each?.aTitle,
                  subtitle: each?.aSubtitle,
                  description: each?.aDescription,
                }
              }),
            AboutRetrieve: {
              actually: serverResponse.retrieve?.about_retrieve?.actually && {
                image: serverResponse.retrieve?.about_retrieve?.actually?.aImage,
                title: serverResponse.retrieve?.about_retrieve?.actually?.aTitle,
                subtitle: serverResponse.retrieve?.about_retrieve?.actually?.aSubtitle,
                description: serverResponse.retrieve?.about_retrieve?.actually?.aDescription,
              },
              comparatively: serverResponse.retrieve?.about_retrieve?.comparatively && {
                image: serverResponse.retrieve?.about_retrieve?.comparatively?.aImage,
                title: serverResponse.retrieve?.about_retrieve?.comparatively?.aTitle,
                subtitle: serverResponse.retrieve?.about_retrieve?.comparatively?.aSubtitle,
                description: serverResponse.retrieve?.about_retrieve?.comparatively?.aDescription,
              },
            },    
            ServiceList: serverResponse.retrieve?.service_list?.map(each => {
              return {
                title: each?.aTitle,
                description: each?.aDescription,
              }
            }),
            BranchRetrieve: serverResponse.retrieve?.branch_retrieve && {
              title: serverResponse.retrieve?.branch_retrieve?.aTitle,
              subtitle: serverResponse.retrieve?.branch_retrieve?.aSubtitle,
              description: serverResponse.retrieve?.branch_retrieve?.aDescription,
              subBranches: serverResponse.retrieve?.branch_retrieve?.cSubBranches?.map(each => {
                return {
                  title: each?.aTitle,
                  subtitle: each?.aSubtitle,
                  description: each?.aDescription,
                  subSubBranches: each?.cSubSubBranches?.map(each1 => {
                    return {
                      image: each1?.aImage,
                      title: each1?.aTitle,
                      subtitle: each1?.aSubtitle,
                      description: each1?.aDescription,
                      status: each1?.aStatus,
                      links: each1?.dWebLinks,
                    }
                  }),    
                }
              }),
            },
            ProjectSectionRetrieve: serverResponse.retrieve?.project_section_retrieve && {
              title: serverResponse.retrieve?.project_section_retrieve?.aTitle,
              subtitle: serverResponse.retrieve?.project_section_retrieve?.aSubtitle,
              description: serverResponse.retrieve?.project_section_retrieve?.aDescription,
              projectGroups: serverResponse.retrieve?.project_section_retrieve?.cProjectGroups?.map(each => {
                return {
                  title: each?.aTitle,
                  subtitle: each?.aSubtitle,
                  description: each?.aDescription,
                  projects: each?.cProjects?.map(each1 => {
                    return {
                      image: each1?.aImage,
                      title: each1?.aTitle,
                      subtitle: each1?.aSubtitle,
                      description: each1?.aDescription,
                      status: each1?.aStatus,
                      links: each1?.dWebLinks,
                    }
                  }),    
                }
              }),
            },
            ProgramSectionRetrieve: serverResponse.retrieve?.program_section_retrieve && {
              title: serverResponse.retrieve?.program_section_retrieve?.aTitle,
              subtitle: serverResponse.retrieve?.program_section_retrieve?.aSubtitle,
              description: serverResponse.retrieve?.program_section_retrieve?.aDescription,
              programs: serverResponse.retrieve?.program_section_retrieve?.cPrograms?.map(each => {
                return {
                  id: each?._id,
                  image: each?.aImage,
                  title: each?.aTitle,
                  subtitle: each?.aSubtitle,
                  description: each?.aDescription,
                  status: each?.aStatus,
                  links: each?.dWebLinks,
                }
              }),
            },
          }
        }})
      }
    })
    .catch(error => {
        // console.log(error.response.data);
        const serverResponse = error.response.data
    })
    .finally(() => loading(ReduxUltimate, false) );
  },
}

export default APIs