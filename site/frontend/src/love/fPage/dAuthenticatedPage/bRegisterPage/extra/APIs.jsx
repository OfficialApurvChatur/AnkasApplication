
import API from "@/love/aAPI/API";
import clearFormObject from "@/love/dFunction/aClearFormObject";
import loading from "@/love/dFunction/fLoading";
import FinalRouteName from "@/love/gRoute/FinalRouteName";


const APIs = {
  // Register API
  RegisterAPI: (Redux, navigate, ReduxUltimate, toast) => {
    loading(ReduxUltimate, true)

    API.GlobalAPI.ProtectedAPI.AuthenticatedAPI.RegisterAPI({
      data: {
        eFirstName: Redux.state.FormObject.FormValue.firstName,
        eLastName: Redux.state.FormObject.FormValue.lastName,
        eEmail: Redux.state.FormObject.FormValue.email,
        ePassword: Redux.state.FormObject.FormValue.password,

        aTitle: `${Redux.state.FormObject.FormValue.firstName} ${Redux.state.FormObject.FormValue.lastName}`,
        aSubtitle: "Hi there I am using Beehive",
        aDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae arcu vestibulum, fringilla diam quis, tincidunt nunc. Mauris faucibus commodo nibh et euismod. Aenean ultricies turpis sit amet venenatis elementum. Aliquam massa nisi, pretium vel nisi ac, vehicula pharetra justo.`,
        aStatus: true,

        cRole: '660fd49647395ad3b930230f'
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