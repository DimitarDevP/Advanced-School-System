import {
    createEnrollmentRequest,
    createEnrollmentSuccess,
    createEnrollmentFailiure,
    readEnrollmentsRequest,
    readEnrollmentsSuccess,
    readEnrollmentsFailiure,
    updateEnrollmentRequest,
    updateEnrollmentSuccess,
    updateEnrollmentFailiure,
    deleteEnrollmentRequest,
    deleteEnrollmentSuccess,
    deleteEnrollmentFailiure
} from "./EnrollmentsSlice"
import Axios from "axios"
import { API_URL } from "../../../constants"


export const createEnrollment = enrollment => (dispatch, getState) => {
    dispatch(createEnrollmentRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        enrollment
    }

    Axios.post(API_URL+"/api/class/enrollments", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createEnrollmentSuccess(res)))
    .catch(error => dispatch(createEnrollmentFailiure(error)))
}

export const readEnrollments = () => (dispatch, getState) => {
    dispatch(readEnrollmentsRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/class/enrollments", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readEnrollmentsSuccess(res)))
    .catch(error => dispatch(readEnrollmentsFailiure(error)))
}

export const updateEnrollment = (enrollment) => (dispatch, getState) => {
    dispatch(updateEnrollmentRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        enrollment
    }

    Axios.put(API_URL+"/api/class/enrollments", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateEnrollmentSuccess(res)))
    .catch(error => dispatch(updateEnrollmentFailiure(error)))
}

export const deleteEnrollment = (enrollment) => (dispatch, getState) => {
    dispatch(deleteEnrollmentRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        enrollment
    }

    Axios.delete(API_URL+"/api/class/enrollments?_id="+enrollment._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteEnrollmentSuccess(res)))
    .catch(error => dispatch(deleteEnrollmentFailiure(error)))
}