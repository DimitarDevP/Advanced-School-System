import {
    createClassRequest,
    createClassSuccess,
    createClassFailiure,
    readClassesRequest,
    readClassesSuccess,
    readClassesFailiure,
    updateClassRequest,
    updateClassSuccess,
    updateClassFailiure,
    deleteClassRequest,
    deleteClassSuccess,
    deleteClassFailiure
} from "./ClassSlice"
import Axios from "axios"
import { API_URL } from "../../constants"


export const createClass = _class => (dispatch, getState) => {
    dispatch(createClassRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        _class
    }

    Axios.post(API_URL+"/api/class/classes", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createClassSuccess(res)))
    .catch(error => dispatch(createClassFailiure(error)))
}

export const readClasses = () => (dispatch, getState) => {
    dispatch(readClassesRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/class/classes", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readClassesSuccess(res)))
    .catch(error => dispatch(readClassesFailiure(error)))
}

export const updateClass = (_class) => (dispatch, getState) => {
    dispatch(updateClassRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        _class
    }

    Axios.put(API_URL+"/api/class/classes", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateClassSuccess(res)))
    .catch(error => dispatch(updateClassFailiure(error)))
}

export const deleteClass = (_class) => (dispatch, getState) => {
    dispatch(deleteClassRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        _class
    }

    Axios.delete(API_URL+"/api/class/classes?_id="+_class._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteClassSuccess(res)))
    .catch(error => dispatch(deleteClassFailiure(error)))
}