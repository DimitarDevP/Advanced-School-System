import {
    createSubjectRequest,
    createSubjectSuccess,
    createSubjectFailiure,
    readSubjectsRequest,
    readSubjectsSuccess,
    readSubjectsFailiure,
    updateSubjectRequest,
    updateSubjectSuccess,
    updateSubjectFailiure,
    deleteSubjectRequest,
    deleteSubjectSuccess,
    deleteSubjectFailiure
} from "./SubjectsSlice"
import Axios from "axios"
import { API_URL } from "../../constants"


export const createSubject = subject => (dispatch, getState) => {
    dispatch(createSubjectRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        subject
    }

    Axios.post(API_URL+"/api/subject/subjects", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createSubjectSuccess(res)))
    .catch(error => dispatch(createSubjectFailiure(error)))
}

export const readSubjects = () => (dispatch, getState) => {
    dispatch(readSubjectsRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/subject/subjects", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readSubjectsSuccess(res)))
    .catch(error => dispatch(readSubjectsFailiure(error)))
}

export const updateSubject = (subject) => (dispatch, getState) => {
    dispatch(updateSubjectRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        subject
    }

    Axios.put(API_URL+"/api/subject/subjects", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateSubjectSuccess(res)))
    .catch(error => dispatch(updateSubjectFailiure(error)))
}

export const deleteSubject = (subject) => (dispatch, getState) => {
    dispatch(deleteSubjectRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        subject
    }

    Axios.delete(API_URL+"/api/subject/subjects?_id="+subject._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteSubjectSuccess(res)))
    .catch(error => dispatch(deleteSubjectFailiure(error)))
}