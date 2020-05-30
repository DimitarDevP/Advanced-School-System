import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import {login} from "../../redux/actions/UserActions"
import "./Login.css"

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            submitted: false
        }
    }

    onSubmit = e => {
        e.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.setState({submitted: true})
        this.props.login(user)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
            submitted: false
        })
    }

    componentDidUpdate() {
        if(this.state.submitted){
            if(this.props.currentUser.error_code !== "200" && this.props.currentUser.error_code)
                document.querySelectorAll("#Login > form > .error")[0].style.display = "block"
            else
                document.querySelectorAll("#Login > form > .error")[0].style.display = "none"
                
            if(this.props.currentUser.error_code === "200" && this.props.currentUser.error_code){
                this.props.history.push("/user/" + this.props.currentUser.user.user_id)
        }
    }
    }

    render() {
        return (
            <div id="Login">
                <h2>Login</h2>
                <form onChange={this.handleChange}>
                    <label>Email</label>
                    <input name="email" type="email" value={this.state.email} />
                    <label>Password</label>
                    <input name="password" type="password" value={this.state.password} />
                    <button onClick={this.onSubmit}>Login</button>
                    <h4 className="error">{this.props.currentUser.error_message}</h4>
                    <h6>I forgot my password</h6>
                </form>
        </div>
        )
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (user) => dispatch(login(user))
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))