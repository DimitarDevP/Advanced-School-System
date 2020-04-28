import React from 'react'

export default function Info(props) {
    return (
        <div id="Info">
            <span>
                <img src={"http://localhost:5000/public/user/profile/" + props.profile_picture} />
            </span>
            <span>
                <h2 onClick={e => props.toggleVisible(e)}>About Me:</h2>
                <span>
                    <h3>Name: </h3>
                    <h3>{props.name}</h3>
                </span>
                <span>
                    <h3>Parent: </h3>
                    <h3>{props.parent_name}</h3>
                </span>
                <span>
                    <h3>Gender</h3>
                    <h3>{props.sex}</h3>
                </span>
                <span>
                    <h3>Birth Date</h3>
                    <h3>{props.birth_date}</h3> {/*substring(5,16)*/}
                </span>
                <span>
                    <h3>E-Mail</h3>
                    <h3>{props.email}</h3>
                </span>
                <span>
                    <h3>Phone Number: </h3>
                    <h3>{props.phone_number}</h3>
                </span>
                <span>
                    <h3>Parent Phone Number: </h3>
                    <h3>{props.parent_phone}</h3>
                </span>
            </span>
        </div>
    )
}
