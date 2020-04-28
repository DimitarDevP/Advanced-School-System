import { CREATE_CLASS, GET_CLASS, ENROLL_CLASS, GET_ALL_CLASSES } from '../constants'

import Axios from 'axios'

export const createClass = (classData) => {
    return (dispatch, getState) => {
        classData.user_id = getState().currentUser.user.user_id
        classData.auth_key = getState().currentUser.auth_key
        // Axios.defaults.withCredentials = true
        Axios.post("http://localhost:5000/api/classes/create_class", classData)
        .then(response => {
            dispatch({type: CREATE_CLASS, payload: response.data})
        })
    }
}

export const joinClass = (classData) => {
    return (dispatch, getState) => {
        Axios.defaults.withCredentials = true
        Axios.post("http://localhost:5000/api/classes/enroll_class", classData)
        .then(response => {
            dispatch({type: ENROLL_CLASS, payload: response.data})
        })
    }
}