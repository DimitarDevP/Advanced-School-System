import React, { Component } from 'react'

import { connect } from "react-redux"
import { createSubject , getAllSubjects } from '../../redux/actions/subjectActions'

import { NavLink } from "react-router-dom"

import "./Subjects.css"

class Subjects extends Component {
    constructor(props){
        super(props)
        this.state = {
            subjects: []
        }
    }

    tollgeCreateClass = () => {
        document.querySelectorAll("#Subjects > form")[0].classList.toggle("hidden")
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.props.currentUser.user.user_role === "Professor")
            this.props.createSubject(this.state)

        this.props.getAllSubjects()
    }

    componentDidMount() {
        this.props.getAllSubjects()
    }

    componentWillReceiveProps(){
        this.setState({
            subjects: this.props.subjects
        })
    }

    handleChange = e => this.setState({[e.target.name]:e.target.value})

    render() {
        console.log(this.props.subjects)
        const mySubjects = this.props.subjects.allSubjects.map(subject => {
            if(subject !== null && subject.professor_id === this.props.currentUser.user.user_id)
                return (
                    <NavLink className="subject" to={"/subject/"+subject.subject_id}>
                        <h2>{subject.subject_name}</h2>
                        <h5>{subject.subject_description}</h5>
                    </NavLink>
                )    
        })

        return (
            <div id="Subjects" className="container showing">
                {this.props.currentUser.user.user_role === "Professor" ? (<span onClick={this.tollgeCreateClass}>+</span>) : ("")}
                {this.props.currentUser.user.user_role === "Professor" ? (
                    <form onChange={this.handleChange} className="hidden" onSubmit={this.handleSubmit}>
                        <label htmlFor="subject_name">Subject Name</label>
                        <input type="text" name="subject_name" value={this.state.subject_name} />
                        <label htmlFor="subject_description">Subject Description</label>
                        <textarea name="subject_description" value={this.state.subject_description} />
                        <button>Create Subject</button>
                    </form>) : ("")}
                    {mySubjects}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.currentUser,
        subjects: state.subjects
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createSubject: (subject) => {
            dispatch(createSubject(subject))
        },
        getAllSubjects: () => {
            dispatch(getAllSubjects())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subjects)