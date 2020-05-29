import { GET_ALL_ABSCENCES, SET_ABSCENCE, CHANGE_ABSCENCE_STATUS } from '../constants'

import Axios from 'axios'

export const getAssignments = () => {
    return (dispatch, getState) => {
        
        Axios.defaults.withCredentials = true
        Axios.post("http://localhost:5000/api/assignments/get_assignments", {auth_key: getState().currentUser.auth_key})
        .then(response => {
            dispatch({type: GET_ALL_ABSCENCES, payload: response.data})
        })
    }
}

export const add_submission = submittion => {
    return (dispatch, getState) => {
        const data = {
            submittion: submittion,
            user: {
                user_id: getState().currentUser.user.user_id,
                user_role: getState().currentUser.user.user_role,
                auth_key: getState().currentUser.auth_key
            }
        }
        Axios.defaults.withCredentials = true
        Axios.post("http://localhost:5000/api/assignments/add_submission", data)
        .then(response => {
            dispatch({type: CHANGE_ABSCENCE_STATUS, payload: response.data})
        })  
    }
}

export const createAssignment = assignment => {
    return (dispatch, getState) => {
        const user = {
            user_id: getState().currentUser.user.user_id,
            auth_key: getState().currentUser.auth_key
        }
        const data = {
            assignment,
            user
        }
        Axios.defaults.withCredentials = true
        Axios.post("http://localhost:5000/api/assignments/create_assignments", data)
        .then(response => {
            dispatch({type: SET_ABSCENCE, payload: response.data})
        })  
    }
}