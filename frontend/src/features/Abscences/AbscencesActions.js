import {
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
} from "./AbscencesSlice"
import Axios from "axios"
import { API_URL } from "../../constants"


export const createAbscence = abscence => (dispatch, getState) => {
    dispatch(createAbscenceRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        abscence
    }

    Axios.post(API_URL+"/api/abscence/abscences", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createAbscenceSuccess(res)))
    .catch(error => dispatch(createAbscenceFailiure(error)))
}

export const readAbscences = () => (dispatch, getState) => {
    dispatch(readAbscencesRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/abscence/abscences", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readAbscencesSuccess(res)))
    .catch(error => dispatch(readAbscencesFailiure(error)))
}

export const updateAbscence = (abscence) => (dispatch, getState) => {
    dispatch(updateAbscenceRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        abscence
    }

    Axios.put(API_URL+"/api/abscence/abscences", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateAbscenceSuccess(res)))
    .catch(error => dispatch(updateAbscenceFailiure(error)))
}

export const deleteAbscence = (abscence) => (dispatch, getState) => {
    dispatch(deleteAbscenceRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        abscence
    }

    Axios.delete(API_URL+"/api/abscence/abscences?_id="+abscence._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteAbscenceSuccess(res)))
    .catch(error => dispatch(deleteAbscenceFailiure(error)))
}