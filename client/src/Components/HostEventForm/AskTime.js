//Zolboo
//third step in the multi page form
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
                    <div class="modal is-active">
                        <div class="modal-background"></div>
                        <div class="modal-content">
                            {this.props.returnMessage}
                        </div>
                        <button class="modal-close is-large"
                            aria-label="close" onClick={this.props.redirectToMaps}>
                        </button>
                    </div>
                }
                <h1 class="title has-text-centered">Tell us a little more</h1>
                <div class="box pb-6" id="outerbox">
                    {this.state.error &&
                        <div class="notification is-danger">
                            {this.state.error}
                        </div>
                    }
                    <h1 class="title is-4 has-text-centered">When do you plan to play?</h1>
                    <h2 class="subtitle has-text-centered">From</h2>
                    <div class="box" id="outerbox">
                        <DateTimePicker
                            id="timepicker"
                            value={this.state.startTime}
                            onChange={this.handleStartTime}>
                        </DateTimePicker>
                    </div>
                    <h2 class="subtitle has-text-centered">To</h2>
                    <div class="box" id="outerbox">
                        <DateTimePicker
                            id="timepicker"
                            value={this.state.endTime}
                            onChange={this.handleEndTime}>
                        </DateTimePicker>
                    </div>
                </div>
                <div class="box" id="outerbox">
                    {this.state.error &&
                        <div class="notification is-danger">
                            {this.state.error}
                        </div>
                    }
                    <h1 class="title is-4 has-text-centered">How many people will be there?</h1>
                    <div class="select" onChange={this.handleNumParticipants}>
                        <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5+</option>
                        </select>
                    </div>
                </div>
                {!this.state.error &&
                    <button
                        class="button is-success is-rounded m-4"
                        id="submitbutton"
                        onClick={this.props.handleSubmit}>
                        Submit
                    </button>
                }
            </div>
        )
    }
}

export default AskSport;