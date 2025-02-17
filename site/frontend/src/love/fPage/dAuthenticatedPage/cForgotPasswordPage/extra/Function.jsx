import regex from "@/love/dFunction/eRegex";


const Function = {
  validateFormValues: FormValue => {
		const errors = {}

		// email
		if (!FormValue.email) {
			errors.email = "Please enter email"
		} else if (!regex.email.test(FormValue.email)) {
			errors.email = "Please enter valid email"
		}

		return errors;
	}
}

export default Function