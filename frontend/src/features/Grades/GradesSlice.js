import { createSlice } from '@reduxjs/toolkit'
import { statuses } from "../../constants"

export const GradesSlice = createSlice({
    name: "Grades",
    initialState : {
        grades: {
            grades: [],

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
        createGradeRequest: state => {
            state.grades.create = statuses.pending
            state.grades.createError = ""
        },
        createGradeSuccess: (state, action) => {
            state.grades.create = statuses.idle
            state.grades.grades.push(action.payload.grade)
        },
        createGradeFailiure: (state, action) => {
            state.grades.create = statuses.idle
            state.grades.createError = action.payload
        },
        readGradesRequest: state => {
            state.grades.read = statuses.pending
            state.grades.readError = ""
        },
        readGradesSuccess: (state, action) => {
            state.grades.read = statuses.idle
            state.grades.grades = action.payload.grades
        },
        readGradesFailiure: (state, action) => {
            state.grades.read = statuses.idle
            state.grades.readError = action.payload
        },
        updateGradeRequest: state => {
            state.grades.update = statuses.pending
            state.grades.updateError = ""
        },
        updateGradeSuccess: (state, action) => {
            state.grades.update = statuses.idle
            state.grades.grades = state.grades.grades.filter(grade => parseInt(grade._id) !== parseInt(action.payload.grade._id))
            state.grades.grades.push(action.payload.grade)
        },
        updateGradeFailiure: (state, action) => {
            state.grades.update = statuses.idle
            state.grades.updateError = action.payload
        },
        deleteGradeRequest: state => {
            state.grades.delete = statuses.pending
            state.grades.deleteError = ""
        },
        deleteGradeSuccess: (state, action) => {
            state.grades.delete = statuses.idle
            state.grades.grades = state.grades.grades.filter(grade => parseInt(grade._id) !== parseInt(action.payload.id))
        },
        deleteGradeFailiure: (state, action) => {
            state.grades.delete = statuses.idle
            state.grades.deleteError = action.payload
        },
    }
})

export const {
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
} = GradesSlice.actions

export default GradesSlice.reducer