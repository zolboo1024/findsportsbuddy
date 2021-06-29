//React page to host a sporting event
//Zolboo
import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import authService from '../auth/authService';
import authHeader from '../auth/authHeader';
import axios from 'axios';
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
            errorMessage: ''
        };
        this.handleSport = this.handleSport.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleStartTime = this.handleStartTime.bind(this);
        this.handleEndTime = this.handleEndTime.bind(this);
        this.handleNumParticipants = this.handleNumParticipants.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleErrorMessage = this.handleErrorMessage.bind(this);

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

    handleSport(event) {
        this.setState({ sport: event.target.value });
    }

    handleLocation(event) {
        this.setState({ location: event.target.value });
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
                    alert("event successfully created");
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.handleErrorMessage(resMessage);
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

    render() {
        return (
            <div className="HostEvent">
                <section class="hero is-success is-fullheight">
                    <div class="hero-body">
                        <div class="container has-text-centered">
                            <div class="column is-4 is-offset-4">
                                <h3 class="title has-text-black">Host a game or an activity</h3>
                                <hr class="login-hr" />
                                <p class="subtitle has-text-black">Please provide more information about your event</p>
                                <div class="box">
                                    {this.state.errorMessage &&
                                        <div class="notification is-danger">
                                            {this.state.errorMessage}
                                        </div>
                                    }
                                    <form>
                                        <div class="field">
                                            <div class="control">
                                                <input class="input" type="text" placeholder="What would you like to play? i.e. Basketball" value={this.state.sport} onChange={this.handleSport} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <div class="control">
                                                <input class="input" type="text" placeholder="Where would you like to play? Drop a pin or type the address" value={this.state.location} onChange={this.handleLocation} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <div class="control">
                                                <input class="input" type="text" placeholder="When would you like to start playing?" value={this.state.start_time} onChange={this.handleStartTime} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <div class="control">
                                                <input class="input" type="text" placeholder="Where do you plan to finish?" value={this.state.end_time} onChange={this.handleEndTime} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <div class="control">
                                                <input class="input" type="text" placeholder="How many people will be there, including you?" value={this.state.num_participants} onChange={this.handleNumParticipants} />
                                            </div>
                                        </div>

                                        <div class="field">
                                            <div class="control">
                                                <input class="input" type="text" placeholder="Anything else you'd like to share?" value={this.state.description} onChange={this.handleDescription} />
                                            </div>
                                        </div>
                                        <button class="button is-block is-info is-fullwidth" onClick={this.handleSubmit}>Find a buddy <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                                    </form>
                                </div>
                                <p class="has-text-grey">
                                    <a href="../">Sign Up</a> &nbsp;·&nbsp;
                                        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                                        <a href="../">Need Help?</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default HostEventPage;
