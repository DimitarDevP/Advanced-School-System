import { LOGIN, LOGOUT, UPDATE_IMAGE, REGISTER, GET_ALL_USERS } from '../constants'

let currentUser = {
	auth_key: '',
	error_code: '',
	error_message: '',
	user: {
		_password: '',
		birth_date: '',
		email: '',
		firstname: '',
		lastname: '',
		parent_lastname: '',
		parent_name: '',
		parent_phone: '',
		phone_number: '',
		present_status: '',
		profile_picture: '',
		salary: 0,
		sex: '',
		user_id: 0,
		user_role: '',
		verified: 0
	},
	Users: []
}

export const userReducer = (state = currentUser, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...currentUser, ...action.payload
			}
		case REGISTER:
			const response = action.payload
			return { 
				...currentUser,
				...response 
			}
		case LOGOUT:
			return {
				auth_key: '',
				error_code: '',
				error_message: '',
				user: {
					_password: '',
					birth_date: '',
					email: '',
					firstname: '',
					lastname: '',
					parent_lastname: '',
					parent_name: '',
					parent_phone: '',
					phone_number: '',
					present_status: '',
					profile_picture: '',
					salary: 0,
					sex: '',
					user_id: 0,
					user_role: '',
					verified: 0
				},
				Users: []
			}
		case UPDATE_IMAGE:
			const data = action.payload
			const newState = {
				...state,
				...data.response,
				user: {
					...state.user,
					profile_picture: data.profile_picture
				}
			}
			return newState

		case GET_ALL_USERS:
			return {
				...state,
				Users: action.payload.users
			}
		default:
			return state
	}
}