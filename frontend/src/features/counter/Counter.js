import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice';
import {readUsers} from "../User/UserActions"
import {readImages} from "../User/Images/UserImagesActions"
import {readGenders} from "../User/Genders/UserGendersActions"
import {readTypes} from "../User/Types/UserTypesActions"

import {readSubjects} from "../Subjects/SubjectsActions"
import {readEnrolls} from "../Subjects/Enrolls/EnrollActions"
import {readEnteries} from "../Subjects/Enteries/EnteriesActions"
import {readGroups} from "../Subjects/Groups/GroupsActions"

import {readClasses} from "../Classes/ClassActions"
import {readAreas} from "../Classes/Areas/AreasActions"
import {readEnrollments} from "../Classes/Enrollments/EnrollmentsActions"

import {readAssignments} from "../Assignments/AssignmentsActions"
import {readAssignmentEnteries} from "../Assignments/Enteries/EnteriesActions"

import {readAbscences} from "../Abscences/AbscencesActions"
import {readStatuses} from "../Abscences/Statuses/StatusesActions"

import {readGrades} from "../Grades/GradesActions"
import styles from './Counter.module.css';

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');



  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
      <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readUsers())}
        >
          Get Users
        </button>
        <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readImages())}
        >
          Get Images
        </button>
        <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readGenders())}
        >
          Get Genders
        </button>
        <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readTypes())}
        >
          Get Types
        </button>
        <br />
        <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readSubjects())}
        >
          Get Subjects
        </button>
        <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readEnrolls())}
        >
          Get Enrolls
        </button>
        <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readEnteries())}
        >
          Get Enteries
        </button>
        <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readGroups())}
        >
          Get Groups
        </button>
        <br />
        <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readClasses())}
        >
          Get Classes
        </button>
        <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readAreas())}
        >
          Get Areas
        </button>
        <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readEnrollments())}
        >
          Get Class Enrollments
        </button>
        <br />
        <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readAssignments())}
        >
          Get Assignments
        </button>
        <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readAssignmentEnteries())}
        >
          Get Assignment Enteries
        </button>
        <br />
        <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readAbscences())}
        >
          Get Abscences
        </button>
        <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readStatuses())}
        >
          Get Abscence Statuses
        </button>
        <br />
        <button 
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(readGrades())}
        >
          Get Grades
        </button>
    </div>
  );
}


