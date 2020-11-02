import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../../constants"

export const EnrollmentsSlice = createSlice({
    name: "Enrollments",
    initialState : {
        enrollments: {
            enrollments: [],

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
        createEnrollmentRequest: state => {
            state.enrollments.create = statuses.pending
            state.enrollments.createError = ""
        },
        createEnrollmentSuccess: (state, action) => {
            state.enrollments.create = statuses.idle
            state.enrollments.enrollments.push(action.payload.enrollment)
        },
        createEnrollmentFailiure: (state, action) => {
            state.enrollments.create = statuses.idle
            state.enrollments.createError = action.payload
        },
        readEnrollmentsRequest: state => {
            state.enrollments.read = statuses.pending
            state.enrollments.readError = ""
        },
        readEnrollmentsSuccess: (state, action) => {
            state.enrollments.read = statuses.idle
            state.enrollments.enrollments = action.payload.enrollments
        },
        readEnrollmentsFailiure: (state, action) => {
            state.enrollments.read = statuses.idle
            state.enrollments.readError = action.payload
        },
        updateEnrollmentRequest: state => {
            state.enrollments.update = statuses.pending
            state.enrollments.updateError = ""
        },
        updateEnrollmentSuccess: (state, action) => {
            state.enrollments.update = statuses.idle
            state.enrollments.enrollments = state.enrollments.enrollments.filter(enrollment => parseInt(enrollment._id) !== parseInt(action.payload.enrollment._id))
            state.enrollments.enrollments.push(action.payload.enrollment)
        },
        updateEnrollmentFailiure: (state, action) => {
            state.enrollments.update = statuses.idle
            state.enrollments.updateError = action.payload
        },
        deleteEnrollmentRequest: state => {
            state.enrollments.delete = statuses.pending
            state.enrollments.deleteError = ""
        },
        deleteEnrollmentSuccess: (state, action) => {
            state.enrollments.delete = statuses.idle
            state.enrollments.enrollments = state.enrollments.enrollments.filter(enrollment => parseInt(enrollment._id) !== parseInt(action.payload.id))
        },
        deleteEnrollmentFailiure: (state, action) => {
            state.enrollments.delete = statuses.idle
            state.enrollments.deleteError = action.payload
        },
    }
})

export const {
    createEnrollmentRequest,
    createEnrollmentSuccess,
    createEnrollmentFailiure,
    readEnrollmentsRequest,
    readEnrollmentsSuccess,
    readEnrollmentsFailiure,
    updateEnrollmentRequest,
    updateEnrollmentSuccess,
    updateEnrollmentFailiure,
    deleteEnrollmentRequest,
    deleteEnrollmentSuccess,
    deleteEnrollmentFailiure
} = EnrollmentsSlice.actions

export default EnrollmentsSlice.reducer