import React, { Component } from 'react'
import FormData from 'form-data'
import {connect} from 'react-redux'

import {updateImage} from "../../redux/actions/UserActions"

import "./Profile.css"

class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            image: undefined,
            firstname: "",
            lastname: "",
            phone_number: "",
            birth_date: "",
            parent_name: "",
            parent_lastname: "",
            parent_phone: "",
            password: "",
            error: ""
        }
    }

    handleChange = e => {
        if(e.target.name !== "image")
            this.setState({[e.target.name] : e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.props.currentUser.user._password !== this.state.password){
            this.setState({error: "Please enter your password to confirm your identity."})
            return
        }
        else {
            this.setState({error: ""})
        }

        this.props.updateImage(this.state.image)
    }

    render() {
        return (
            <div id="Profile">
                <h2>Update profile</h2>
                <form onChange={this.handleChange} onSubmit={this.handleSubmit} >
                    
                    {this.props.currentUser.user.user_role === "Professor" ? (
                        <div>
                            <label>Name</label>
                            <input type="text" name="firstname" placeholder="e.g. Roger" value={this.state.firstname} />
                            <label>Lastname</label>
                            <input type="text" name="lastname" placeholder="e.g. Waters" value={this.state.lastname} />
                            <label>Phone Number</label>
                            <input type="text" name="phone_number" placeholder="076420420" value={this.state.phone_number} />
                            <label>Birthdate</label>
                            <input type="text" name="birth_date" placeholder="YYYY-MM-DD" value={this.state.birth_date} />
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Your Password" value={this.state.password} />
                        </div>
                        ) : (
                        <div>
                            <label>Name</label>
                            <input type="text" name="firstname" placeholder="e.g. Roger" value={this.state.firstname} />
                            <label>Lastname</label>
                            <input type="text" name="lastname" placeholder="e.g. Waters" value={this.state.lastname} />
                            <label>Phone Number</label>
                            <input type="text" name="phone_number" placeholder="076420420" value={this.state.phone_number} />
                            <label>Birthdate</label>
                            <input type="text" name="birth_date" placeholder="YYYY-MM-DD" value={this.state.birth_date} />
                            <label>Parent Name</label>
                            <input type="text" name="parent_name" placeholder="e.g. Roger" value={this.state.parent_name} />
                            <label>Parent Lastname</label>
                            <input type="text" name="parent_lastname" placeholder="e.g. Waters" value={this.state.parent_lastname} />
                            <label>Parent Phone Number</label>
                            <input type="text" name="parent_phone" placeholder="076420420" value={this.state.parent_phone} />
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Your Password" value={this.state.password} />
                        </div>
                        )
                    }
                    <span>
                        <label>
                            Change Profile Picture
                            <input onChange={(e) => {this.setState({image: e.target.files[0]})}} type="file" name="image" />
                        </label>
                        <button>Submit</button>
                    </span>
                    <h4 className="error">{this.state.error}</h4>
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