import handleInput from "@/love/dFunction/dHandleInput"
import Function from "./Function"
import FinalRouteName from "@/love/gRoute/FinalRouteName"
import validateFormObject from "@/love/dFunction/bValidateFormObject"


const Data = (Redux) => {
  return (
    {
      title: "🎠 Reset Password 🎠",
      subtitle: `Great! Now enter your new password and confirm password. 
        Further we'll redirect you to the homepage with successful login. 
        😊 Don't Forget Again!
      `,
      inputs: [
        {
          label: "New Password",
          placeholder: "New Password",
          type: "password",
          name: "newPassword",
          onChange: event => handleInput(event, Redux),
        },    
        {
          label: "Confirm Password",
          placeholder: "Confirm Password",
          type: "password",
          name: "confirmPassword",
          onChange: event => handleInput(event, Redux),
        },    
      ],
      buttons: [
        {
          type: "button",
          label: "Reset Password",
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
          note: "Don't have an account?",
          label: "Register",
          route: FinalRouteName.AuthRoute.RegisterRoute
        },
      ]
    }
  )
}

export default Data