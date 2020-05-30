import React from 'react'

function EnrollSubject(props) {

    const options = props.subjects.map(subject => {
        return (
            <option value={subject.subject_id}>{subject.subject_name}</option>
        )
    })

    // const handleChange = e => console.log()

    const handleSubmit = e => {
        e.preventDefault()
        const subject_id = e.target.parentNode.childNodes[1].selectedIndex
        let subject_exists = false
        for (let i = 0; i < props.subjects.length; i++){
            if (props.subjects[i].subject_id == subject_id)
                subject_exists = true
        }

        if (!subject_exists)
            return

        props.enrollSubject(subject_id)
    }

    return (
        <div id="enrollSubject">
        <h2>Enroll a new subject</h2>
            <form>
                <label htmlFor="subject_name">Subject Name</label>
                <select type="text" name="subject_name">
                    <option value="0">Select Subject to Enroll</option>
                    {options}
                </select>
                <button onClick={handleSubmit}>Enroll Subject</button>
            </form>
        </div>
    )
}

export default EnrollSubject