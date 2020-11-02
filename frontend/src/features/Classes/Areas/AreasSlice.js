import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../../constants"

export const AreasSlice = createSlice({
    name: "Areas",
    initialState : {
        areas: {
            areas: [],

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
        createAreaRequest: state => {
            state.areas.create = statuses.pending
            state.areas.createError = ""
        },
        createAreaSuccess: (state, action) => {
            state.areas.create = statuses.idle
            state.areas.areas.push(action.payload.area)
        },
        createAreaFailiure: (state, action) => {
            state.areas.create = statuses.idle
            state.areas.createError = action.payload
        },
        readAreasRequest: state => {
            state.areas.read = statuses.pending
            state.areas.readError = ""
        },
        readAreasSuccess: (state, action) => {
            state.areas.read = statuses.idle
            state.areas.areas = action.payload.areas
        },
        readAreasFailiure: (state, action) => {
            state.areas.read = statuses.idle
            state.areas.readError = action.payload
        },
        updateAreaRequest: state => {
            state.areas.update = statuses.pending
            state.areas.updateError = ""
        },
        updateAreaSuccess: (state, action) => {
            state.areas.update = statuses.idle
            state.areas.areas = state.areas.areas.filter(area => parseInt(area._id) !== parseInt(action.payload.area._id))
            state.areas.areas.push(action.payload.area)
        },
        updateAreaFailiure: (state, action) => {
            state.areas.update = statuses.idle
            state.areas.updateError = action.payload
        },
        deleteAreaRequest: state => {
            state.areas.delete = statuses.pending
            state.areas.deleteError = ""
        },
        deleteAreaSuccess: (state, action) => {
            state.areas.delete = statuses.idle
            state.areas.areas = state.areas.areas.filter(area => parseInt(area._id) !== parseInt(action.payload.id))
        },
        deleteAreaFailiure: (state, action) => {
            state.areas.delete = statuses.idle
            state.areas.deleteError = action.payload
        },
    }
})

export const {
    createAreaRequest,
    createAreaSuccess,
    createAreaFailiure,
    readAreasRequest,
    readAreasSuccess,
    readAreasFailiure,
    updateAreaRequest,
    updateAreaSuccess,
    updateAreaFailiure,
    deleteAreaRequest,
    deleteAreaSuccess,
    deleteAreaFailiure
} = AreasSlice.actions

export default AreasSlice.reducer