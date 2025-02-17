const InitialState = {
	A: "Bro... Inside ContactPageState",
	FormObject: {
		FormValue: {},
		FormError: {},
		FormIsValid: false,
	},	
	ReceivedObject: {},
	RequiredObject: {},
	ExtraObject: {},
}

const ContactPageState = (state=InitialState, action) => {
	switch (action.type) {
		case 'form-object-contact-page':
			return {...state, FormObject: action.payload}
		case 'received-object-contact-page':
			return {...state, ReceivedObject: action.payload}
		case 'required-object-contact-page':
			return {...state, RequiredObject: action.payload}
		case 'extra-object-contact-page':
			return {...state, ExtraObject: action.payload}
		default:
			return state
	}
}

export const Action = {
	FormObject: 'form-object-contact-page',
	ReceivedObject: 'received-object-contact-page',
	RequiredObject: 'required-object-contact-page',
	ExtraObject: 'extra-object-contact-page',
}  

export default ContactPageState