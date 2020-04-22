import { LOGIN, LOGOUT, UPDATE_IMAGE } from '../constants'

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
	}
}

export const userReducer = (state = currentUser, action) => {
	switch (action.type) {
		case LOGIN:
			const response = action.payload
			return {
				...currentUser, ...response
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
				}
			}
		case UPDATE_IMAGE:
			return {
				...currentUser, ...action.payload
			}
		default:
			return state
	}
}