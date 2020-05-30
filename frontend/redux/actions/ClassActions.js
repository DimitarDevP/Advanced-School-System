import { CREATE_CLASS, GET_CLASS, ENROLL_CLASS, GET_ALL_CLASSES, GET_MY_CLASSES, LOGOUT } from '../constants'

import Axios from 'axios'

export const createClass = (classData) => {
    return (dispatch, getState) => {
        classData.user_id = getState().currentUser.user.user_id
        classData.auth_key = getState().currentUser.auth_key
        classData.user_role = getState().currentUser.user.user_role
        Axios.defaults.withCredentials = true
        Axios.post("http://6a080d6864eb.ngrok.io/api/classes/create_class", classData)
        .then(response => {
            dispatch({type: CREATE_CLASS, payload: response.data})
        })
    }
}

export const joinClass = (classData) => {
    return (dispatch, getState) => {
        Axios.defaults.withCredentials = true
        Axios.post("http://6a080d6864eb.ngrok.io/api/classes/enroll_class", {
            class: classData, 
            user: {
                user_id: getState().currentUser.user.user_id,
                user_role: getState().currentUser.user.user_role,
                auth_key: getState().currentUser.auth_key
            }
        })
        .then(response => {
            dispatch({type: ENROLL_CLASS, payload: response.data})
        })
    }
}

export const getMyClasses = () => {
    return(dispatch, getState) => {
        Axios.defaults.withCredentials = true
        Axios.post("http://6a080d6864eb.ngrok.io/api/classes/get_homeroom_classes", {
            user_role: getState().currentUser.user.user_role, 
            user_id: getState().currentUser.user.user_id
        })
        .then(response => {
            dispatch({type: GET_MY_CLASSES, payload: response.data})
        })
    }
}

export const clearUserClasses = () => {
    return (dispatch, getState) => {
        Axios.post('http://6a080d6864eb.ngrok.io/api/user/logout', { auth_key: getState().currentUser.auth_key })
            .then(response => {
                dispatch({ type: LOGOUT })
            })
    }
}