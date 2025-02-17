const InitialState = {
	A: "Bro... Inside LoginPageState",
	FormObject: {
		FormValue: {},
		FormError: {},
		FormIsValid: false,
	},	
	ReceivedObject: {},
	RequiredObject: {},
	ExtraObject: {},
}

const LoginPageState = (state=InitialState, action) => {
	switch (action.type) {
		case 'form-object-login-page':
			return {...state, FormObject: action.payload}
		case 'received-object-login-page':
			return {...state, ReceivedObject: action.payload}
		case 'required-object-login-page':
			return {...state, RequiredObject: action.payload}
		case 'extra-object-login-page':
			return {...state, ExtraObject: action.payload}
		default:
			return state
	}
}

export const Action = {
	FormObject: 'form-object-login-page',
	ReceivedObject: 'received-object-login-page',
	RequiredObject: 'required-object-login-page',
	ExtraObject: 'extra-object-login-page',
}  

export default LoginPageState