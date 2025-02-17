const InitialState = {
	A: "Bro... Inside ResetPasswordPageState",
	FormObject: {
		FormValue: {},
		FormError: {},
		FormIsValid: false,
	},	
	ReceivedObject: {},
	RequiredObject: {},
	ExtraObject: {},
}

const ResetPasswordPageState = (state=InitialState, action) => {
	switch (action.type) {
		case 'form-object-reset-password-page':
			return {...state, FormObject: action.payload}
		case 'received-object-reset-password-page':
			return {...state, ReceivedObject: action.payload}
		case 'required-object-reset-password-page':
			return {...state, RequiredObject: action.payload}
		case 'extra-object-reset-password-page':
			return {...state, ExtraObject: action.payload}
		default:
			return state
	}
}

export const Action = {
	FormObject: 'form-object-reset-password-page',
	ReceivedObject: 'received-object-reset-password-page',
	RequiredObject: 'required-object-reset-password-page',
	ExtraObject: 'extra-object-reset-password-page',
}  

export default ResetPasswordPageState