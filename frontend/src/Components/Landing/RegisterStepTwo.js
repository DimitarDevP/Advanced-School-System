import React from 'react'

export default function RegisterStepTwo(props) {
    return (
        <div id="step_two">
            <button onClick={(e) => {props.selectStep(e, "back")}}>Back</button>
            {props.user.role === "Professor" ? (
                <div>
                    <label>Salary</label>
                    <input type="text" name="salary" placeholder="30000" value={props.user.salary}/>
                </div>
            ) : (
                <div>
                    <label>Parent Name</label>
                    <input type="text" name="parent_name" placeholder="e.g. David" value={props.user.parent_name}/>
                    <label>Parent Lastname</label>
                    <input type="text" name="parent_lastname" placeholder="e.g. Gilmour" value={props.user.parent_lastname}/>
                    <label>Parent Phone Number</label>
                    <input type="text" name="parent_phone" placeholder="079269874" value={props.user.parent_phone}/>
                </div>
            )}
            <button>Register</button>
        </div>
    )
}
