import React, { Component } from 'react'

import { connect } from 'react-redux'
import { createSubject, enrollSubject, getAllSubjects, getEnrolledSubjects, getSubjectClasses } from "../../redux/actions/subjectActions.js"

import Grades from "./Grades"

class Subjects extends Component {

    constructor(props) {
        super(props)
        this.state = {
            subjects: [],
            dataLoaded: false
        }
    }

    componentDidMount() {
        this.setState({dataLoaded: true})
        this.props.getEnrolledSubjects()
        this.props.getAllSubjects()
        const subjects = this.props.subjects.enrolledSubjects.filter(subject => subject.user_id == this.props.user_id)
        const allSubjects = this.props.subjects.allSubjects
        this.setState({
            subjects,
            dataLoaded: true
        })
    }

    render() {
        const subjects = this.state.subjects.map(subject => {
            let professor = this.props.currentUser.Users.filter(user => user.user_id === subject.subject.professor_id)[0]
            return (
                <span>
                    <h4>{subject.subject.subject_id}</h4>
                    <h4>{subject.subject.subject_description}</h4>
                    <h4>{subject.subject.subject_name}</h4>
                    <h4>{professor.firstname + " " + professor.lastname}</h4>
                    <Grades user_id={this.props.user_id} subject={subject.subject}/>
                </span>
            )
        })
        return (
            <div id="studentSubjects" className="tableClass">
                <h2>Subjects</h2>
                <span>
                    <h4>ID</h4>
                    <h4>Description</h4>
                    <h4>Name</h4>
                    <h4>Professor</h4>
                </span>
                {subjects}
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
        getEnrolledSubjects: () => {dispatch(getEnrolledSubjects())},
        getAllSubjects: () => (dispatch(getAllSubjects()))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subjects)