import {
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
} from "./UserImagesSlice"
import Axios from "axios"
import { API_URL } from "../../../constants"


export const createImage = (image) => (dispatch, getState) => {
    dispatch(createImageRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'multipart/form-data',
            Authorization: getState().user.current.token
        },
        image
    }

    Axios.post(API_URL+"/api/user/images", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createImageSuccess(res)))
    .catch(error => dispatch(createImageFailiure(error)))
}

export const readImages = () => (dispatch, getState) => {
    dispatch(readImagesRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/user/images", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readImagesSuccess(res)))
    .catch(error => dispatch(readImagesFailiure(error)))
}

export const updateImage = (image) => (dispatch, getState) => {
    dispatch(updateImageRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        image
    }

    Axios.put(API_URL+"/api/user/images", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateImageSuccess(res)))
    .catch(error => dispatch(updateImageFailiure(error)))
}

export const deleteImage = (image) => (dispatch, getState) => {
    dispatch(deleteImageRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        image
    }

    Axios.delete(API_URL+"/api/user/images?_id="+image._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteImageSuccess(res)))
    .catch(error => dispatch(deleteImageFailiure(error)))
}