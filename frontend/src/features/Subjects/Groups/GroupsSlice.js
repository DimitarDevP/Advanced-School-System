import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../../constants"

export const GroupsSlice = createSlice({
    name: "Groups",
    initialState : {
        groups: {
            groups: [],

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
        createGroupRequest: state => {
            state.groups.create = statuses.pending
            state.groups.createError = ""
        },
        createGroupSuccess: (state, action) => {
            state.groups.create = statuses.idle
            state.groups.groups.push(action.payload.group)
        },
        createGroupFailiure: (state, action) => {
            state.groups.create = statuses.idle
            state.groups.createError = action.payload
        },
        readGroupsRequest: state => {
            state.groups.read = statuses.pending
            state.groups.readError = ""
        },
        readGroupsSuccess: (state, action) => {
            state.groups.read = statuses.idle
            state.groups.groups = action.payload.groups
        },
        readGroupsFailiure: (state, action) => {
            state.groups.read = statuses.idle
            state.groups.readError = action.payload
        },
        updateGroupRequest: state => {
            state.groups.update = statuses.pending
            state.groups.updateError = ""
        },
        updateGroupSuccess: (state, action) => {
            state.groups.update = statuses.idle
            state.groups.groups = state.groups.groups.filter(group => parseInt(group._id) !== parseInt(action.payload.group._id))
            state.groups.groups.push(action.payload.group)
        },
        updateGroupFailiure: (state, action) => {
            state.groups.update = statuses.idle
            state.groups.updateError = action.payload
        },
        deleteGroupRequest: state => {
            state.groups.delete = statuses.pending
            state.groups.deleteError = ""
        },
        deleteGroupSuccess: (state, action) => {
            state.groups.delete = statuses.idle
            state.groups.groups = state.groups.groups.filter(group => parseInt(group._id) !== parseInt(action.payload.id))
        },
        deleteGroupFailiure: (state, action) => {
            state.groups.delete = statuses.idle
            state.groups.deleteError = action.payload
        },
    }
})

export const {
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
} = GroupsSlice.actions

export default GroupsSlice.reducer