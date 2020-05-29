import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux"

import {getSubjectClasses, getAllSubjects} from "../../redux/actions/subjectActions"
import "./SubjectClasses.css"
import Axios from 'axios'

class SubjectClasses extends Component {
    constructor(props){
        super(props)
        this.state = {
            subject: {},
            loaded: false
        }
    }

    componentDidMount(){
        this.props.getAllSubjects()
        this.props.getSubjectClasses(this.props.match.params.subject_id)
        const subject = this.props.subjects.allSubjects.filter(subject => subject.subject_id == this.props.match.params.subject_id)
        console.log(subject)
        this.setState({
            subject: subject[0],
            loaded: true
        })
    }

    render() {

        const subjectClasses = this.props.subjects.subjectsClasses.map(_class => {
            if(_class !== null)
                return (
                    <NavLink className="class" to={"/class/"+_class.class_id}>
                        <h2>{_class.grade}</h2>
                        <h5>{_class.class}</h5>
                        <h6>{_class._year}</h6>
                    </NavLink>
                )    
        })

        return (
            <div id="SubjectClasses" className="container showing">
                {this.state.loaded ? (<span className="subject">
                    <h2>{this.state.subject.subject_name}</h2>
                    <h5>{this.state.subject.subject_description}</h5>
                </span>) : ""}
                {subjectClasses}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getSubjectClasses: (subject_id) => {
            dispatch(getSubjectClasses(subject_id))
        },
        getAllSubjects: () => {
            dispatch(getAllSubjects())
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        subjects: state.subjects
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectClasses)