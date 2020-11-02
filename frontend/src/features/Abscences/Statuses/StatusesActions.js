import {
    createStatusRequest,
    createStatusSuccess,
    createStatusFailiure,
    readStatusesRequest,
    readStatusesSuccess,
    readStatusesFailiure,
    updateStatusRequest,
    updateStatusSuccess,
    updateStatusFailiure,
    deleteStatusRequest,
    deleteStatusSuccess,
    deleteStatusFailiure
} from "./StatusesSlice"
import Axios from "axios"
import { API_URL } from "../../../constants"


export const createStatus = status => (dispatch, getState) => {
    dispatch(createStatusRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        status
    }

    Axios.post(API_URL+"/api/abscence/statuses", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createStatusSuccess(res)))
    .catch(error => dispatch(createStatusFailiure(error)))
}

export const readStatuses = () => (dispatch, getState) => {
    dispatch(readStatusesRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/abscence/statuses", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readStatusesSuccess(res)))
    .catch(error => dispatch(readStatusesFailiure(error)))
}

export const updateStatus = (status) => (dispatch, getState) => {
    dispatch(updateStatusRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        status
    }

    Axios.put(API_URL+"/api/abscence/statuses", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateStatusSuccess(res)))
    .catch(error => dispatch(updateStatusFailiure(error)))
}

export const deleteStatus = (status) => (dispatch, getState) => {
    dispatch(deleteStatusRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        status
    }

    Axios.delete(API_URL+"/api/abscence/statuses?_id="+status._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteStatusSuccess(res)))
    .catch(error => dispatch(deleteStatusFailiure(error)))
}