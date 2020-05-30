import React from 'react'

import Login from "./Login"
import Register from "./Register"

import "./Container.css"

export default class Container extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            loginSelected: true
        }
    }

    toggleView = (set) => {
        if (set === "login") {
            document.querySelectorAll("#selector > h3")[0].classList.add("selected")
            document.querySelectorAll("#selector > h3")[1].classList.remove("selected")
            this.setState({loginSelected: true})
        }
        else {
            document.querySelectorAll("#selector > h3")[0].classList.remove("selected")
            document.querySelectorAll("#selector > h3")[1].classList.add("selected")
            this.setState({loginSelected: false})
        }
    }

    render() {
        return (
            <div id="Container">
                <div id="selector">
                    <h3 onClick={() => this.toggleView("login")} className="selected">Login</h3>
                    <h3 onClick={() => this.toggleView("register")}>Register</h3>
                </div>
                {this.state.loginSelected ? <Login /> : <Register />}

            </div>
        )
    }
}
