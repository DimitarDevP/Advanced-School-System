import React, { Component } from 'react'

import Info from "./Info"
import Abscences from "./Abscences"
import Subjects from "./Subjects"
import EnrollSUbject from "./EnrollSubject"

import "./Student.css"

import {connect} from 'react-redux'
import {getAllUsers} from "../../redux/actions/UserActions"
import {getAbscences, setAbscencesStatus, addAbscence} from "../../redux/actions/AbscencesActions"
import {getAllSubjects, enrollSubject} from "../../redux/actions/subjectActions"

class Student extends Component {

    constructor(props) {
        super(props)

        this.state = {
            student: {},
            abscences: [],
            dataIsLoaded: false,
        }
    }

    componentWillReceiveProps() {
        let student = this.props.currentUser.Users.filter(user => user.user_id == this.props.match.params.user_id)[0]
        let abscences = this.props.abscences.all_abscences.filter(abscence => abscence.student_id == this.props.match.params.user_id)
        if(typeof student !== "undefined"){
            this.setState({
                student,
            })
        }

        if (typeof abscences !== "undefined" || this.state.abscences !== abscences){
            this.setState({
                abscences,
            })
        }

        if (typeof student !== "undefined" && typeof abscences !== undefined){
            this.setState({
                dataIsLoaded: true,
            })
        }

    }

    componentDidMount() {
        this.props.getAllUsers()
        this.props.getAbscences()
        this.props.getAllSubjects()
    }

    render() {
        return (
            <div id="Student" className="container showing">
                {this.state.dataIsLoaded ? (
                    <div>
                        <Info 
                            name={this.state.student.firstname + " " + this.state.student.lastname}
                            parent_name={this.state.student.parent_name + " " + this.state.student.parent_lastname}
                            sex={this.state.student.sex}
                            birth_date={this.state.student.birth_date.substring(5, 16)}
                            email={this.state.student.email}
                            phone_number={this.state.student.phone_number}
                            parent_phone={this.state.student.parent_phone}
                            profile_picture={this.state.student.profile_picture}
                        />
                        
                        <Abscences 
                            user_id={this.props.match.params.user_id} 
                            update={this.props.getAbscences} 
                            addAbscence={this.props.addAbscence} 
                            setAbscencesStatus={this.props.setAbscencesStatus} 
                            abscences={this.state.abscences}
                        />

                        <Subjects
                            user_id={this.props.match.params.user_id} 
                        />

                        <EnrollSUbject
                            subjects={this.props.allSubjects} 
                            userIsCurrent={this.props.match.params.user_id == this.props.currentUser.user.user_id}
                            enrollSubject={this.props.enrollSubject}
                         />
                    </div>
                ) : (<h2>Loading</h2>)}
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.currentUser,
        abscences: state.abscences,
        allSubjects: state.subjects.allSubjects
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllUsers: () => {dispatch(getAllUsers())},
        getAbscences: () => (dispatch(getAbscences())),
        setAbscencesStatus: (abscencesArray) => (dispatch(setAbscencesStatus(abscencesArray))),
        addAbscence: (abscence) => dispatch(addAbscence(abscence)),
        getAllSubjects: () => dispatch(getAllSubjects()),
        enrollSubject: (subject_id, student_id) => dispatch(enrollSubject(subject_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student)