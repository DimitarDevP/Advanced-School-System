import {SIGNED_IN, LOGIN, LOGOUT, REGISTER, UPDATE_IMAGE } from '../constants'

import Axios from 'axios'

export const login = (user) => {
    return (dispatch, getState) => {
        Axios.post("http://localhost:5000/api/user/login", user)
        .then(response => {
            dispatch({type: "LOGIN", payload: response.data})
        })
    }
}

export const register = (user) => {
    return (dispatch, getState) => {
        Axios.post("http://localhost:5000/api/user/register", user)
        .then(response => {
            dispatch({type: "LOGIN", payload: response.data})
        })
    }
}

export const logout = (auth_key) => {
    return (dispatch, getState) => {
        Axios.post('http://localhost:5000/api/user/logout', {auth_key: auth_key})
        .then(response => {
            dispatch({type: "LOGOUT"})
        })
    }
}

export const updateImage = (fd) => {
    return (dispatch) => {
        Axios.post("http://localhost:5000/api/user/update_image", fd)
        .then(response => {
            dispatch({type: "UPDATE_IMAGE", payload: response.data})
        })
    }
}