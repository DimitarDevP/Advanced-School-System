import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'

class Grades extends Component {

    constructor(props) {
        super(props)
            this.state = {
                quarters: [
                    { activity: "", exam: "" },
                    { activity: "", exam: "" },
                    { activity: "", exam: "" },
                    { activity: "", exam: "" },
                ],
                dataIsLoaded: false,
                average: "."
            }
    }

    componentDidMount(){
        Axios.get("http://6a080d6864eb.ngrok.io/api/grades/get_subject_grades?student_id="+this.props.user_id+"&subject_id="+this.props.subject.subject_id)
        .then(response => {
            this.setState({
                quarters: response.data.subject_grades,
                dataIsLoaded: true,
            })
            const average = Math.round(this.calculateAverage(this.state.quarters) * 100) / 100
            this.setState({average})
        })
    }

    calculateAverage = (quarters) => {
        let average = 0
        let div = 0
        for (let i = 0; i < 4; i++){
            if(quarters[i].activity !== ""){
                div+=1
                average+=parseInt(quarters[i].activity)
            }
            if(quarters[i].exam !== ""){
                div+=1
                average+=parseInt(quarters[i].exam)
            }
            
        }

        if (div == 0){
            return 0
        }

        return average / div
    }

    handleChange = e => {
        if(this.props.currentUser.user.user_id === this.props.subject.professor_id && ((e.target.value >= 1 && e.target.value <= 5)) || e.target.value == "" ){
            const copy = Array.from(this.state.quarters)
            copy[parseInt(e.target.className)] = {
                ...copy[parseInt(e.target.className)],
                [e.target.name]: e.target.value
            }
            const average = Math.round(this.calculateAverage(copy) * 100) / 100
            this.setState({
                quarters: copy,
                average
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        if(this.props.currentUser.user.user_id === this.props.subject.professor_id){
            const data = {
                subject_id: this.props.subject.subject_id,
                student_id: this.props.user_id,
                quarters: this.state.quarters
            }
            Axios.post("http://6a080d6864eb.ngrok.io/api/grades/set_grade", data)
            .then(response => {
                this.setState({
                    quarters: response.data.subject_grades,
                    dataIsLoaded: true,
                })
                const average = Math.round(this.calculateAverage(this.state.quarters) * 100) / 100
                this.setState({average})
            })

        }
    }

    render() {
        return (
            <form className="break" onChange={this.handleChange} onSubmit={this.handleSubmit}>
                <span className="quarter">
                    <h4>First Quarter</h4>
                    {this.state.dataIsLoaded ? (<span>
                        <span>
                            <h4>Activity</h4>
                            <input className="0" type="text" value={this.state.quarters[0].activity} name="activity"/>
                        </span>
                        <span>
                            <h4>Exam</h4>
                            <input className="0" type="text" value={this.state.quarters[0].exam} name="exam" />
                        </span>
                    </span>) : ("Loading") }
                </span>
                <span className="quarter">
                    <h4>Second Quarter</h4>
                    {this.state.dataIsLoaded ? (<span>
                        <span>
                            <h4>Activity</h4>
                            <input className="1" type="text" value={this.state.quarters[1].activity} name="activity"/>
                        </span>
                        <span>
                            <h4>Exam</h4>
                            <input className="1" type="text" value={this.state.quarters[1].exam} name="exam" />
                        </span>
                    </span>) : ("Loading") }
                </span>
                <span className="quarter">
                    <h4>Third Quarter</h4>
                    {this.state.dataIsLoaded ? (<span>
                        <span>
                            <h4>Activity</h4>
                            <input className="2" type="text" value={this.state.quarters[2].activity} name="activity"/>
                        </span>
                        <span>
                            <h4>Exam</h4>
                            <input className="2" type="text" value={this.state.quarters[2].exam} name="exam" />
                        </span>
                    </span>) : ("Loading") }
                </span>
                <span className="quarter">
                    <h4>Fourth Quarter</h4>
                    {this.state.dataIsLoaded ? (<span>
                        <span>
                            <h4>Activity</h4>
                            <input className="3" type="text" value={this.state.quarters[3].activity} name="activity"/>
                        </span>
                        <span>
                            <h4>Exam</h4>
                            <input className="3" type="text" value={this.state.quarters[3].exam} name="exam" />
                        </span>
                    </span>) : ("Loading") }
                </span>
                <span className="quarter">
                    <h4>Final Grade</h4>
                    <h3>{this.state.average}</h3>
                    <button>Commit Changes</button>
                </span>
            </form>
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
        // dispatch1: () => {
        //     dispatch(actionCreator)
        // }
    }
}

export default connect(mapStateToProps)(Grades)