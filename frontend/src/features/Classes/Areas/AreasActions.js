import {
    createAreaRequest,
    createAreaSuccess,
    createAreaFailiure,
    readAreasRequest,
    readAreasSuccess,
    readAreasFailiure,
    updateAreaRequest,
    updateAreaSuccess,
    updateAreaFailiure,
    deleteAreaRequest,
    deleteAreaSuccess,
    deleteAreaFailiure
} from "./AreasSlice"
import Axios from "axios"
import { API_URL } from "../../../constants"


export const createArea = area => (dispatch, getState) => {
    dispatch(createAreaRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        area
    }

    Axios.post(API_URL+"/api/class/areas", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createAreaSuccess(res)))
    .catch(error => dispatch(createAreaFailiure(error)))
}

export const readAreas = () => (dispatch, getState) => {
    dispatch(readAreasRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/class/areas", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readAreasSuccess(res)))
    .catch(error => dispatch(readAreasFailiure(error)))
}

export const updateArea = (area) => (dispatch, getState) => {
    dispatch(updateAreaRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        area
    }

    Axios.put(API_URL+"/api/class/areas", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateAreaSuccess(res)))
    .catch(error => dispatch(updateAreaFailiure(error)))
}

export const deleteArea = (area) => (dispatch, getState) => {
    dispatch(deleteAreaRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        area
    }

    Axios.delete(API_URL+"/api/class/areas?_id="+area._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteAreaSuccess(res)))
    .catch(error => dispatch(deleteAreaFailiure(error)))
}