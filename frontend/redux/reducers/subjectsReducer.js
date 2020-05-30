import { CREATE_SUBJECT, ENROLL_SUBJECT, GET_ALL_SUBJECTS, GET_ENROLLED_SUBJECTS, GET_SUBJECT_CLASSES } from '../constants'

let subjects = {
    allSubjects: [

	],
	enrolledSubjects: [

	],
	subjectsClasses: [

	]
}

export const subjectsReducer = (state = subjects, action) => {
	switch (action.type) {
		case CREATE_SUBJECT:
			return {
				...state,
				allSubjects: action.payload.subjects
			}
		case ENROLL_SUBJECT:
			return state
		case GET_ALL_SUBJECTS:
			return {
				...state,
				allSubjects: action.payload.subjects
			}
		case GET_ENROLLED_SUBJECTS:
			return {
				...state,
				enrolledSubjects: action.payload.enrolled_subjects
			}
		case GET_SUBJECT_CLASSES:
			return {
				...state,
				subjectsClasses: action.payload.classes
			}
		default:
			return state
	}
}