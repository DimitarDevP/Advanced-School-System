import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../constants"

export const ClassesSlice = createSlice({
    name: "Classes",
    initialState : {
        classes: {
            classes: [],

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
        createClassRequest: state => {
            state.classes.create = statuses.pending
            state.classes.createError = ""
        },
        createClassSuccess: (state, action) => {
            state.classes.create = statuses.idle
            state.classes.classes.push(action.payload.class)
        },
        createClassFailiure: (state, action) => {
            state.classes.create = statuses.idle
            state.classes.createError = action.payload
        },
        readClassesRequest: state => {
            state.classes.read = statuses.pending
            state.classes.readError = ""
        },
        readClassesSuccess: (state, action) => {
            state.classes.read = statuses.idle
            state.classes.classes = action.payload.classes
        },
        readClassesFailiure: (state, action) => {
            state.classes.read = statuses.idle
            state.classes.readError = action.payload
        },
        updateClassRequest: state => {
            state.classes.update = statuses.pending
            state.classes.updateError = ""
        },
        updateClassSuccess: (state, action) => {
            state.classes.update = statuses.idle
            state.classes.classes = state.classes.classes.filter(c => parseInt(c._id) !== parseInt(action.payload.class._id))
            state.classes.classes.push(action.payload.class)
        },
        updateClassFailiure: (state, action) => {
            state.classes.update = statuses.idle
            state.classes.updateError = action.payload
        },
        deleteClassRequest: state => {
            state.classes.delete = statuses.pending
            state.classes.deleteError = ""
        },
        deleteClassSuccess: (state, action) => {
            state.classes.delete = statuses.idle
            state.classes.classes = state.classes.classes.filter(c => parseInt(c._id) !== parseInt(action.payload.id))
        },
        deleteClassFailiure: (state, action) => {
            state.classes.delete = statuses.idle
            state.classes.deleteError = action.payload
        },
    }
})

export const {
    createClassRequest,
    createClassSuccess,
    createClassFailiure,
    readClassesRequest,
    readClassesSuccess,
    readClassesFailiure,
    updateClassRequest,
    updateClassSuccess,
    updateClassFailiure,
    deleteClassRequest,
    deleteClassSuccess,
    deleteClassFailiure
} = ClassesSlice.actions

export default ClassesSlice.reducer