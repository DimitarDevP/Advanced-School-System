import { GET_ALL_ASSIGNMENTS, SUBMIT_TO_ASSIGNMENT, CREATE_ASSIGNMENT } from '../constants'

import Axios from 'axios'

export const getAssignments = () => {
    return (dispatch, getState) => {
        
        Axios.defaults.withCredentials = true
        Axios.get("http://6a080d6864eb.ngrok.io/api/assignments/get_assignments", {auth_key: getState().currentUser.auth_key})
        .then(response => {
            dispatch({type: GET_ALL_ASSIGNMENTS, payload: response.data})
        })
    }
}

export const add_submission = (submission, assignment_id) => {
    return async (dispatch, getState) => {
        const data = new FormData()
        data.append("user_id", getState().currentUser.user.user_id)
        data.append("submission", submission)
        data.append("assignment_id", assignment_id)
        Axios.defaults.withCredentials = true
        Axios.patch("http://6a080d6864eb.ngrok.io/api/assignments/add_submission", data, data, {
            config: { headers: { "Content-Type": "multipart/form-data" } }
        })
        .then(response => {
            dispatch({type: SUBMIT_TO_ASSIGNMENT, payload: response.data})
        })  
    }
}

export const createAssignment = assignment => {
    return  (dispatch, getState) => {
        const user = {
            
        }
        const data = {
            assignment,
            user_id: getState().currentUser.user.user_id,
        }
        Axios.defaults.withCredentials = true
        Axios.post("http://6a080d6864eb.ngrok.io/api/assignments/create_assignments", data)
        .then(response => {
            dispatch({type: CREATE_ASSIGNMENT, payload: response.data})
        })  
    }
}