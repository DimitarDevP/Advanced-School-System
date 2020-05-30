import React from 'react'
import {NavLink} from "react-router-dom"

import "./StudentCard.css"

export default function StudentCard(props) {
    return (
        <div className="StudentCard">
            <img src={"http://6a080d6864eb.ngrok.io/public/user/profile/"+props.profile_picture} />
            <NavLink to={"/student/"+props.user_id}>{props.user_id + ". " + props.firstname + " " + props.lastname}</NavLink>
        </div>
    )
}
