import React, { Component } from 'react'

import { connect } from 'react-redux'
import {getAssignments, add_submission} from '../../redux/actions/AssignmentActions'
import {getAllUsers} from '../../redux/actions/UserActions'

import "../Containers/Profile.css"
import "./AssignmentSubmission.css"

class AssignmentSubmissions extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded: false,
        }
    }

    handleSubmit = e => {
        e.preventDefault()

        this.props.add_submission(
            this.state.submission,
            this.props.match.params.assignment_id
        )
    }

    componentDidMount() {
        // this.props.match.params.assignment_id

        this.props.getAssignments()
        this.props.getAllUsers()
    }

    componentWillReceiveProps(){
        if(this.props.currentUser.Users.length > 0 && this.props.assignments.allAssignments.length > 0) {
            this.setState({
                loaded: true
            })
        }
    }

    render() {
        let submissions = []
        let assignment = ""
        if(this.state.loaded){
            submissions = this.props.assignments.allAssignments.map(assignment => {
                let subs = assignment.submissions.map(submission => {
                    return (
                        <span>
                            <a href={"http://6a080d6864eb.ngrok.io/"+submission.submission_file} download>
                                {this.props.currentUser.Users.filter(
                                    user => user.user_id == submission.submitter_id
                                )[0].firstname + "'s " + this.props.currentUser.Users.filter(
                                    user => user.user_id == submission.submitter_id
                                )[0].lastname + " assignment submission" }
                            </a>
                        </span>
                    )
                })
                return (subs)
            })
            assignment = this.props.assignments.allAssignments.filter(assignment => assignment.assignment_id == this.props.match.params.assignment_id)
            assignment = assignment.map(assignment => {
                return(
                    <span>
                        <h2>{"Name: "} <br /> {assignment.assignment_name}</h2>
                        <h4>{"Description: "} <br /> {assignment.assignemnt_description}</h4>
                        <h4>{"Status: "} <br /> {assignment.assignment_status}</h4>
                    </span>
                )
            })
            console.log(assignment)
        }
        
        return (
            <div className="showing container" id="Profile">
                {assignment}
                {this.props.currentUser.user.user_role === "Student" ? (
                    <form className="hidden" onSubmit={this.handleSubmit}>
                        <span>
                            <label>
                                Choose File
                                <input onChange={(e) => {this.setState({submission: e.target.files[0]})}} type="file" name="submission" />
                            </label>
                            <button>Submit</button>
                        </span>
                    </form>) : (
                    <div>
                        {submissions}
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        assignments: state.assignments,
        currentUser: state.currentUser,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllUsers: () => {
            dispatch(getAllUsers())
        },
        getAssignments: () => {
            dispatch(getAssignments())
        },
        add_submission: (submission, assignment) => {
            dispatch(add_submission(submission, assignment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentSubmissions)