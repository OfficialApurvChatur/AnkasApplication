import regex from "@/love/dFunction/eRegex"

const Function = {
  validateFormValues: FormValue => {
		const errors = {}

		// oldPassword
		if (!FormValue || !FormValue.oldPassword) {
			errors.oldPassword = "Please enter old password"
		} else if (!regex.password.test(FormValue.oldPassword)) {
			errors.oldPassword = "Old password should have 1 lowercase, 1 uppercase, 1 number, and be 8 to 16 characters long"
		} 
		// newPassword
		if (!FormValue || !FormValue.newPassword) {
			errors.newPassword = "Please enter new password"
		} else if (!regex.password.test(FormValue.newPassword)) {
			errors.newPassword = "New Password should have 1 lowercase, 1 uppercase, 1 number, and be 8 to 16 characters long"
		} 
		// confirmPassword
		if (!FormValue || !FormValue.confirmPassword) {
			errors.confirmPassword = "Please enter confirm password"
		} else if (!regex.password.test(FormValue.confirmPassword)) {
			errors.confirmPassword = "Confirm password should have 1 lowercase, 1 uppercase, 1 number, and be 8 to 16 characters long"
		} else if (FormValue.newPassword !== FormValue.confirmPassword) {
			errors.confirmPassword = "Please match the password"
		}

		return errors;	}
}

export default Function