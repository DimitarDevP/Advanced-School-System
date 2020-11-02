import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../constants"


export const userSlice = createSlice({
    name: "user",
    initialState : {
        current: {
            user: {},
            
            login: statuses.idle,
            loginError: "",

            logout: statuses.idle,
            updateError: "",
            
            token: "",
        },
        users: {
            users: [],

            create: statuses.idle,
            createError: "",
            
            read: statuses.idle,
            readError: "",

            update: statuses.idle,
            updateError: "",

            delete: statuses.idle,
            deleteError: "",

        }
    },

    reducers: {
        loginRequest: state => {
            state.login = statuses.pending
            state.loginError = ""
        },
        loginSuccess: (state, action) => {
            state.current.user = action.payload.user
            state.current.token = action.payload.token
            state.current.login = statuses.idle
        },
        loginFailiure: (state, action) => {
            state.current.login = statuses.idle
            state.current.loginError = action.payload
        },

        createUserRequest: state => {
            state.users.create = statuses.pending
            state.users.createError = ""
        },
        createUserSuccess: (state, action) => {
            state.users.create = statuses.idle
            state.users.users.push(action.payload.user)
            state.current.user = action.payload.user
            state.current.token = action.payload.token
        },
        createUserFailiure: (state, action) => {
            state.users.create = statuses.idle
            state.users.createError = action.payload
        },

        readUsersRequest: state => {
            state.users.read = statuses.pending
            state.users.readError = ""
        },
        readUsersSuccess: (state, action) => {
            state.users.read = statuses.idle
            state.users.users = action.payload.users
        },
        readUsersFailiure: (state, action) => {
            state.users.read = statuses.idle
            state.users.readError = action.payload
        },
        updateUserRequest: state => {
            state.users.update = statuses.pending
            state.users.updateError = ""
        },
        updateUserSuccess: (state, action) => {
            state.users.update = statuses.idle
            state.users.users = state.users.users.filter(user => parseInt(user._id) !== parseInt(action.payload.user._id))
            state.users.users.push(action.payload.user)
            if(parseInt(action.payload.user._id) === parseInt(state.current.user._id))
                state.current.user = action.payload.user
        },
        updateUserFailiure: (state, action) => {
            state.users.update = statuses.idle
            state.users.updateError = action.payload
        },
        deleteUserRequest: state => {
            state.users.delete = statuses.pending
            state.users.deleteError = ""
        },
        deleteUserSuccess: (state, action) => {
            state.users.delete = statuses.idle
            state.users.users = state.users.users.filter(user => parseInt(user._id) !== parseInt(action.payload.id))
        },
        deleteUserFailiure: (state, action) => {
            state.users.delete = statuses.idle
            state.users.deleteError = action.payload
        },
    }
})

export const {
    loginRequest,
    loginSuccess,
    loginFailiure,
    createUserRequest,
    createUserSuccess,
    createUserFailiure,
    readUsersRequest,
    readUsersSuccess,
    readUsersFailiure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailiure,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFailiure
} = userSlice.actions

export default userSlice.reducer