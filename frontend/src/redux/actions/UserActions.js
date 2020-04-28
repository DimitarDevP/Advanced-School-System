import { SIGNED_IN, LOGIN, LOGOUT, REGISTER, UPDATE_IMAGE, GET_ALL_USERS } from '../constants'

import Axios from 'axios'
// import FormData from 'form-data'

export const login = (user) => {
    return (dispatch, getState) => {
        Axios.defaults.withCredentials = true
        Axios.post("http://localhost:5000/api/user/login", user)
        .then(response => {
            dispatch({type: LOGIN, payload: response.data})
        })
    }
}

export const getAllUsers = () => {
    return (dispatch, getState) => {
        Axios.defaults.withCredentials = true
        Axios.post("http://localhost:5000/api/user/get_all_users")
        .then(response => {
            dispatch({type: GET_ALL_USERS, payload: response.data})
        })
    }
}

export const register = (user) => {
    return (dispatch, getState) => {
        Axios.post("http://localhost:5000/api/user/register", user)
            .then(response => {
                dispatch({ type: REGISTER, payload: response.data })
            })
    }
}

export const logout = () => {
    return (dispatch, getState) => {
        Axios.post('http://localhost:5000/api/user/logout', { auth_key: getState().currentUser.auth_key })
            .then(response => {
                dispatch({ type: LOGOUT })
            })
    }
}

export const updateImage = (file) => {
    return async (dispatch, getState) => {
        const data = new FormData()
        console.log(getState().currentUser.auth_key)
        data.append("auth_key", getState().currentUser.auth_key)
        data.append("user_id", getState().currentUser.user.user_id)
        data.append("image", file)

        
        Axios.patch("http://localhost:5000/api/user/update_image", data, {
            config: { headers: { "Content-Type": "multipart/form-data" } }
        }).then(response => {
            dispatch({type: UPDATE_IMAGE, payload: response.data})
        })
    }
}