import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../../constants"

export const StatusesSlice = createSlice({
    name: "Statuses",
    initialState : {
        statuses: {
            statuses: [],

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
        createStatusRequest: state => {
            state.statuses.create = statuses.pending
            state.statuses.createError = ""
        },
        createStatusSuccess: (state, action) => {
            state.statuses.create = statuses.idle
            state.statuses.statuses.push(action.payload.status)
        },
        createStatusFailiure: (state, action) => {
            state.statuses.create = statuses.idle
            state.statuses.createError = action.payload
        },
        readStatusesRequest: state => {
            state.statuses.read = statuses.pending
            state.statuses.readError = ""
        },
        readStatusesSuccess: (state, action) => {
            state.statuses.read = statuses.idle
            state.statuses.statuses = action.payload.statuses
        },
        readStatusesFailiure: (state, action) => {
            state.statuses.read = statuses.idle
            state.statuses.readError = action.payload
        },
        updateStatusRequest: state => {
            state.statuses.update = statuses.pending
            state.statuses.updateError = ""
        },
        updateStatusSuccess: (state, action) => {
            state.statuses.update = statuses.idle
            state.statuses.statuses = state.statuses.statuses.filter(status => parseInt(status._id) !== parseInt(action.payload.status._id))
            state.statuses.statuses.push(action.payload.status)
        },
        updateStatusFailiure: (state, action) => {
            state.statuses.update = statuses.idle
            state.statuses.updateError = action.payload
        },
        deleteStatusRequest: state => {
            state.statuses.delete = statuses.pending
            state.statuses.deleteError = ""
        },
        deleteStatusSuccess: (state, action) => {
            state.statuses.delete = statuses.idle
            state.statuses.statuses = state.statuses.statuses.filter(status => parseInt(status._id) !== parseInt(action.payload.id))
        },
        deleteStatusFailiure: (state, action) => {
            state.statuses.delete = statuses.idle
            state.statuses.deleteError = action.payload
        },
    }
})

export const {
    createStatusRequest,
    createStatusSuccess,
    createStatusFailiure,
    readStatusesRequest,
    readStatusesSuccess,
    readStatusesFailiure,
    updateStatusRequest,
    updateStatusSuccess,
    updateStatusFailiure,
    deleteStatusRequest,
    deleteStatusSuccess,
    deleteStatusFailiure
} = StatusesSlice.actions

export default StatusesSlice.reducer