import React, {useState} from 'react'
import { connect } from 'react-redux'

function Abscences(props) {

    const handleSubmit = e => {
        e.preventDefault()

        const abscences = document.querySelectorAll(".abscenceField")
        let abscencesArray = []
        for(let i = 0; i < abscences.length; i++){
            abscencesArray.push({
                "student_id" : props.user_id,
                "abscence_id": abscences[i].childNodes[0].innerHTML,
                [abscences[i].childNodes[1].name] : abscences[i].childNodes[1].value,
                [abscences[i].childNodes[4].childNodes[0].name] : abscences[i].childNodes[4].childNodes[0].value,
            })
        }
        props.setAbscencesStatus(abscencesArray)
        props.update()
    }

    const handleNewAbscence = e => {
        e.preventDefault()
        const parent = document.querySelectorAll(".addAbscence")[0]
        const abscence = {
            user_id: props.user_id,
            [parent.childNodes[1].name] : parent.childNodes[1].value,
            [parent.childNodes[3].childNodes[0].name] : parent.childNodes[3].childNodes[0].value,
        }
        props.addAbscence(abscence)
        props.update()
    }

    const abscences = props.abscences.map(abscence => {
        return (
            <span className="abscenceField" key={abscence.absence_id}>
                <h4>{abscence.absence_id}</h4>
                <textarea name="_description" defaultValue={abscence._description} />
                <h4>{abscence._date}</h4>
                <h4>{abscence._period}</h4> 
                <h4>
                    <input type="text" name="_status" defaultValue={abscence._status} /> 
                </h4>
            </span>
        )
    })
    return (
        <div id="Abscences" className="tableClass">
            <h2>Abscences:</h2>
            <span>
                <h4>ID</h4>
                <h4>Desctition</h4>
                <h4>Date</h4>
                <h4>Period</h4>
                <h4>Approved</h4>
            </span>
            {abscences}
            <span className="addAbscence">
                <h4><input type="text" name="id" value="ID" /> </h4>
                <textarea name="_description" />
                <h4><input type="text" name="date" value="Date" /> </h4>
                <h4><input type="text" name="_period" /> </h4> 
                <h4>
                    <input type="text" name="_status" value="Pending" /> 
                </h4>
            </span>
            {props.currentUserRole === "Professor" ? (
                    <div>
                        <button onClick={handleSubmit}>Update Data</button>
                        <button onClick={handleNewAbscence}>Create Abscence</button>
                    </div>
                ) : ("")
            }
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUserRole: state.currentUser.user.user_role
    }
}

export default connect(mapStateToProps)(Abscences)