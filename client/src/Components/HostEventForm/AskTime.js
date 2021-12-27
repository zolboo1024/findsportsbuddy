//third step in the multi page form that asks user when they would like to play
//and how many players there are
//Author: Zolboo Erdenebaatar

import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import CustomNavbar from '../CustomNavbar';
import DateTimePicker from 'react-datetime-picker';
import './AskTime.css'
class AskSport extends Component {
    constructor(props) {
        super(props);
        //the earlies you can start is 30 minutes from now
        //and the earliest you can end is 30 minutes after you start
        var timeNow = new Date().getTime();
        this.state = {
            minStartingTime: timeNow + (30 * 60 * 1000),
            startTime: new Date(timeNow + (30 * 60 * 1000)),
            minEndingTime: timeNow + (60 * 60 * 1000),
            endTime: new Date(timeNow + (60 * 60 * 1000)),
            numPeople: 3,
            error: ''
        }
        this.handleStartTime = this.handleStartTime.bind(this);
        this.handleEndTime = this.handleEndTime.bind(this);
        this.handleNumParticipants = this.handleNumParticipants.bind(this);
        this.props.handleStartTime(this.state.startTime);
        this.props.handleEndTime(this.state.endTime);
    }
    //toggle the selection
    handleStartTime(curStartTime) {
        //if the time cannot be chosen
        if (curStartTime.getTime() < this.state.minStartingTime) {
            this.setState({ error: "Sorry! Events can only start 30 minutes from now as the soonest" });
        }
        else {
            var newEndTime = new Date(curStartTime.getTime() + 30 * 60 * 1000);
            this.setState({ startTime: curStartTime, endTime: newEndTime, error: '' });
            this.props.handleStartTime(curStartTime);
            this.props.handleEndTime(newEndTime);
        }
    }
    handleEndTime(curEndTime) {
        //if the time cannot be chosen
        if (curEndTime.getTime() <= this.state.startTime) {
            this.setState({ error: "Sorry! You cannot end it before it starts!" });
        }
        else {
            this.setState({ endTime: curEndTime, error: '' });
            this.props.handleEndTime(curEndTime);
        }
    }
    handleNumParticipants(newNumber) {
        this.setState({ numPeople: newNumber.target.value });
        this.props.handleNumParticipants(newNumber);
    }
    render() {
        //render the datetime picker
        return (
            <div>
                <CustomNavbar></CustomNavbar>
                {
                    this.props.returnMessage &&
                    <div>
                        <div className="modal is-active">
                            <div className="modal-background"></div>
                            <div className="modal-card">
                                <header className="modal-card-head">
                                    <p className="modal-card-title">{this.props.returnMessage}</p>
                                    <button className="delete" aria-label="close" onClick={this.props.redirectToMaps}></button>
                                </header>
                                <section className="modal-card-body">
                                    Your event is now visible to other users
                                </section>
                                <footer className="modal-card-foot">
                                    <button className="button is-success" onClick={this.props.redirectToMaps}>Go back</button>
                                </footer>
                            </div>
                        </div>
                    </div>
                }
                <h1 className="title has-text-centered">Tell us a little more</h1>
                <div className="box pb-6" id="outerbox">
                    {this.state.error &&
                        <div className="notification is-danger">
                            {this.state.error}
                        </div>
                    }
                    <h1 className="title is-4 has-text-centered">When do you plan to play?</h1>
                    <h2 className="subtitle has-text-centered">From</h2>
                    <div className="box innerbox">
                        <DateTimePicker
                            id="timepicker"
                            value={this.state.startTime}
                            onChange={this.handleStartTime}>
                        </DateTimePicker>
                    </div>
                    <h2 className="subtitle has-text-centered">To</h2>
                    <div className="box innerbox">
                        <DateTimePicker
                            id="timepicker"
                            value={this.state.endTime}
                            onChange={this.handleEndTime}>
                        </DateTimePicker>
                    </div>
                </div>
                <div className="box" id="outerbox">
                    {this.state.error &&
                        <div className="notification is-danger">
                            {this.state.error}
                        </div>
                    }
                    <h1 className="title is-4 has-text-centered">How many people will be there?</h1>
                    <div id="outerSelect">
                        <div className="select" onChange={this.handleNumParticipants}>
                            <select className="innerSelect">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5+</option>
                            </select>
                        </div>
                    </div>
                </div>
                {!this.state.error &&
                    <div className="center_stuff">
                        <button
                            className="button is-success is-rounded m-4"
                            id="submitbutton"
                            onClick={this.props.handleSubmit}>
                            Submit
                        </button>
                    </div>
                }
            </div>
        )
    }
}

export default AskSport;