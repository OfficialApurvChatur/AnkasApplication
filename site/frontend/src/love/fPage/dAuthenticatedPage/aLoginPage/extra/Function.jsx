import regex from "../../../../dFunction/eRegex"


const Function = {
  validateFormValues: FormValue => {
		const errors = {}

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
	}
}

export default Function