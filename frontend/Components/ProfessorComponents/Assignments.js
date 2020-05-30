import React, { Component } from 'react'

import { connect } from "react-redux"
import { getAssignments , createAssignment } from '../../redux/actions/AssignmentActions'

import { NavLink } from "react-router-dom"

import "./Assignments.css"

class Assignments extends Component {
    constructor(props){
        super(props)
        this.state = {
            assignments: []
        }
    }

    tollgeCreateClass = () => {
        document.querySelectorAll("#Assignments > form")[0].classList.toggle("hidden")
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.props.currentUser.user.user_role === "Professor")
            this.props.createAssignment(this.state)

        this.props.getAssignments()
    }

    componentDidMount() {
        this.props.getAssignments()
    }

    componentWillReceiveProps(){
        this.setState({
            assignments: this.props.assignments
        })
    }

    handleChange = e => this.setState({[e.target.name]:e.target.value})

    render() {
        const myAssignments = this.props.assignments.allAssignments.map(assignment => {
            if(assignment !== null)
                return (
                    <NavLink className="assignment" to={"/assignment/"+assignment.assignment_id}>
                        <h2>{assignment.assignment_name}</h2>
                        <h5>{assignment.assignemnt_description}</h5>
                    </NavLink>
                )    
        })

        return (
            <div id="Assignments" className="container showing">
                {this.props.currentUser.user.user_role === "Professor" ? (<span onClick={this.tollgeCreateClass}>+</span>) : ("")}
                {this.props.currentUser.user.user_role === "Professor" ? (
                    <form onChange={this.handleChange} className="hidden" onSubmit={this.handleSubmit}>
                        <label htmlFor="assignment_name">Assignment Name</label>
                        <input type="text" name="assignment_name" value={this.state.assignment_name} />
                        <label htmlFor="assignment_description">Assignment Description</label>
                        <textarea name="assignment_description" value={this.state.assignment_description} />
                        <button>Create Assignment</button>
                    </form>) : ("")}
                    {myAssignments}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        assignments: state.assignments,
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createAssignment: (assignment) => {
            dispatch(createAssignment(assignment))
        },
        getAssignments: () => {
            dispatch(getAssignments())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments)