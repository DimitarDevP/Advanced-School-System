import React, { Component } from 'react'
import {connect} from 'react-redux'

import { createClass } from "../../redux/actions/ClassActions"

import ProfessorHomeroom from "../ProfessorComponents/ProfessorHomeroom"

import "./Homeroom.css"

class Homeroom extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div id="Homeroom">
                <ProfessorHomeroom createClass={this.props.createClass} getAllClasses={this.props.getAllClasses} />
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
        createClass: (createdClass) => {dispatch(createClass(createdClass))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Homeroom)