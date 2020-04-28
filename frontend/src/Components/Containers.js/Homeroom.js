import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { createClass, getMyClasses, joinClass } from "../../redux/actions/ClassActions"

import "./Homeroom.css"

class Homeroom extends Component {

    constructor(props){
        super(props)
        this.state = {
            grade: "",
            class: "",
            year: ""
        }
    }

    tollgeCreateClass = () => {
        document.querySelectorAll(".HomeroomView > form")[0].classList.toggle("hidden")
    }

    componentDidMount() {
        this.props.getMyClasses()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.props.currentUser.user.user_role === "Professor")
            this.props.createClass(this.state)
        else
            this.props.joinClass(this.state)

        this.props.getMyClasses()
    }

    handleChange = e => {this.setState({[e.target.name]:e.target.value})}


    render() {
        const myClasses = this.props.classes.currentUserClasses.map(_class => {
            if(_class !== null)
                return (
                    <NavLink className="class" to={"/class/"+_class.class_id}>
                        <h2>{_class.grade}</h2>
                        <h5>{_class.class}</h5>
                        <h6>{_class._year}</h6>
                    </NavLink>
                )    
        })

        return (
            <div id="Homeroom" className="container showing">
                <div className="HomeroomView" >
                <span onClick={this.tollgeCreateClass}>+</span>
                <form onSubmit={this.handleSubmit} className="hidden" onChange={this.handleChange}>
                    <label htmlFor="grade">Grade</label>
                    <input type="text" name="grade" />
                    <label htmlFor="class">Class</label>
                    <input type="text" name="class" />
                    <label htmlFor="year">Year</label>
                    <input type="text" name="year" />
                    <button>{this.props.currentUser.user.user_role === "Professor" ? "Create Class" : "Join Class"}</button>
                </form>
                <br />
                {myClasses}
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.currentUser,
        classes: state.classes
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createClass: (createdClass) => {dispatch(createClass(createdClass))},
        getMyClasses: () => (dispatch(getMyClasses())),
        joinClass: (classData) => (dispatch(joinClass(classData)))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Homeroom)