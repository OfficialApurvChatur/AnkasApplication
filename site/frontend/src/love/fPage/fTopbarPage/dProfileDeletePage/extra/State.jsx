const InitialState = {
	A: "Bro... Inside ProfileDeletePageState",
	FormObject: {
		FormValue: {},
		FormError: {},
		FormIsValid: false,
	},	
	ReceivedObject: {},
	RequiredObject: {},
	ExtraObject: {},
}

const ProfileDeletePageState = (state=InitialState, action) => {
	switch (action.type) {
		case 'form-object-profile-delete-page':
			return {...state, FormObject: action.payload}
		case 'received-object-profile-delete-page':
			return {...state, ReceivedObject: action.payload}
		case 'required-object-profile-delete-page':
			return {...state, RequiredObject: action.payload}
		case 'extra-object-profile-delete-page':
			return {...state, ExtraObject: action.payload}
		default:
			return state
	}
}

export const Action = {
	FormObject: 'form-object-profile-delete-page',
	ReceivedObject: 'received-object-profile-delete-page',
	RequiredObject: 'required-object-profile-delete-page',
	ExtraObject: 'extra-object-profile-delete-page',
}  

export default ProfileDeletePageState