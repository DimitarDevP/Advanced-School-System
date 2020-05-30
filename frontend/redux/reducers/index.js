import {combineReducers} from 'redux'
import { userReducer } from "./UserReducers"
import { classReducer } from "./ClassReducer"
import { abscencesReducer } from "./AbscencesReducer"
import { subjectsReducer } from './subjectsReducer'
import {AssignmentReducer } from './AssignmentReducer'

export default combineReducers(
    {
        currentUser: userReducer,
        classes: classReducer,
        abscences: abscencesReducer,
        subjects: subjectsReducer,
        assignments: AssignmentReducer
    }
)