import {
    createGradeRequest,
    createGradeSuccess,
    createGradeFailiure,
    readGradesRequest,
    readGradesSuccess,
    readGradesFailiure,
    updateGradeRequest,
    updateGradeSuccess,
    updateGradeFailiure,
    deleteGradeRequest,
    deleteGradeSuccess,
    deleteGradeFailiure
} from "./GradesSlice"
import Axios from "axios"
import { API_URL } from "../../constants"


export const createGrade = grade => (dispatch, getState) => {
    dispatch(createGradeRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
        grade
    }

    Axios.post(API_URL+"/api/grade/grades", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(createGradeSuccess(res)))
    .catch(error => dispatch(createGradeFailiure(error)))
}

export const readGrades = () => (dispatch, getState) => {
    dispatch(readGradesRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
    }

    Axios.get(API_URL+"/api/grade/grades", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(readGradesSuccess(res)))
    .catch(error => dispatch(readGradesFailiure(error)))
}

export const updateGrade = (grade) => (dispatch, getState) => {
    dispatch(updateGradeRequest())
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        grade
    }

    Axios.put(API_URL+"/api/grade/grades", requestOptions)
    .then(res => res.data)
    .then(res => dispatch(updateGradeSuccess(res)))
    .catch(error => dispatch(updateGradeFailiure(error)))
}

export const deleteGrade = (grade) => (dispatch, getState) => {
    dispatch(deleteGradeRequest())
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: getState().user.current.token
        },
        grade
    }

    Axios.delete(API_URL+"/api/grade/grades?_id="+grade._id, requestOptions)
    .then(res => res.data)
    .then(res => dispatch(deleteGradeSuccess(res)))
    .catch(error => dispatch(deleteGradeFailiure(error)))
}