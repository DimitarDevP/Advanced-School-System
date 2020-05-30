import { CREATE_CLASS, ENROLL_CLASS, GET_CLASS, LOGOUT, GET_MY_CLASSES } from '../constants'

let classes = {
    currentUserClasses: [],
	allClasses: []
}

export const classReducer = (state = classes, action) => {
	switch (action.type) {
		case CREATE_CLASS:
			return {
				...state,
				currentUserClasses: [
					...state.currentUserClasses,
					action.payload.class
				]
			}
		case GET_MY_CLASSES:
			return {
				...state,
				currentUserClasses: action.payload.currentUserClasses
			}
		case ENROLL_CLASS:
			
			return {
				...state,
				currentUserClasses: [...state.currentUserClasses, action.payload.class]
			}
		case GET_CLASS:
			return state
		case LOGOUT:
			return {
				currentUserClasses: [],
				allClasses: []
			}
		default:
			return state
	}
}