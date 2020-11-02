import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../../constants"

export const userImagesSlice = createSlice({
    name: "userImages",
    initialState : {
        images: {
            images: [],

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
        createImageRequest: state => {
            state.images.create = statuses.pending
            state.images.createError = ""
        },
        createImageSuccess: (state, action) => {
            state.images.create = statuses.idle
            state.images.images.push(action.payload.image)
        },
        createImageFailiure: (state, action) => {
            state.images.create = statuses.idle
            state.images.createError = action.payload
        },

        readImagesRequest: state => {
            state.images.read = statuses.pending
            state.images.readError = ""
        },
        readImagesSuccess: (state, action) => {
            state.images.read = statuses.idle
            state.images.images = action.payload.images
        },
        readImagesFailiure: (state, action) => {
            state.images.read = statuses.idle
            state.images.readError = action.payload
        },
        updateImageRequest: state => {
            state.images.update = statuses.pending
            state.images.updateError = ""
        },
        updateImageSuccess: (state, action) => {
            state.images.update = statuses.idle
            state.images.images = state.images.images.filter(image => parseInt(image._id) !== parseInt(action.payload.image._id))
            state.images.images.push(action.payload.image)
        },
        updateImageFailiure: (state, action) => {
            state.images.update = statuses.idle
            state.images.updateError = action.payload
        },
        deleteImageRequest: state => {
            state.images.delete = statuses.pending
            state.images.deleteError = ""
        },
        deleteImageSuccess: (state, action) => {
            state.images.delete = statuses.idle
            state.images.images = state.images.images.filter(image => parseInt(image._id) !== parseInt(action.payload.id))
        },
        deleteImageFailiure: (state, action) => {
            state.images.delete = statuses.idle
            state.images.deleteError = action.payload
        },
    }
})

export const {
    createImageRequest,
    createImageSuccess,
    createImageFailiure,
    readImagesRequest,
    readImagesSuccess,
    readImagesFailiure,
    updateImageRequest,
    updateImageSuccess,
    updateImageFailiure,
    deleteImageRequest,
    deleteImageSuccess,
    deleteImageFailiure
} = userImagesSlice.actions

export default userImagesSlice.reducer