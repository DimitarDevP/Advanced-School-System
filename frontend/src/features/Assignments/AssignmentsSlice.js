import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../constants"

export const AssignmentsSlice = createSlice({
    name: "Assignments",
    initialState : {
        assignments: {
            assignments: [],

            create: statuses.idle,
            createError: "",
            
            read: statuses.idle,
            readError: "",

            update: statuses.idle,
            updateError: "",

            delete: statuses.idle,
            deleteError: "",
        }
    },

    reducers: {
        createAssignmentRequest: state => {
            state.assignments.create = statuses.pending
            state.assignments.createError = ""
        },
        createAssignmentSuccess: (state, action) => {
            state.assignments.create = statuses.idle
            state.assignments.assignments.push(action.payload.assignment)
        },
        createAssignmentFailiure: (state, action) => {
            state.assignments.create = statuses.idle
            state.assignments.createError = action.payload
        },
        readAssignmentsRequest: state => {
            state.assignments.read = statuses.pending
            state.assignments.readError = ""
        },
        readAssignmentsSuccess: (state, action) => {
            state.assignments.read = statuses.idle
            state.assignments.assignments = action.payload.assignments
        },
        readAssignmentsFailiure: (state, action) => {
            state.assignments.read = statuses.idle
            state.assignments.readError = action.payload
        },
        updateAssignmentRequest: state => {
            state.assignments.update = statuses.pending
            state.assignments.updateError = ""
        },
        updateAssignmentSuccess: (state, action) => {
            state.assignments.update = statuses.idle
            state.assignments.assignments = state.assignments.assignments.filter(assignment => parseInt(assignment._id) !== parseInt(action.payload.assignment._id))
            state.assignments.assignments.push(action.payload.assignment)
        },
        updateAssignmentFailiure: (state, action) => {
            state.assignments.update = statuses.idle
            state.assignments.updateError = action.payload
        },
        deleteAssignmentRequest: state => {
            state.assignments.delete = statuses.pending
            state.assignments.deleteError = ""
        },
        deleteAssignmentSuccess: (state, action) => {
            state.assignments.delete = statuses.idle
            state.assignments.assignments = state.assignments.assignments.filter(assignment => parseInt(assignment._id) !== parseInt(action.payload.id))
        },
        deleteAssignmentFailiure: (state, action) => {
            state.assignments.delete = statuses.idle
            state.assignments.deleteError = action.payload
        },
    }
})

export const {
    createAssignmentRequest,
    createAssignmentSuccess,
    createAssignmentFailiure,
    readAssignmentsRequest,
    readAssignmentsSuccess,
    readAssignmentsFailiure,
    updateAssignmentRequest,
    updateAssignmentSuccess,
    updateAssignmentFailiure,
    deleteAssignmentRequest,
    deleteAssignmentSuccess,
    deleteAssignmentFailiure
} = AssignmentsSlice.actions

export default AssignmentsSlice.reducer