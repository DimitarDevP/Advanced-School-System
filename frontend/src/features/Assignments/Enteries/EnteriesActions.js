import {
    createAssignmentEntryRequest,
    createAssignmentEntrySuccess,
    createAssignmentEntryFailiure,
    readAssignmentEnteriesRequest,
    readAssignmentEnteriesSuccess,
    readAssignmentEnteriesFailiure,
    updateAssignmentEntryRequest,
    updateAssignmentEntrySuccess,
    updateAssignmentEntryFailiure,
    deleteAssignmentEntryRequest,
    deleteAssignmentEntrySuccess,
    deleteAssignmentEntryFailiure
} from "./AssignmentEnteriesSlice"
import Axios from "axios"
import { API_URL } from "../../../constants"


export const createAssignmentEntry = entry => (dispatch, getState) => {
    dispatch(createAssignmentEntryRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        entry
    }

    Axios.post(API_URL+"/api/assignment/enteries", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createAssignmentEntrySuccess(res)))
    .catch(error => dispatch(createAssignmentEntryFailiure(error)))
}

export const readAssignmentEnteries = () => (dispatch, getState) => {
    dispatch(readAssignmentEnteriesRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/assignment/enteries", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readAssignmentEnteriesSuccess(res)))
    .catch(error => dispatch(readAssignmentEnteriesFailiure(error)))
}

export const updateAssignmentEntry = (entry) => (dispatch, getState) => {
    dispatch(updateAssignmentEntryRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        entry
    }

    Axios.put(API_URL+"/api/assignment/enteries", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateAssignmentEntrySuccess(res)))
    .catch(error => dispatch(updateAssignmentEntryFailiure(error)))
}

export const deleteAssignmentEntry = (entry) => (dispatch, getState) => {
    dispatch(deleteAssignmentEntryRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        entry
    }

    Axios.delete(API_URL+"/api/assignment/enteries?_id="+entry._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteAssignmentEntrySuccess(res)))
    .catch(error => dispatch(deleteAssignmentEntryFailiure(error)))
}