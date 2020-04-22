import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions/UserActions'
import {NavLink, useLocation, withRouter} from 'react-router-dom'

import "./Nav.css"

function ProfessorNav(props) {

    let location = useLocation()
    let display = {}
    if(location.pathname === "/")
        display = {display: "none"}
    else
        display = {}

    const handleLogout = () => {
        console.log(props.currentUser.auth_key)
        props.logout(props.currentUser.auth_key)
    }

    return (
        <div id="Nav" style={display}>
            <img src="https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png" />
            <h3>{props.currentUser.user.firstname + " " + props.currentUser.user.lastname}</h3>
            {props.currentUser.user.user_role === "Professor" ? (<div id="NavItems">
            <NavLink to="/home/">HOME</NavLink>
            <NavLink to={"/user/"+props.currentUser.user.user_id}>PROFILE</NavLink>
            <NavLink to={"/openedAssignments/"+props.currentUser.user.user_id}>ASSIGNMENTS</NavLink>
            <NavLink to={"/openedSubjects/"+props.currentUser.user.user_id}>SUBJECTS</NavLink>
            <NavLink to={"/homeroom/"+props.currentUser.user.user_id}>HOMEROOM</NavLink>
            <NavLink onClick={handleLogout} to={"/"}>LOGOUT</NavLink>
        </div>) : (<div id="NavItems">
            <NavLink to="/home/">HOME</NavLink>
            <NavLink to={"/user/"+props.currentUser.user.user_id}>PROFILE</NavLink>
            <NavLink to={"/submittedAssignments/"+props.currentUser.user.user_id}>ASSIGNMENTS</NavLink>
            <NavLink to={"/enrolledSubjects/"+props.currentUser.user.user_id}>SUBJECTS</NavLink>
            <NavLink to={"/abscences/"+props.currentUser.user.user_id}>ABSCENCES</NavLink>
            <NavLink onClick={handleLogout} to={"/"}>LOGOUT</NavLink>
        </div>)}
        <div id="toggle">
            <div></div>
            <div></div>
            <div></div>
        </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: (auth_key) => dispatch(logout(auth_key))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfessorNav))