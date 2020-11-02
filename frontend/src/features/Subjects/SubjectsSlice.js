import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../constants"

export const SubjectsSlice = createSlice({
    name: "Subjects",
    initialState : {
        subjects: {
            subjects: [],

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
        createSubjectRequest: state => {
            state.subjects.create = statuses.pending
            state.subjects.createError = ""
        },
        createSubjectSuccess: (state, action) => {
            state.subjects.create = statuses.idle
            state.subjects.subjects.push(action.payload.subject)
        },
        createSubjectFailiure: (state, action) => {
            state.subjects.create = statuses.idle
            state.subjects.createError = action.payload
        },
        readSubjectsRequest: state => {
            state.subjects.read = statuses.pending
            state.subjects.readError = ""
        },
        readSubjectsSuccess: (state, action) => {
            state.subjects.read = statuses.idle
            state.subjects.subjects = action.payload.subjects
        },
        readSubjectsFailiure: (state, action) => {
            state.subjects.read = statuses.idle
            state.subjects.readError = action.payload
        },
        updateSubjectRequest: state => {
            state.subjects.update = statuses.pending
            state.subjects.updateError = ""
        },
        updateSubjectSuccess: (state, action) => {
            state.subjects.update = statuses.idle
            state.subjects.subjects = state.subjects.subjects.filter(subject => parseInt(subject._id) !== parseInt(action.payload.subject._id))
            state.subjects.subjects.push(action.payload.subject)
        },
        updateSubjectFailiure: (state, action) => {
            state.subjects.update = statuses.idle
            state.subjects.updateError = action.payload
        },
        deleteSubjectRequest: state => {
            state.subjects.delete = statuses.pending
            state.subjects.deleteError = ""
        },
        deleteSubjectSuccess: (state, action) => {
            state.subjects.delete = statuses.idle
            state.subjects.subjects = state.subjects.subjects.filter(subject => parseInt(subject._id) !== parseInt(action.payload.id))
        },
        deleteSubjectFailiure: (state, action) => {
            state.subjects.delete = statuses.idle
            state.subjects.deleteError = action.payload
        },
    }
})

export const {
    createSubjectRequest,
    createSubjectSuccess,
    createSubjectFailiure,
    readSubjectsRequest,
    readSubjectsSuccess,
    readSubjectsFailiure,
    updateSubjectRequest,
    updateSubjectSuccess,
    updateSubjectFailiure,
    deleteSubjectRequest,
    deleteSubjectSuccess,
    deleteSubjectFailiure
} = SubjectsSlice.actions

export default SubjectsSlice.reducer