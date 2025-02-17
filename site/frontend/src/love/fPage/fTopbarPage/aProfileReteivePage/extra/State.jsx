const InitialState = {
	A: "Bro... Inside ProfileRetrievePageState",
	FormObject: {
		FormValue: {},
		FormError: {},
		FormIsValid: false,
	},	
	ReceivedObject: {},
	RequiredObject: {},
	ExtraObject: {},
}

const ProfileRetrievePageState = (state=InitialState, action) => {
	switch (action.type) {
		case 'form-object-profile-retrieve-page':
			return {...state, FormObject: action.payload}
		case 'received-object-profile-retrieve-page':
			return {...state, ReceivedObject: action.payload}
		case 'required-object-profile-retrieve-page':
			return {...state, RequiredObject: action.payload}
		case 'extra-object-profile-retrieve-page':
			return {...state, ExtraObject: action.payload}
		default:
			return state
	}
}

export const Action = {
	FormObject: 'form-object-profile-retrieve-page',
	ReceivedObject: 'received-object-profile-retrieve-page',
	RequiredObject: 'required-object-profile-retrieve-page',
	ExtraObject: 'extra-object-profile-retrieve-page',
}  

export default ProfileRetrievePageState