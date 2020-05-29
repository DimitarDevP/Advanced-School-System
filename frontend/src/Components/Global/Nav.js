import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/UserActions'
import { clearUserClasses } from '../../redux/actions/ClassActions'
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
        props.clearUserClasses()
    }

    const handleToggle = () => {
        var containers = document.querySelectorAll(".container")
        for(let i = 0; i < containers.length; i++){
            containers[i].classList.toggle("showing")
            containers[i].classList.toggle("hidden")
        }
        document.getElementById("Nav").classList.toggle("hidden")
        document.getElementById("Nav").classList.toggle("showing")
        document.querySelectorAll("#Nav > img")[0].classList.toggle("hidden")
        document.querySelectorAll("#Nav > h3")[0].classList.toggle("hidden")
        document.getElementById("NavItems").classList.toggle("hidden")
        document.getElementById("toggle").classList.toggle("hidden")
    }

    return (
        <div id="Nav" className="showing" style={display}>
            <img src={"http://localhost:5000/public/user/profile/"+props.currentUser.user.profile_picture} />
            <h3>{props.currentUser.user.firstname + " " + props.currentUser.user.lastname}</h3>
            <div id="NavItems">
                <NavLink to="/home/">HOME</NavLink>
                <NavLink to={"/user/"+props.currentUser.user.user_id}>PROFILE</NavLink>
                <NavLink to={"/assignments/"}>ASSIGNMENTS</NavLink>
                {props.currentUser.user.user_role === "Professor" ? <NavLink to={"/subjects/"}>SUBJECTS</NavLink> : ("") }
                <NavLink to={"/homeroom/"}>CLASSES</NavLink>
                <NavLink onClick={handleLogout} to={"/"}>LOGOUT</NavLink>
            </div>

        <div id="toggle" onClick={handleToggle}>
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
        logout: () => dispatch(logout()),
        clearUserClasses: () => dispatch(clearUserClasses())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfessorNav))