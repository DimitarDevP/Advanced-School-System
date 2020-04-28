import { GET_ALL_ABSCENCES, SET_ABSCENCE, CHANGE_ABSCENCE_STATUS } from '../constants'

let subjects = {
    all_abscences: [

    ]
}

export const subjectsReducer = (state = subjects, action) => {
	switch (action.type) {
		case GET_ALL_ABSCENCES:
			return {
                all_abscences: action.payload.abscences
            }
		case SET_ABSCENCE:
			return {
				all_abscences: action.payload.abscences
			}
		case CHANGE_ABSCENCE_STATUS:
			return {
				all_abscences: [
                    ...state.all_abscences,
                    action.payload.abscence
                ]
			}
		default:
			return state
	}
}