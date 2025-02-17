const InitialState = {
	A: "Bro... Inside RegisterPageState",
	FormObject: {
		FormValue: {},
		FormError: {},
		FormIsValid: false,
	},	
	ReceivedObject: {},
	RequiredObject: {},
	ExtraObject: {},
}

const RegisterPageState = (state=InitialState, action) => {
	switch (action.type) {
		case 'form-object-register-page':
			return {...state, FormObject: action.payload}
		case 'received-object-register-page':
			return {...state, ReceivedObject: action.payload}
		case 'required-object-register-page':
			return {...state, RequiredObject: action.payload}
		case 'extra-object-register-page':
			return {...state, ExtraObject: action.payload}
		default:
			return state
	}
}

export const Action = {
	FormObject: 'form-object-register-page',
	ReceivedObject: 'received-object-register-page',
	RequiredObject: 'required-object-register-page',
	ExtraObject: 'extra-object-register-page',
}  

export default RegisterPageState