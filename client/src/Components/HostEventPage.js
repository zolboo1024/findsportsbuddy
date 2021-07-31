//React page to host a sporting event
//Zolboo
import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import authService from '../auth/authService';
import authHeader from '../auth/authHeader';
import axios from 'axios';
import Map from './Map';
import AskSport from './HostEventForm/AskSport';
var CONFIG = require('./../config.json');

class HostEventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            userId: '',
            sport: '',
            location: '',
            start_time: '',
            end_time: '',
            num_participants: '',
            description: '',
            errorMessage: '',
            returnMessage: '',
            step: 1
        };
        this.handleSport = this.handleSport.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleStartTime = this.handleStartTime.bind(this);
        this.handleEndTime = this.handleEndTime.bind(this);
        this.handleNumParticipants = this.handleNumParticipants.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleErrorMessage = this.handleErrorMessage.bind(this);
        this.handleReturnMessage = this.handleReturnMessage.bind(this);
        this.checkInputs = this.checkInputs.bind(this);
    }

    //first check if the user is logged in
    //if not, we cannot show this page
    componentWillMount() {
        var user = authService.getCurrentUser();
        //if it returns the token
        if (user["accessToken"]) {
            var id = user["id"];
            this.setState({
                loggedIn: true,
                userId: id
            });
        }
        else {
            //if not logged in, redirect to the login page
            this.props.history.push("/login");
            window.location.reload();
        }
    }

    handleSport(newSport) {
        this.setState({ sport: newSport });
    }

    handleLocation(lat, lng) {
        this.setState({ location: lat + " " + lng });
    }

    handleStartTime(event) {
        this.setState({ start_time: event.target.value });
    }

    handleEndTime(event) {
        this.setState({ end_time: event.target.value });
    }

    handleNumParticipants(event) {
        this.setState({ num_participants: event.target.value });
    }

    handleDescription(event) {
        this.setState({ description: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        //if the form is completely filled out
        if (this.checkInputs()) {
            //make backend req to create the event in the DB.
            //the second parameter is the body
            axios.post(CONFIG.API_URL + "/events/create", {
                "sport": this.state.sport,
                "location": this.state.location,
                "start_time": this.state.start_time,
                "end_time": this.state.end_time,
                "participants": this.state.userId,
                "num_participants": this.state.num_participants,
                "description": this.state.description
            }, {
                headers: authHeader()
            }).then(
                () => {
                    //right now, go to the front page
                    this.handleReturnMessage("Event successfully created!");
                    this.props.history.push("/");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.handleReturnMesage(resMessage);
                }
            );
        }
    }

    //check if form is filled out.
    //returns true only if everything is filled out
    checkInputs() {
        if (this.state.sport === '') {
            this.handleErrorMessage("Please tell us what sport you are playing to find a match");
            return false;
        }
        else if (this.state.location === '') {
            this.handleErrorMessage("Please tell us where you are playing to find a match");
            return false;
        }
        else if (this.state.start_time === '') {
            this.handleErrorMessage("Please tell us when you are playing to find a match");
            return false;
        }
        else if (this.state.end_time === '') {
            this.handleErrorMessage("Please tell us when you are playing to find a match");
            return false;
        }
        else if (this.state.num_participants === '') {
            this.handleErrorMessage("Please tell us how many participants will be there to find a match");
            return false;
        }
        return true;
    }
    //any errors that may arise during submission
    handleErrorMessage(message) {
        this.setState({ errorMessage: message });
    }

    //display message that was returned after the submission
    handleReturnMessage(message) {
        this.setState({ returnMessage: message });
    }

    render() {
        return (
            <div className="HostEvent">
                {
                    this.state.step == 1 &&
                    <AskSport onSportChange={this.handleSport} key="1"></AskSport>
                }
            </div>
        );
    }
}

export default HostEventPage;
