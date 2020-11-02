import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../../constants"

export const EnteriesSlice = createSlice({
    name: "Enteries",
    initialState : {
        enteries: {
            enteries: [],

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
        createEntryRequest: state => {
            state.enteries.create = statuses.pending
            state.enteries.createError = ""
        },
        createEntrySuccess: (state, action) => {
            state.enteries.create = statuses.idle
            state.enteries.enteries.push(action.payload.entry)
        },
        createEntryFailiure: (state, action) => {
            state.enteries.create = statuses.idle
            state.enteries.createError = action.payload
        },
        readEnteriesRequest: state => {
            state.enteries.read = statuses.pending
            state.enteries.readError = ""
        },
        readEnteriesSuccess: (state, action) => {
            state.enteries.read = statuses.idle
            state.enteries.enteries = action.payload.enteries
        },
        readEnteriesFailiure: (state, action) => {
            state.enteries.read = statuses.idle
            state.enteries.readError = action.payload
        },
        updateEntryRequest: state => {
            state.enteries.update = statuses.pending
            state.enteries.updateError = ""
        },
        updateEntrySuccess: (state, action) => {
            state.enteries.update = statuses.idle
            state.enteries.enteries = state.enteries.enteries.filter(entry => parseInt(entry._id) !== parseInt(action.payload.entry._id))
            state.enteries.enteries.push(action.payload.entry)
        },
        updateEntryFailiure: (state, action) => {
            state.enteries.update = statuses.idle
            state.enteries.updateError = action.payload
        },
        deleteEntryRequest: state => {
            state.enteries.delete = statuses.pending
            state.enteries.deleteError = ""
        },
        deleteEntrySuccess: (state, action) => {
            state.enteries.delete = statuses.idle
            state.enteries.enteries = state.enteries.enteries.filter(entry => parseInt(entry._id) !== parseInt(action.payload.id))
        },
        deleteEntryFailiure: (state, action) => {
            state.enteries.delete = statuses.idle
            state.enteries.deleteError = action.payload
        },
    }
})

export const {
    createEntryRequest,
    createEntrySuccess,
    createEntryFailiure,
    readEnteriesRequest,
    readEnteriesSuccess,
    readEnteriesFailiure,
    updateEntryRequest,
    updateEntrySuccess,
    updateEntryFailiure,
    deleteEntryRequest,
    deleteEntrySuccess,
    deleteEntryFailiure
} = EnteriesSlice.actions

export default EnteriesSlice.reducer