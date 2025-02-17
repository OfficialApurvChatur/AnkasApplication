const InitialState = {
	A: "Bro... Inside ProfileUpdatePageState",
	FormObject: {
		FormValue: {},
		FormError: {},
		FormIsValid: false,
	},	
	ReceivedObject: {},
	RequiredObject: {},
	ExtraObject: {},
}

const ProfileUpdatePageState = (state=InitialState, action) => {
	switch (action.type) {
		case 'form-object-profile-update-page':
			return {...state, FormObject: action.payload}
		case 'received-object-profile-update-page':
			return {...state, ReceivedObject: action.payload}
		case 'required-object-profile-update-page':
			return {...state, RequiredObject: action.payload}
		case 'extra-object-profile-update-page':
			return {...state, ExtraObject: action.payload}
		default:
			return state
	}
}

export const Action = {
	FormObject: 'form-object-profile-update-page',
	ReceivedObject: 'received-object-profile-update-page',
	RequiredObject: 'required-object-profile-update-page',
	ExtraObject: 'extra-object-profile-update-page',
}  

export default ProfileUpdatePageState