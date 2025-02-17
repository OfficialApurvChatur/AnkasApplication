import API from "../../../aAPI/API";
import FinalRouteName from "../../../gRoute/FinalRouteName";
import loading from "../../../dFunction/fLoading";

const APIs = {
  // Profile Retrieve API
  ProfileRetrieveAPI: (Redux) => {
    loading(Redux, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.TopbarAPI.ProfileAPI.RetrieveAPI()
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        // return Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
        //   ...Redux.state.ReceivedObject,
        //   ProfileRetrieve: serverResponse.profile_retrieve
        // }})

        const ProfileRetrieve =  serverResponse.profile_retrieve
        return APIs.NotificationListAPI(Redux, ProfileRetrieve)
      }
    })
    .catch(error => {
        // console.log(error.response.data);
        const serverResponse = error.response.data
    })
    .finally(() => loading(Redux, false) );
  },

  // Notification List API
  NotificationListAPI: (Redux, ProfileRetrieve) => {
    loading(Redux, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.TopbarAPI.NotificationListAPI()
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        return Redux.dispatch({ type: Redux.action.ReceivedObject, payload: {
          ...Redux.state.ReceivedObject,
          ProfileRetrieve,
          NotificationList: serverResponse.list
        }})
      }
    })
    .catch(error => {
        // console.log(error.response.data);
        const serverResponse = error.response.data
    })
    .finally(() => loading(Redux, false) );
  },  

  // Logout API
  LogoutAPI: (navigate, Redux) => {
    console.log("first")
    loading(Redux, true)

    API.GlobalAPI.ProtectedAPI.AuthorisedAPI.TopbarAPI.Logout.LogoutAPI()
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        Redux.dispatch({ type: Redux.action.ReceivedObject, payload: null })
        toast.success(serverResponse.message);
        navigate(FinalRouteName.AuthRoute.LoginRoute)
      }
    })
    .catch(error => {
        // console.log(error.response.data);
        const serverResponse = error
    })
    .finally(() => loading(Redux, false) );
  },  
  
}

export default APIs