import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

import {login} from "./redux/actions/UserActions"

import Nav from "./Components/Global/Nav"
import Profile from "./Components/Containers/Profile"
import Container from "./Components/Landing/Container"
import Homeroom from "./Components/Containers/Homeroom"
import Class from "./Components/Containers/Class"
import Student from "./Components/StudentComponents/Student"
import Subjects from "./Components/ProfessorComponents/Subjects"
import SubjectClasses from "./Components/ProfessorComponents/SubjectsClasses"
import "./App.css"

class App extends React.Component {

    // za ova moram da napram poseben komponent __reminder__ start 0
    verify = () => ( 
        <div id="Verify">
            <h1>Email Verification Error</h1>
            <h4>Please check your email and click the provided link to verify your account before you use it.</h4>
            <Link to="/">Back to Login</Link>
        </div>
    )
    // za ova moram da napram poseben komponent __reminder__ end 0

    render(){
        return (
            <div id="App">
                <Router>
                    <Nav />
                    <Route exact path="/" component={Container} />
                    <Route path="/user/:user_id" component={this.props.currentUser.user.verified ?  Profile : this.verify} />
                    <Route path="/class/:class_id" component={Class}/>
                    <Route path="/student/:user_id" component={Student} />
                    <Route path="/assignments/" />
                    <Route path="/subjects/" component={Subjects}/>
                    <Route path="/subject/:subject_id" component={SubjectClasses}/>
                    <Route path="/homeroom/" component={Homeroom}/>
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
