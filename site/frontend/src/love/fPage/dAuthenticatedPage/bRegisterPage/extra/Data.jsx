import handleInput from "@/love/dFunction/dHandleInput"
import Function from "./Function"
import FinalRouteName from "@/love/gRoute/FinalRouteName"
import validateFormObject from "@/love/dFunction/bValidateFormObject"


const Data = (Redux) => {
  return (
    {
      title: "🚀 Sign Up 🚀",
      subtitle: `Enter the required details to create an account. 
        Registered users will be assigned the role of 'Viewer'. 
        This role has access to read the information in Administration. 
        😊 Don't Hesitate, Go Ahead!
      `,
      inputs: [
        {
          label: "First Name",
          placeholder: "First Name",
          type: "text",
          name: "firstName",
          onChange: event => handleInput(event, Redux),
        },
        {
          label: "Last Name",
          placeholder: "Last Name",
          type: "text",
          name: "lastName",
          onChange: event => handleInput(event, Redux),
        },
        {
          label: "Email",
          placeholder: "Email",
          type: "email",
          name: "email",
          onChange: event => handleInput(event, Redux),
        },
        {
          label: "Password",
          placeholder: "Password",
          type: "password",
          name: "password",
          onChange: event => handleInput(event, Redux),
        },    
      ],
      buttons: [
        {
          type: "button",
          label: "Register",
          onClick: event => validateFormObject(event, Redux, Function.validateFormValues)
        }
      ],
      links: [
        {
          note: "Already have an account?",
          label: "Login",
          route: FinalRouteName.AuthRoute.LoginRoute
        },
        {
          note: "Forgot password?",
          label: "Reset",
          route: FinalRouteName.AuthRoute.ForgotPasswordRoute
        },
      ]
    }
  )
}

export default Data