import handleInput from "@/love/dFunction/dHandleInput"
import Function from "./Function"
import FinalRouteName from "@/love/gRoute/FinalRouteName"
import validateFormObject from "@/love/dFunction/bValidateFormObject"


const Data = (Redux) => {
  return (
    {
      title: "😲 Forgot Password 😲",
      subtitle: `Oops, Don't worry! Enter your email below and hit the send link. 
        We'll redirect you to a URL where you can reset it back. 
        😊 Don't Forget Again!
      `,
      inputs: [
        {
          label: "Email",
          placeholder: "Email",
          type: "email",
          name: "email",
          onChange: event => handleInput(event, Redux),
        },
      ],
      buttons: [
        {
          type: "button",
          label: "Send Link",
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