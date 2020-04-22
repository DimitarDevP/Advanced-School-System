import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

import {login} from "./redux/actions/UserActions"

import Container from "./Components/Landing/Container"
import Profile from "./Components/Global/Profile"
import Nav from "./Components/Global/Nav"

import "./App.css"

class App extends React.Component {

    verify = () => ( // za ova moram da napram poseben komponent!!!
        <div id="Verify">
            <h1>Email Verification Error</h1>
            <h4>Please check your email and click the provided link to verify your account before you use it.</h4>
            <Link to="/">Back to Login</Link>
        </div>
    )

    render(){
        return (
            <div id="App">
                <Router>
                    <Nav />
                    <Route exact path="/" component={Container} />
                    <Route path="/user/:user_id" component={this.props.currentUser.user.verified ?  Profile : this.verify} />
                </Router>
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
        login: (user) => dispatch(login(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
