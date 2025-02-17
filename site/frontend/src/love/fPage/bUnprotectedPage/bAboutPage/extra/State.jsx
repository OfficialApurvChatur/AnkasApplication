const InitialState = {
	A: "Bro... Inside AboutPageState",
	FormObject: {
		FormValue: {},
		FormError: {},
		FormIsValid: false,
	},	
	ReceivedObject: {},
	RequiredObject: {},
	ExtraObject: {},
}

const AboutPageState = (state=InitialState, action) => {
	switch (action.type) {
		case 'form-object-about-page':
			return {...state, FormObject: action.payload}
		case 'received-object-about-page':
			return {...state, ReceivedObject: action.payload}
		case 'required-object-about-page':
			return {...state, RequiredObject: action.payload}
		case 'extra-object-about-page':
			return {...state, ExtraObject: action.payload}
		default:
			return state
	}
}

export const Action = {
	FormObject: 'form-object-about-page',
	ReceivedObject: 'received-object-about-page',
	RequiredObject: 'required-object-about-page',
	ExtraObject: 'extra-object-about-page',
}  

export default AboutPageState