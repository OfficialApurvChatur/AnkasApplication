const InitialState = {
	A: "Bro... Inside ChatPageState",
	FormObject: {
		FormValue: {},
		FormError: {},
		FormIsValid: false,
	},	
	ReceivedObject: {},
	RequiredObject: {},
	ExtraObject: {},
}

const ChatPageState = (state=InitialState, action) => {
	switch (action.type) {
		case 'form-object-chat-page':
			return {...state, FormObject: action.payload}
		case 'received-object-chat-page':
			return {...state, ReceivedObject: action.payload}
		case 'required-object-chat-page':
			return {...state, RequiredObject: action.payload}
		case 'extra-object-chat-page':
			return {...state, ExtraObject: action.payload}
		default:
			return state
	}
}

export const Action = {
	FormObject: 'form-object-chat-page',
	ReceivedObject: 'received-object-chat-page',
	RequiredObject: 'required-object-chat-page',
	ExtraObject: 'extra-object-chat-page',
}  

export default ChatPageState