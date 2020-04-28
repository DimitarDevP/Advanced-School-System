import { GET_ALL_ABSCENCES, SET_ABSCENCE } from '../constants'

import Axios from 'axios'

export const getAbscences = () => {
    return (dispatch, getState) => {
        
        Axios.defaults.withCredentials = true
        Axios.post("http://localhost:5000/api/abscences/get_abscences", {auth_key: getState().currentUser.auth_key})
        .then(response => {
            dispatch({type: GET_ALL_ABSCENCES, payload: response.data})
        })
    }
}

export const setAbscencesStatus = abscencesArray => {
    return (dispatch, getState) => {
        const data = {
            abscences: abscencesArray,
            user: {
                user_id: getState().currentUser.user.user_id,
                user_role: getState().currentUser.user.user_role,
                auth_key: getState().currentUser.auth_key
            }
        }
        Axios.defaults.withCredentials = true
        Axios.post("http://localhost:5000/api/abscences/set_abscences_status", data)
        .then(response => {
            dispatch({type: SET_ABSCENCE, payload: response.data})
        })  
    }
}