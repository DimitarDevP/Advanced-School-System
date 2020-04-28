import {combineReducers} from 'redux'
import { userReducer } from "./UserReducers"
import { classReducer } from "./ClassReducer"
import { abscencesReducer } from "./AbscencesReducer"
export default combineReducers(
    {
        currentUser: userReducer,
        classes: classReducer,
        abscences: abscencesReducer
    }
)