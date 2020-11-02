import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../constants"

export const AbscencesSlice = createSlice({
    name: "Abscences",
    initialState : {
        abscences: {
            abscences: [],

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
        createAbscenceRequest: state => {
            state.abscences.create = statuses.pending
            state.abscences.createError = ""
        },
        createAbscenceSuccess: (state, action) => {
            state.abscences.create = statuses.idle
            state.abscences.abscences.push(action.payload.abscence)
        },
        createAbscenceFailiure: (state, action) => {
            state.abscences.create = statuses.idle
            state.abscences.createError = action.payload
        },
        readAbscencesRequest: state => {
            state.abscences.read = statuses.pending
            state.abscences.readError = ""
        },
        readAbscencesSuccess: (state, action) => {
            state.abscences.read = statuses.idle
            state.abscences.abscences = action.payload.abscences
        },
        readAbscencesFailiure: (state, action) => {
            state.abscences.read = statuses.idle
            state.abscences.readError = action.payload
        },
        updateAbscenceRequest: state => {
            state.abscences.update = statuses.pending
            state.abscences.updateError = ""
        },
        updateAbscenceSuccess: (state, action) => {
            state.abscences.update = statuses.idle
            state.abscences.abscences = state.abscences.abscences.filter(abscence => parseInt(abscence._id) !== parseInt(action.payload.abscence._id))
            state.abscences.abscences.push(action.payload.abscence)
        },
        updateAbscenceFailiure: (state, action) => {
            state.abscences.update = statuses.idle
            state.abscences.updateError = action.payload
        },
        deleteAbscenceRequest: state => {
            state.abscences.delete = statuses.pending
            state.abscences.deleteError = ""
        },
        deleteAbscenceSuccess: (state, action) => {
            state.abscences.delete = statuses.idle
            state.abscences.abscences = state.abscences.abscences.filter(abscence => parseInt(abscence._id) !== parseInt(action.payload.id))
        },
        deleteAbscenceFailiure: (state, action) => {
            state.abscences.delete = statuses.idle
            state.abscences.deleteError = action.payload
        },
    }
})

export const {
    createAbscenceRequest,
    createAbscenceSuccess,
    createAbscenceFailiure,
    readAbscencesRequest,
    readAbscencesSuccess,
    readAbscencesFailiure,
    updateAbscenceRequest,
    updateAbscenceSuccess,
    updateAbscenceFailiure,
    deleteAbscenceRequest,
    deleteAbscenceSuccess,
    deleteAbscenceFailiure
} = AbscencesSlice.actions

export default AbscencesSlice.reducer