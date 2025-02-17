import regex from "@/love/dFunction/eRegex"

const Function = {
  validateFormValues: FormValue => {
		const errors = {}

		// firstName
		if (!FormValue.firstName) {
			errors.firstName = "Please enter first name"
		} else if (!regex.name.test(FormValue.firstName)) {
			errors.firstName = "Please enter valid first name"
		}
		// lastName
		if (!FormValue.lastName) {
			errors.lastName = "Please enter last name"
		} else if (!regex.name.test(FormValue.lastName)) {
			errors.lastName = "Please enter valid last name"
		}		

		// image
		if (!FormValue.image) {
			errors.image = "Please select image"
		}

		return errors;	}
}

export default Function