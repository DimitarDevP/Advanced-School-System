import React, { Component } from 'react'
import Axios from 'axios'

import StudentCard from '../StudentComponents/StudentCard'

import "./Class.css"

export default class Class extends Component {

    constructor(props){
        super(props)
        this.state = {
            class: {},
            students: []
        }
    }
    
    componentDidMount = () => {
        Axios.post("http://6a080d6864eb.ngrok.io/api/classes/get_class", {class_id: this.props.match.params.class_id})
        .then(response => {
            this.setState(response.data)
        })
    }

    render() {

        const students = this.state.students.map(student => {
            return (
                <StudentCard 
                    key={student.user_id} 
                    user_id={student.user_id}
                    profile_picture={student.profile_picture} 
                    firstname={student.firstname}
                    lastname={student.lastname}
                />
            )
        })
        return (
            <div id="ClassContainer" className="container showing">
                <h2>{this.state.class._year + " - " + this.state.class.grade + " - " + this.state.class.class }</h2>
                <div id="studentsContainer">
                    {students}
                </div>
            </div>
        )
    }
}
