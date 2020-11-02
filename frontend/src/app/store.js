import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

import userReducer from "../features/User/UserSlice"
import userImagesReducer from "../features/User/Images/UserImagesSlice"
import userGendersReducer from "../features/User/Genders/UserGendersSlice"
import userTypesReducer from "../features/User/Types/UserTypesSlice"

import subjectsReducer from "../features/Subjects/SubjectsSlice"
import subjectsGroupsReducer from "../features/Subjects/Groups/GroupsSlice"
import subjectsEnteriesReducer from "../features/Subjects/Enteries/EnteriesSlice"
import subjectsEnrollsReducer from "../features/Subjects/Enrolls/EnrollsSlice"

import classesReducer from "../features/Classes/ClassSlice"
import classEnrollmentsReducer from "../features/Classes/Enrollments/EnrollmentsSlice"
import classAreasReducer from "../features/Classes/Areas/AreasSlice"

import assignmentsReducer from "../features/Assignments/AssignmentsSlice"
import assignmentEnteriesReducer from "../features/Assignments/Enteries/AssignmentEnteriesSlice"

import abscencesReducer from "../features/Abscences/AbscencesSlice"
import abscencesStatusesReducer from "../features/Abscences/Statuses/StatusesSlice"

import gradesReducer from "../features/Grades/GradesSlice"

export default configureStore({
  reducer: {
    counter : counterReducer,
    user : userReducer,
    userImages : userImagesReducer,
    userGenders : userGendersReducer,
    userTypes : userTypesReducer,
    subjects: subjectsReducer,
    subjectsGroups: subjectsGroupsReducer,
    subjectsEnteries: subjectsEnteriesReducer,
    subjectsEnrolls: subjectsEnrollsReducer,
    classes : classesReducer,
    classEnrollments : classEnrollmentsReducer,
    classAreas : classAreasReducer,
    assignments : assignmentsReducer,
    assignmentsEnteries : assignmentEnteriesReducer,
    abscences : abscencesReducer,
    abscencesStatuses : abscencesStatusesReducer,
    grades : gradesReducer
  },
})
