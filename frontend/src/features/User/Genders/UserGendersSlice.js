import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../../constants"

export const userGendersSlice = createSlice({
    name: "userGenders",
    initialState : {
        genders: {
            genders: [],

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
        createGenderRequest: state => {
            state.genders.create = statuses.pending
            state.genders.createError = ""
        },
        createGenderSuccess: (state, action) => {
            state.genders.create = statuses.idle
            state.genders.genders.push(action.payload.gender)
        },
        createGenderFailiure: (state, action) => {
            state.genders.create = statuses.idle
            state.genders.createError = action.payload
        },
        readGendersRequest: state => {
            state.genders.read = statuses.pending
            state.genders.readError = ""
        },
        readGendersSuccess: (state, action) => {
            state.genders.read = statuses.idle
            state.genders.genders = action.payload.genders
        },
        readGendersFailiure: (state, action) => {
            state.genders.read = statuses.idle
            state.genders.readError = action.payload
        },
        updateGenderRequest: state => {
            state.genders.update = statuses.pending
            state.genders.updateError = ""
        },
        updateGenderSuccess: (state, action) => {
            state.genders.update = statuses.idle
            state.genders.genders = state.genders.genders.filter(gender => parseInt(gender._id) !== parseInt(action.payload.gender._id))
            state.genders.genders.push(action.payload.gender)
        },
        updateGenderFailiure: (state, action) => {
            state.genders.update = statuses.idle
            state.genders.updateError = action.payload
        },
        deleteGenderRequest: state => {
            state.genders.delete = statuses.pending
            state.genders.deleteError = ""
        },
        deleteGenderSuccess: (state, action) => {
            state.genders.delete = statuses.idle
            state.genders.genders = state.genders.genders.filter(gender => parseInt(gender._id) !== parseInt(action.payload.id))
        },
        deleteGenderFailiure: (state, action) => {
            state.genders.delete = statuses.idle
            state.genders.deleteError = action.payload
        },
    }
})

export const {
    createGenderRequest,
    createGenderSuccess,
    createGenderFailiure,
    readGendersRequest,
    readGendersSuccess,
    readGendersFailiure,
    updateGenderRequest,
    updateGenderSuccess,
    updateGenderFailiure,
    deleteGenderRequest,
    deleteGenderSuccess,
    deleteGenderFailiure
} = userGendersSlice.actions

export default userGendersSlice.reducer