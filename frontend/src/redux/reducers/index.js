import {combineReducers} from 'redux'
import { userReducer } from "./UserReducers"

export default combineReducers(
    {
        currentUser: userReducer
    }
)