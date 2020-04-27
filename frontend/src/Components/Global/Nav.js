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
        props.logout()
    }

    return (
        <div id="Nav" style={display}>
            <img src={"http://localhost:5000/public/user/profile/"+props.currentUser.user.profile_picture} />
            <h3>{props.currentUser.user.firstname + " " + props.currentUser.user.lastname}</h3>
            <div id="NavItems">
                <NavLink to="/home/">HOME</NavLink>
                <NavLink to={"/user/"+props.currentUser.user.user_id}>PROFILE</NavLink>
                <NavLink to={"/assignments/"}>ASSIGNMENTS</NavLink>
                <NavLink to={"/subjects/"}>SUBJECTS</NavLink>
                <NavLink to={"/homeroom/"}>CLASSES</NavLink>
                <NavLink onClick={handleLogout} to={"/"}>LOGOUT</NavLink>
            </div>

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
        logout: () => dispatch(logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfessorNav))