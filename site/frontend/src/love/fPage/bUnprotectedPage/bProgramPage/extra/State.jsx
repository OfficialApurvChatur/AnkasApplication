const InitialState = {
	A: "Bro... Inside ProjectPageState",
	FormObject: {
		FormValue: {},
		FormError: {},
		FormIsValid: false,
	},	
	ReceivedObject: {},
	RequiredObject: {},
	ExtraObject: {},
}

const ProjectPageState = (state=InitialState, action) => {
	switch (action.type) {
		case 'form-object-project-page':
			return {...state, FormObject: action.payload}
		case 'received-object-project-page':
			return {...state, ReceivedObject: action.payload}
		case 'required-object-project-page':
			return {...state, RequiredObject: action.payload}
		case 'extra-object-project-page':
			return {...state, ExtraObject: action.payload}
		default:
			return state
	}
}

export const Action = {
	FormObject: 'form-object-project-page',
	ReceivedObject: 'received-object-project-page',
	RequiredObject: 'required-object-project-page',
	ExtraObject: 'extra-object-project-page',
}  

export default ProjectPageState