import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from "../../redux/actions/UserActions"


import RegisterStepOne from "./RegisterStepOne"
import RegisterStepTwo from "./RegisterStepTwo"

import "./Register.css"

class Register extends Component {

    constructor(props){
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone_number: "",
            sex: "",
            birth_date: "",
            user_role: "",
            salary: 0,
            parent_name: "",
            parent_lastname: "",
            parent_phone: "",
            stepOneActive: true,
            verified: 0,
            errorForm: "",
            error: ""
        }
    }

    selectStep = (e, role) => {
        e.preventDefault()
        if (role === "back"){
            this.setState(prevState => ({
                stepOneActive: !prevState.stepOneActive
            }))
            return
        } else {
            this.setState(prevState => ({
                user_role: role,
                stepOneActive: !prevState.stepOneActive
            }))
        }
    }

    handleChange = e => {        
        if(this.state.firstname === "")
            this.setState({errorForm: "Firstname must not be blank."})
        else if(this.state.lastname === "")
            this.setState({errorForm: "Lastname must not be blank."})
        else if(this.state.email === "")
            this.setState({errorForm: "Email must not be blank."})
        else if(this.state.password.length < 6)
            this.setState({errorForm: "Please enter a more secure password."})
        else if(this.state.password !== this.state.confirmPassword)
            this.setState({errorForm: "Passwords do not match."})
        else if(this.state.phone_number.length < 9)
            this.setState({errorForm: "Please enter a valid phone number"})
        else if(this.state.sex !== 'male' && this.state.sex !== 'female')
            this.setState({errorForm: "Please enter a valid gender - male or female"})
        else if(this.state.birth_date.length < 10)
            this.setState({errorForm: "Please enter a valid date."})
        else 
            this.setState({errorForm: ""})

        if(this.state.user_role === "Student"){
            if(this.state.parent_name === "")
                this.setState({errorForm: "Parent firstname must not be blank."})
            else if(this.state.parent_lastname === "")
                this.setState({errorForm: "Parent lastname must not be blank."})
            else if(this.state.parent_phone.length < 9)
                this.setState({errorForm: "Please enter a valid parental phone number."})
            else 
                this.setState({errorForm: ""})
            
        } else if (this.state.user_role === "Professor"){
            if(this.state.salary === "") 
                this.setState({errorForm: "Please enter a valid salary."})
            else 
                this.setState({errorForm: ""})
        }

        this.setState({
            [e.target.name] : e.target.value
        })

    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.register(this.state)
    }

    componentDidUpdate() {
        if(this.props.currentUser.error_code !== "200" && this.props.currentUser.error_code)
            document.querySelectorAll("#Register > form > .error")[0].style.display = "block"
        else
            document.querySelectorAll("#Register > form > .error")[0].style.display = "none"

        if(this.props.currentUser.error_code === "200" && this.props.currentUser.error_code){
            document.querySelectorAll("#Register > form > .success")[0].style.display = "block"
        }
    }

    render() {
        return (
            <div id="Register">
                <h2>Register</h2>
                <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                    <h4 className="errorForm">{this.state.errorForm}</h4>
                    {
                    this.state.stepOneActive ? 
                    (<RegisterStepOne selectStep={this.selectStep} user={this.state}/>) : 
                    (<RegisterStepTwo selectStep={this.selectStep} user={this.state} />) 
                    }
                    <h4 className="error">{this.props.currentUser.error_message}</h4>
                    <h4 className="success">Register successful.<br /> Please check your email to verify your account.</h4>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        register: (user) => dispatch(register(user))
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))