
import API from "@/love/aAPI/API";
import clearFormObject from "@/love/dFunction/aClearFormObject";
import loading from "@/love/dFunction/fLoading";
import FinalRouteName from "@/love/gRoute/FinalRouteName";


const APIs = {
  // Login API
  LoginAPI: (Redux, navigate, ReduxUltimate, toast) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthenticatedAPI.LoginAPI({
      data: {
        eEmail: Redux.state.FormObject.FormValue.email,
        ePassword: Redux.state.FormObject.FormValue.password
      }
    })
    .then(response => {
      // console.log(response.data);
      const serverResponse = response.data;

      if (serverResponse.success === true) {
        ReduxUltimate.dispatch({ type: ReduxUltimate.action.ExtraObject, payload: {
          ...ReduxUltimate.state.ExtraObject,
          Halchal: !ReduxUltimate.state.ExtraObject?.Halchal || true
        }})
        toast({
          description: serverResponse.message,
        });
        clearFormObject(Redux)
        navigate(FinalRouteName.GlobalRoute.HomeRoute)
      }
    })
    .catch(error => {
      // console.log(error.response.data);
      const serverResponse = error.response.data
      toast({
        description: serverResponse.message,
      });
    })
    .finally(() => loading(ReduxUltimate, false) );
  },
}

export default APIs