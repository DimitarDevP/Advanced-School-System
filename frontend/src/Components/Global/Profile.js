import React, { Component } from 'react'
import FormData from 'form-data'
import {connect} from 'react-redux'

import {updateImage} from "../../redux/actions/UserActions"

import "./Profile.css"

class Profile extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div id="Profile">
                <h2>Update profile</h2>
                <form>
                    
                    {this.props.currentUser.user.user_role === "Professor" ? (
                        <div>
                            <label>Name</label>
                            <input type="text" name="firstname" placeholder="e.g. Roger" />
                            <label>Lastname</label>
                            <input type="text" name="lastname" placeholder="e.g. Waters" />
                            <label>Phone Number</label>
                            <input type="text" name="phone_number" placeholder="076420420" />
                            <label>Birthdate</label>
                            <input type="text" name="birth_date" placeholder="YYYY-MM-DD" />
                            <label>Salary</label>
                            <input type="text" name="salary" placeholder="Salary" />
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Your Password" />
                        </div>
                        ) : (
                        <div>
                            <label>Name</label>
                            <input type="text" name="firstname" placeholder="e.g. Roger" />
                            <label>Lastname</label>
                            <input type="text" name="lastname" placeholder="e.g. Waters" />
                            <label>Phone Number</label>
                            <input type="text" name="phone_number" placeholder="076420420" />
                            <label>Birthdate</label>
                            <input type="text" name="birth_date" placeholder="YYYY-MM-DD" />
                            <label>Parent Name</label>
                            <input type="text" name="parent_name" placeholder="e.g. Roger" />
                            <label>Parent Lastname</label>
                            <input type="text" name="parent_lastname" placeholder="e.g. Waters" />
                            <label>Parent Phone Number</label>
                            <input type="text" name="parent_phone" placeholder="076420420" />
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Your Password" />
                        </div>
                        )
                    }
                    <span>
                        <button>Submit</button>
                        <button>Change Profile Picture</button>
                    </span>
                </form>
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
        updateImage: (fd) => {dispatch(updateImage(fd))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)