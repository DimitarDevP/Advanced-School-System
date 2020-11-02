import {
    loginRequest,
    loginSuccess,
    loginFailiure,
    createUserRequest,
    createUserSuccess,
    createUserFailiure,
    readUsersRequest,
    readUsersSuccess,
    readUsersFailiure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailiure,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFailiure
} from "./UserSlice"
import Axios from "axios"
import { API_URL } from "../../constants"

export const login = user => (dispatch, getState) => {
    dispatch(loginRequest())
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        user
    }

    Axios.post(API_URL+"/api/user/login", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(loginSuccess(res)))
    .catch(error => dispatch(loginFailiure(error)))
}

export const createUser = user => (dispatch, getState) => {
    dispatch(createUserRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        user
    }

    Axios.post(API_URL+"/api/user/users", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createUserSuccess(res)))
    .catch(error => dispatch(createUserFailiure(error)))
}

export const readUsers = () => (dispatch, getState) => {
    dispatch(readUsersRequest())
    console.log(getState())
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: "Bearer " + getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/user/users", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readUsersSuccess(res)))
    .catch(error => dispatch(readUsersFailiure(error)))
}

export const updateUser = user => (dispatch, getState) => {
    dispatch(updateUserRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        user
    }

    Axios.put(API_URL+"/api/user/users", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateUserSuccess(res)))
    .catch(error => dispatch(updateUserFailiure(error)))
}

export const deleteUser = user => (dispatch, getState) => {
    dispatch(deleteUserRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        user
    }

    Axios.delete(API_URL+"/api/user/users?_id="+user._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteUserSuccess(res)))
    .catch(error => dispatch(deleteUserFailiure(error)))
}