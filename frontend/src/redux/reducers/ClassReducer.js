import { CREATE_CLASS, ENROLL_CLASS, GET_CLASS } from '../constants'

let classes = {
    currentUserClass: {
		class_id: "",
		grade: "",
		class: "",
		_year: "",
		students : {
			
		}
	},
	allClasses: [
		{
			class_id: "",
			grade: "",
			class: "",
			_year: "",
			students : {
				
			}
		}
	]
}

export const classReducer = (state = classes, action) => {
	switch (action.type) {
		case CREATE_CLASS:
			const newState = {
				...state,
				...action.payload
			}
			return newState
		case ENROLL_CLASS:
			return state
		case GET_CLASS:
			return state
		default:
			return state
	}
}