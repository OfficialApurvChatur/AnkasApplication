import regex from "@/love/dFunction/eRegex"


const Function = {
  validateFormValues: FormValue => {
		const errors = {}

		// firstName
		if (!FormValue.firstName) {
			errors.firstName = "Please enter first name"
		} else if (!regex.name.test(FormValue.firstName)) {
			errors.email = "Please enter valid first name"
		}
		// lastName
		if (!FormValue.lastName) {
			errors.lastName = "Please enter last name"
		} else if (!regex.name.test(FormValue.lastName)) {
			errors.email = "Please enter valid last name"
		}		
		// email
		if (!FormValue.email) {
			errors.email = "Please enter email"
		} else if (!regex.email.test(FormValue.email)) {
			errors.email = "Please enter valid email"
		}
		// password
		if (!FormValue.password) {
				errors.password = "Please enter password"
		} else if (FormValue.password.length < 8 || FormValue.password.length > 16) {
		    errors.password = "Password length should be 8 to 16 characters"
		} else if (!regex.password.test(FormValue.password)) {
		    errors.password = "Password should have 1 lowercase, 1 uppercase, 1 number, and be 8 to 16 characters long"
		} 

		return errors;
	},

	handleCheckboxInput: (event, Redux1) => {
    let list = Redux1.state.FormObject.FormValue?.[event.target.name] || []

    Redux1.dispatch({
      type: Redux1.action.FormObject,
      payload: {
        ...Redux1.state.FormObject,
        FormValue: {
          ...Redux1.state.FormObject?.FormValue,
          [event.target.name]: list.includes(event.target.value) ? 
            list.filter((selectedId) => selectedId !== event.target.value)
            :
            [...list, event.target.value],
        },
      },
    })
  }

}

export default Function