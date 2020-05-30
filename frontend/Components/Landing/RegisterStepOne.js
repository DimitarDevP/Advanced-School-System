import React from 'react'

import "./Register.css"

export default function RegisterStepOne(props) {
    return (
        <div id="step_one">
            <label>Name</label>
            <input type="text" name="firstname" placeholder="e.g. Roger" onChange={() => {}} value={props.user.firstname}/>
            <label>Lastname</label>
            <input type="text" name="lastname" placeholder="e.g. Waters" onChange={() => {}} value={props.user.lastname}/>
            <label>Email</label>
            <input type="email" name="email" placeholder="someone@something.com" onChange={() => {}} value={props.user.email}/>
            <label>Password</label>
            <input type="password" name="password" placeholder="Secure Password" onChange={() => {}} />
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="Secure Password" onChange={() => {}} />
            <label>Phone Number</label>
            <input type="text" name="phone_number" placeholder="076420420" value={props.user.phone_number} onChange={() => {}} />
            <label>Gender</label>
            <input type="text" name="sex" placeholder="male or female" value={props.user.sex} onChange={() => {}} />
            <label>Birthdate</label>
            <input type="text" name="birth_date" placeholder="YYYY-MM-DD" value={props.user.birth_date} onChange={() => {}} />
            <label>Continue as</label>
            <span id="role_selector">
                <button onClick={(e) => {props.selectStep(e, "Student")}}>Student</button>
                <h4>OR</h4>
                <button onClick={(e) => {props.selectStep(e, "Professor")}}>Professor</button>
            </span>
        </div>
    )
}
