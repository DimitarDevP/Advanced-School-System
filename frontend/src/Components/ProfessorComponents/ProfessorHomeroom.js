import React, { Component } from 'react'

export default class ProfessorHomeroom extends Component {

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

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createClass(this.state)
    }

    handleChange = e => {this.setState({[e.target.name]:e.target.value})}

    render() {
        return (
            <div className="HomeroomView">
                <span onClick={this.tollgeCreateClass}>+</span>
                <form onSubmit={this.handleSubmit} className="hidden" onChange={this.handleChange}>
                    <label htmlFor="grade">Grade</label>
                    <input type="text" name="grade" />
                    <label htmlFor="class">Class</label>
                    <input type="text" name="class" />
                    <label htmlFor="year">Year</label>
                    <input type="text" name="year" />
                    <button>Create Class</button>
                </form>
                <br />
                <span className="class">I1</span>
                <span className="class">I2</span>
                <span className="class">I3</span>
                <span className="class">I1</span>
                <span className="class">II2</span>
                <span className="class">II3</span>
                <span className="class">II4</span>
                <span className="class">III1</span>
                <span className="class">III2</span>
                <span className="class">III3</span>
                <span className="class">IV1</span>
                <span className="class">IV2</span>
                <span className="class">IV3</span>
            </div>
        )
    }
}
