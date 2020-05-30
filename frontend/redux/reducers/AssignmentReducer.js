import { GET_ALL_ASSIGNMENTS, CREATE_ASSIGNMENT, SUBMIT_TO_ASSIGNMENT } from '../constants'

let assignments = {
    allAssignments : [
		{
			assignment_name: "",
			assignment_description: ""
		}
	]
}

export const AssignmentReducer = (state = assignments, action) => {
	switch (action.type) {
		case GET_ALL_ASSIGNMENTS:
			return {
                allAssignments: action.payload.assignments
            }
		case SUBMIT_TO_ASSIGNMENT:
			return state
		case CREATE_ASSIGNMENT:
			return {
				allAssignments: action.payload.assignments
			}
		default:
			return state
	}
}