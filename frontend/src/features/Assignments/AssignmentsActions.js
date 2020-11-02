import {
    createAssignmentRequest,
    createAssignmentSuccess,
    createAssignmentFailiure,
    readAssignmentsRequest,
    readAssignmentsSuccess,
    readAssignmentsFailiure,
    updateAssignmentRequest,
    updateAssignmentSuccess,
    updateAssignmentFailiure,
    deleteAssignmentRequest,
    deleteAssignmentSuccess,
    deleteAssignmentFailiure
} from "./AssignmentsSlice"
import Axios from "axios"
import { API_URL } from "../../constants"


export const createAssignment = assignment => (dispatch, getState) => {
    dispatch(createAssignmentRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        assignment
    }

    Axios.post(API_URL+"/api/assignment/assignments", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createAssignmentSuccess(res)))
    .catch(error => dispatch(createAssignmentFailiure(error)))
}

export const readAssignments = () => (dispatch, getState) => {
    dispatch(readAssignmentsRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/assignment/assignments", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readAssignmentsSuccess(res)))
    .catch(error => dispatch(readAssignmentsFailiure(error)))
}

export const updateAssignment = (assignment) => (dispatch, getState) => {
    dispatch(updateAssignmentRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        assignment
    }

    Axios.put(API_URL+"/api/assignment/assignments", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateAssignmentSuccess(res)))
    .catch(error => dispatch(updateAssignmentFailiure(error)))
}

export const deleteAssignment = (assignment) => (dispatch, getState) => {
    dispatch(deleteAssignmentRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        assignment
    }

    Axios.delete(API_URL+"/api/assignment/assignments?_id="+assignment._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteAssignmentSuccess(res)))
    .catch(error => dispatch(deleteAssignmentFailiure(error)))
}