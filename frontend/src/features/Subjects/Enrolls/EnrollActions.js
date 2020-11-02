import {
    createEnrollRequest,
    createEnrollSuccess,
    createEnrollFailiure,
    readEnrollsRequest,
    readEnrollsSuccess,
    readEnrollsFailiure,
    updateEnrollRequest,
    updateEnrollSuccess,
    updateEnrollFailiure,
    deleteEnrollRequest,
    deleteEnrollSuccess,
    deleteEnrollFailiure
} from "./EnrollsSlice"
import Axios from "axios"
import { API_URL } from "../../../constants"


export const createEnroll = enroll => (dispatch, getState) => {
    dispatch(createEnrollRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        enroll
    }

    Axios.post(API_URL+"/api/subject/enrolls", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createEnrollSuccess(res)))
    .catch(error => dispatch(createEnrollFailiure(error)))
}

export const readEnrolls = () => (dispatch, getState) => {
    dispatch(readEnrollsRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/subject/enrolls", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readEnrollsSuccess(res)))
    .catch(error => dispatch(readEnrollsFailiure(error)))
}

export const updateEnroll = (enroll) => (dispatch, getState) => {
    dispatch(updateEnrollRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        enroll
    }

    Axios.put(API_URL+"/api/subject/enrolls", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateEnrollSuccess(res)))
    .catch(error => dispatch(updateEnrollFailiure(error)))
}

export const deleteEnroll = (enroll) => (dispatch, getState) => {
    dispatch(deleteEnrollRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        enroll
    }

    Axios.delete(API_URL+"/api/subject/enrolls?_id="+enroll._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteEnrollSuccess(res)))
    .catch(error => dispatch(deleteEnrollFailiure(error)))
}