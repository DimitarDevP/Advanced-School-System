import {
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
} from "./UserTypesSlice"
import Axios from "axios"
import { API_URL } from "../../../constants"


export const createType = type => (dispatch, getState) => {
    dispatch(createTypeRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        type
    }

    Axios.post(API_URL+"/api/user/types", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createTypeSuccess(res)))
    .catch(error => dispatch(createTypeFailiure(error)))
}

export const readTypes = (token) => (dispatch, getState) => {
    dispatch(readTypesRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/user/types", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readTypesSuccess(res)))
    .catch(error => dispatch(readTypesFailiure(error)))
}

export const updateType = (type) => (dispatch, getState) => {
    dispatch(updateTypeRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        type
    }

    Axios.put(API_URL+"/api/user/types", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateTypeSuccess(res)))
    .catch(error => dispatch(updateTypeFailiure(error)))
}

export const deleteType = (type) => (dispatch, getState) => {
    dispatch(deleteTypeRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        type
    }

    Axios.delete(API_URL+"/api/user/types?_id="+type._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteTypeSuccess(res)))
    .catch(error => dispatch(deleteTypeFailiure(error)))
}