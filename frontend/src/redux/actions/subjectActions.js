import { CREATE_SUBJECT, ENROLL_SUBJECT, GET_ALL_SUBJECTS, GET_ENROLLED_SUBJECTS, GET_SUBJECT_CLASSES } from '../constants'
import Axios from 'axios'

export const createSubject = (data) => {
    return (dispatch, getState) => {
        Axios.defaults.withCredentials = true
        data.user_id = getState().currentUser.user.user_id
        data.user_role = getState().currentUser.user.user_role
        data.auth_key = getState().currentUser.auth_key
        Axios.post("http://localhost:5000/api/subjects/create_subject", data)
        .then(response => {
            dispatch({type: CREATE_SUBJECT, payload: response.data}) //subjects = []
        })
    }
}

export const enrollSubject = (subject_id) => {
    return (dispatch, getState) => {
        Axios.defaults.withCredentials = true
        const data = {
            subject_id: subject_id,
            student_id: getState().currentUser.user.user_id,
            auth_key: getState().currentUser.auth_key
        }
        Axios.post("http://localhost:5000/api/subjects/enroll_subject", data)
        .then(response => {
            dispatch({type: ENROLL_SUBJECT, payload: response.data})
        })
    }
}

export const getAllSubjects = () => {
    return (dispatch, getState) => {
        
        Axios.defaults.withCredentials = true
        Axios.get("http://localhost:5000/api/subjects/get_all_subjects")
        .then(response => {
            dispatch({type: GET_ALL_SUBJECTS, payload: response.data}) //subjects = []
        })
    }
}

export const getEnrolledSubjects = () => {
    return (dispatch, getState) => {
        Axios.defaults.withCredentials = true
        Axios.get("http://localhost:5000/api/subjects/get_enrolled_subjects")
        .then(response => {
            dispatch({type: GET_ENROLLED_SUBJECTS, payload: response.data}) // enrolled_subjects = []
        })
    }
}

export const getSubjectClasses = (subject_id) => {
    return (dispatch, getState) => {
        Axios.defaults.withCredentials = true
        Axios.post("http://localhost:5000/api/subjects/get_subject_classes", subject_id)
        .then(response => {
            dispatch({type: GET_SUBJECT_CLASSES, payload: response.data}) // classes = []
        })
    }
}