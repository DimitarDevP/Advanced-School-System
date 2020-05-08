import React, { Component } from 'react'

import { connect } from "react-redux"
import { createSubject , getAllSubjects } from '../../redux/actions/subjectActions'

import "./Subjects.css"

class Subjects extends Component {
    constructor(props){
        super(props)
        this.state = {

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

    handleChange = e => {this.setState({[e.target.name]:e.target.value})}

    render() {
        return (
            <div id="Subjects" className="container showing">
                {this.props.currentUser.user.user_role === "Professor" ? (<span onClick={this.tollgeCreateClass}>+</span>) : ("")}
                {this.props.currentUser.user.user_role === "Professor" ? (
                    <form onChange={this.handleChange} className="hidden" onSubmit={this.handleSubmit}>
                        <label htmlFor="grade">Subject Name</label>
                        <input type="text" name="subject_name" value={this.state.subject_name} />
                        <label htmlFor="grade">Subject Description</label>
                        <textarea name="subject_description" value={this.state.subject_description} />
                        <button>Create Class</button>
                    </form>) : ("")}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.currentUser
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