import {
    createGroupRequest,
    createGroupSuccess,
    createGroupFailiure,
    readGroupsRequest,
    readGroupsSuccess,
    readGroupsFailiure,
    updateGroupRequest,
    updateGroupSuccess,
    updateGroupFailiure,
    deleteGroupRequest,
    deleteGroupSuccess,
    deleteGroupFailiure
} from "./GroupsSlice"
import Axios from "axios"
import { API_URL } from "../../../constants"


export const createGroup = group => (dispatch, getState) => {
    dispatch(createGroupRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        group
    }

    Axios.post(API_URL+"/api/subject/groups", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createGroupSuccess(res)))
    .catch(error => dispatch(createGroupFailiure(error)))
}

export const readGroups = () => (dispatch, getState) => {
    dispatch(readGroupsRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/subject/groups", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readGroupsSuccess(res)))
    .catch(error => dispatch(readGroupsFailiure(error)))
}

export const updateGroup = (group) => (dispatch, getState) => {
    dispatch(updateGroupRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        group
    }

    Axios.put(API_URL+"/api/subject/groups", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateGroupSuccess(res)))
    .catch(error => dispatch(updateGroupFailiure(error)))
}

export const deleteGroup = (group) => (dispatch, getState) => {
    dispatch(deleteGroupRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        group
    }

    Axios.delete(API_URL+"/api/subject/groups?_id="+group._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteGroupSuccess(res)))
    .catch(error => dispatch(deleteGroupFailiure(error)))
}