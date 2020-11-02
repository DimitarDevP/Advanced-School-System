import {
    createGenderRequest,
    createGenderSuccess,
    createGenderFailiure,
    readGendersRequest,
    readGendersSuccess,
    readGendersFailiure,
    updateGenderRequest,
    updateGenderSuccess,
    updateGenderFailiure,
    deleteGenderRequest,
    deleteGenderSuccess,
    deleteGenderFailiure
} from "./UserGendersSlice"
import Axios from "axios"
import { API_URL } from "../../../constants"


export const createGender = gender => (dispatch, getState) => {
    dispatch(createGenderRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        gender
    }

    Axios.post(API_URL+"/api/user/genders", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createGenderSuccess(res)))
    .catch(error => dispatch(createGenderFailiure(error)))
}

export const readGenders = () => (dispatch, getState) => {
    dispatch(readGendersRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/user/genders", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readGendersSuccess(res)))
    .catch(error => dispatch(readGendersFailiure(error)))
}

export const updateGender = (gender) => (dispatch, getState) => {
    dispatch(updateGenderRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        gender
    }

    Axios.put(API_URL+"/api/user/genders", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateGenderSuccess(res)))
    .catch(error => dispatch(updateGenderFailiure(error)))
}

export const deleteGender = (gender) => (dispatch, getState) => {
    dispatch(deleteGenderRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        gender
    }

    Axios.delete(API_URL+"/api/user/genders?_id="+gender._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteGenderSuccess(res)))
    .catch(error => dispatch(deleteGenderFailiure(error)))
}