const InitialState = {
	A: "Bro... Inside ForgotPasswordPageState",
	FormObject: {
		FormValue: {},
		FormError: {},
		FormIsValid: false,
	},	
	ReceivedObject: {},
	RequiredObject: {},
	ExtraObject: {},
}

const ForgotPasswordPageState = (state=InitialState, action) => {
	switch (action.type) {
		case 'form-object-forgot-password-page':
			return {...state, FormObject: action.payload}
		case 'received-object-forgot-password-page':
			return {...state, ReceivedObject: action.payload}
		case 'required-object-forgot-password-page':
			return {...state, RequiredObject: action.payload}
		case 'extra-object-forgot-password-page':
			return {...state, ExtraObject: action.payload}
		default:
			return state
	}
}

export const Action = {
	FormObject: 'form-object-forgot-password-page',
	ReceivedObject: 'received-object-forgot-password-page',
	RequiredObject: 'required-object-forgot-password-page',
	ExtraObject: 'extra-object-forgot-password-page',
}  

export default ForgotPasswordPageState