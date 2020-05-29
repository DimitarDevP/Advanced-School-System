import { GET_ALL_ASSIGNMENTS, CREATE_ASSIGNMENT, SUBMIT_TO_ASSIGNMENT } from '../constants'

let abscences = {
    allAssignments : {

    },
}

export const AssignmentReducer = (state = abscences, action) => {
	switch (action.type) {
		case GET_ALL_ASSIGNMENTS:
			return {
                allAssignments: action.payload.assignments
            }
		case SUBMIT_TO_ASSIGNMENT:
			return {
				allAssignments: action.payload.assignments
			}
		case CREATE_ASSIGNMENT:
			return {
				allAssignments: action.payload.assignments
			}
		default:
			return state
	}
}