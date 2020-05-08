import {combineReducers} from 'redux'
import { userReducer } from "./UserReducers"
import { classReducer } from "./ClassReducer"
import { abscencesReducer } from "./AbscencesReducer"
import { subjectsReducer } from './subjectsReducer'
export default combineReducers(
    {
        currentUser: userReducer,
        classes: classReducer,
        abscences: abscencesReducer,
        subjects: subjectsReducer
    }
)