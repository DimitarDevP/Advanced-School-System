import React, { Component } from 'react'

import Info from "./Info"
import Abscences from "./Abscences"
import Subjects from "./Subjects"

import "./Student.css"

import {connect} from 'react-redux'
import {getAllUsers} from "../../redux/actions/UserActions"
import {getAbscences, setAbscencesStatus, addAbscence} from "../../redux/actions/AbscencesActions"

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
        console.log("Props!")
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
    }

    toggleVisible = e => {
        e.target.parentElement.classList.toggle("hidden")
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
                            toggleVisible={this.toggleVisible}
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
                    </div>
                ) : (<h2>Loading</h2>)}
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.currentUser,
        abscences: state.abscences
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllUsers: () => {dispatch(getAllUsers())},
        getAbscences: () => (dispatch(getAbscences())),
        setAbscencesStatus: (abscencesArray) => (dispatch(setAbscencesStatus(abscencesArray))),
        addAbscence: (abscence) => dispatch(addAbscence(abscence))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student)