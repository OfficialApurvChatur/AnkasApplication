const InitialState = {
	A: "Bro... Inside ProfilePasswordUpdatePageState",
	FormObject: {
		FormValue: {},
		FormError: {},
		FormIsValid: false,
	},	
	ReceivedObject: {},
	RequiredObject: {},
	ExtraObject: {},
}

const ProfilePasswordUpdatePageState = (state=InitialState, action) => {
	switch (action.type) {
		case 'form-object-profile-password-update-page':
			return {...state, FormObject: action.payload}
		case 'received-object-profile-password-update-page':
			return {...state, ReceivedObject: action.payload}
		case 'required-object-profile-password-update-page':
			return {...state, RequiredObject: action.payload}
		case 'extra-object-profile-password-update-page':
			return {...state, ExtraObject: action.payload}
		default:
			return state
	}
}

export const Action = {
	FormObject: 'form-object-profile-password-update-page',
	ReceivedObject: 'received-object-profile-password-update-page',
	RequiredObject: 'required-object-profile-password-update-page',
	ExtraObject: 'extra-object-profile-password-update-page',
}  

export default ProfilePasswordUpdatePageState