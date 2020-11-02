import {
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
} from "./EnteriesSlice"
import Axios from "axios"
import { API_URL } from "../../../constants"


export const createEntry = entry => (dispatch, getState) => {
    dispatch(createEntryRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        entry
    }

    Axios.post(API_URL+"/api/subject/enteries", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createEntrySuccess(res)))
    .catch(error => dispatch(createEntryFailiure(error)))
}

export const readEnteries = () => (dispatch, getState) => {
    dispatch(readEnteriesRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/subject/enteries", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readEnteriesSuccess(res)))
    .catch(error => dispatch(readEnteriesFailiure(error)))
}

export const updateEntry = (entry) => (dispatch, getState) => {
    dispatch(updateEntryRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        entry
    }

    Axios.put(API_URL+"/api/subject/enteries", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateEntrySuccess(res)))
    .catch(error => dispatch(updateEntryFailiure(error)))
}

export const deleteEntry = (entry) => (dispatch, getState) => {
    dispatch(deleteEntryRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        entry
    }

    Axios.delete(API_URL+"/api/subject/enteries?_id="+entry._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteEntrySuccess(res)))
    .catch(error => dispatch(deleteEntryFailiure(error)))
}