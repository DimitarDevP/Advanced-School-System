import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../../constants"

export const EnrollsSlice = createSlice({
    name: "Enrolls",
    initialState : {
        enrolls: {
            enrolls: [],

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
        createEnrollRequest: state => {
            state.enrolls.create = statuses.pending
            state.enrolls.createError = ""
        },
        createEnrollSuccess: (state, action) => {
            state.enrolls.create = statuses.idle
            state.enrolls.enrolls.push(action.payload.enroll)
        },
        createEnrollFailiure: (state, action) => {
            state.enrolls.create = statuses.idle
            state.enrolls.createError = action.payload
        },
        readEnrollsRequest: state => {
            state.enrolls.read = statuses.pending
            state.enrolls.readError = ""
        },
        readEnrollsSuccess: (state, action) => {
            state.enrolls.read = statuses.idle
            state.enrolls.enrolls = action.payload.enrolls
        },
        readEnrollsFailiure: (state, action) => {
            state.enrolls.read = statuses.idle
            state.enrolls.readError = action.payload
        },
        updateEnrollRequest: state => {
            state.enrolls.update = statuses.pending
            state.enrolls.updateError = ""
        },
        updateEnrollSuccess: (state, action) => {
            state.enrolls.update = statuses.idle
            state.enrolls.enrolls = state.enrolls.enrolls.filter(enroll => parseInt(enroll._id) !== parseInt(action.payload.enroll._id))
            state.enrolls.enrolls.push(action.payload.enroll)
        },
        updateEnrollFailiure: (state, action) => {
            state.enrolls.update = statuses.idle
            state.enrolls.updateError = action.payload
        },
        deleteEnrollRequest: state => {
            state.enrolls.delete = statuses.pending
            state.enrolls.deleteError = ""
        },
        deleteEnrollSuccess: (state, action) => {
            state.enrolls.delete = statuses.idle
            state.enrolls.enrolls = state.enrolls.enrolls.filter(enroll => parseInt(enroll._id) !== parseInt(action.payload.id))
        },
        deleteEnrollFailiure: (state, action) => {
            state.enrolls.delete = statuses.idle
            state.enrolls.deleteError = action.payload
        },
    }
})

export const {
    createEnrollRequest,
    createEnrollSuccess,
    createEnrollFailiure,
    readEnrollsRequest,
    readEnrollsSuccess,
    readEnrollsFailiure,
    updateEnrollRequest,
    updateEnrollSuccess,
    updateEnrollFailiure,
    deleteEnrollRequest,
    deleteEnrollSuccess,
    deleteEnrollFailiure
} = EnrollsSlice.actions

export default EnrollsSlice.reducer