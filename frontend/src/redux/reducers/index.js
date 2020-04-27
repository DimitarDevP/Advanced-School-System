import {combineReducers} from 'redux'
import { userReducer } from "./UserReducers"
import { classReducer } from "./ClassReducer"

export default combineReducers(
    {
        currentUser: userReducer,
        homeroomClass: classReducer
    }
)