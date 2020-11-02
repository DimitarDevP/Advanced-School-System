import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../../constants"

export const AssignmentEnteriesSlice = createSlice({
    name: "AssignmentEnteries",
    initialState : {
        assignmentEnteries: {
            assignmentEnteries: [],

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
        createAssignmentEntryRequest: state => {
            state.assignmentEnteries.create = statuses.pending
            state.assignmentEnteries.createError = ""
        },
        createAssignmentEntrySuccess: (state, action) => {
            state.assignmentEnteries.create = statuses.idle
            state.assignmentEnteries.assignmentEnteries.push(action.payload.entries)
        },
        createAssignmentEntryFailiure: (state, action) => {
            state.assignmentEnteries.create = statuses.idle
            state.assignmentEnteries.createError = action.payload
        },
        readAssignmentEnteriesRequest: state => {
            state.assignmentEnteries.read = statuses.pending
            state.assignmentEnteries.readError = ""
        },
        readAssignmentEnteriesSuccess: (state, action) => {
            state.assignmentEnteries.read = statuses.idle
            state.assignmentEnteries.assignmentEnteries = action.payload.assignmentEnteries
        },
        readAssignmentEnteriesFailiure: (state, action) => {
            state.assignmentEnteries.read = statuses.idle
            state.assignmentEnteries.readError = action.payload
        },
        updateAssignmentEntryRequest: state => {
            state.assignmentEnteries.update = statuses.pending
            state.assignmentEnteries.updateError = ""
        },
        updateAssignmentEntrySuccess: (state, action) => {
            state.assignmentEnteries.update = statuses.idle
            state.assignmentEnteries.assignmentEnteries = state.assignmentEnteries.assignmentEnteries.filter(assignmentAssignmentEntry => parseInt(assignmentAssignmentEntry._id) !== parseInt(action.payload.entry._id))
            state.assignmentEnteries.assignmentEnteries.push(action.payload.assignmentAssignmentEntry)
        },
        updateAssignmentEntryFailiure: (state, action) => {
            state.assignmentEnteries.update = statuses.idle
            state.assignmentEnteries.updateError = action.payload
        },
        deleteAssignmentEntryRequest: state => {
            state.assignmentEnteries.delete = statuses.pending
            state.assignmentEnteries.deleteError = ""
        },
        deleteAssignmentEntrySuccess: (state, action) => {
            state.assignmentEnteries.delete = statuses.idle
            state.assignmentEnteries.assignmentEnteries = state.assignmentEnteries.assignmentEnteries.filter(assignmentAssignmentEntry => parseInt(assignmentAssignmentEntry._id) !== parseInt(action.payload.id))
        },
        deleteAssignmentEntryFailiure: (state, action) => {
            state.assignmentEnteries.delete = statuses.idle
            state.assignmentEnteries.deleteError = action.payload
        },
    }
})

export const {
    createAssignmentEntryRequest,
    createAssignmentEntrySuccess,
    createAssignmentEntryFailiure,
    readAssignmentEnteriesRequest,
    readAssignmentEnteriesSuccess,
    readAssignmentEnteriesFailiure,
    updateAssignmentEntryRequest,
    updateAssignmentEntrySuccess,
    updateAssignmentEntryFailiure,
    deleteAssignmentEntryRequest,
    deleteAssignmentEntrySuccess,
    deleteAssignmentEntryFailiure
} = AssignmentEnteriesSlice.actions

export default AssignmentEnteriesSlice.reducer