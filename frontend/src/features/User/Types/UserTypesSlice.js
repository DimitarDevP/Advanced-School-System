import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../../constants"

export const userTypesSlice = createSlice({
    name: "userTypes",
    initialState : {
        types: {
            types: [],

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
        createTypeRequest: state => {
            state.types.create = statuses.pending
            state.types.createError = ""
        },
        createTypeSuccess: (state, action) => {
            state.types.create = statuses.idle
            state.types.types.push(action.payload.type)
        },
        createTypeFailiure: (state, action) => {
            state.types.create = statuses.idle
            state.types.createError = action.payload
        },
        readTypesRequest: state => {
            state.types.read = statuses.pending
            state.types.readError = ""
        },
        readTypesSuccess: (state, action) => {
            state.types.read = statuses.idle
            state.types.types = action.payload.types
        },
        readTypesFailiure: (state, action) => {
            state.types.read = statuses.idle
            state.types.readError = action.payload
        },
        updateTypeRequest: state => {
            state.types.update = statuses.pending
            state.types.updateError = ""
        },
        updateTypeSuccess: (state, action) => {
            state.types.update = statuses.idle
            state.types.types = state.types.types.filter(type => parseInt(type._id) !== parseInt(action.payload.type._id))
            state.types.types.push(action.payload.type)
        },
        updateTypeFailiure: (state, action) => {
            state.types.update = statuses.idle
            state.types.updateError = action.payload
        },
        deleteTypeRequest: state => {
            state.types.delete = statuses.pending
            state.types.deleteError = ""
        },
        deleteTypeSuccess: (state, action) => {
            state.types.delete = statuses.idle
            state.types.types = state.types.types.filter(type => parseInt(type._id) !== parseInt(action.payload.id))
        },
        deleteTypeFailiure: (state, action) => {
            state.types.delete = statuses.idle
            state.types.deleteError = action.payload
        },
    }
})

export const {
    createTypeRequest,
    createTypeSuccess,
    createTypeFailiure,
    readTypesRequest,
    readTypesSuccess,
    readTypesFailiure,
    updateTypeRequest,
    updateTypeSuccess,
    updateTypeFailiure,
    deleteTypeRequest,
    deleteTypeSuccess,
    deleteTypeFailiure
} = userTypesSlice.actions

export default userTypesSlice.reducer