import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import './LandingSearchPage.css';
import CustomNavbar from './CustomNavbar';
import axios from 'axios';
var CONFIG = require('./../config.json');
class LandingSearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zipcode: ''
        }
        this.handleZipcodeChange = this.handleZipcodeChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    handleZipcodeChange(event) {
        this.setState({ zipcode: event.target.value });
        console.log(event.target.value);
    }

    submitSearch() {
        var lat = '';
        var lng = '';
        var curzip = this.state.zipcode;
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?key=" + CONFIG.JS_MAPS_KEY + "&components=postal_code:" + curzip).then(
            (events) => {
                console.log(events);
                //this.changePage("/sportsMap?lat"=)
            }
        )
    }

    changePage(newUrl) {
        this.props.history.push(newUrl);
        window.location.reload();
    }
    componentWillMount() {
    }
    render() {
        return (
            <div className="landingSearchPage">
                <CustomNavbar />
                <section class="hero is-info is-fullheight-with-navbar has-bg-img">
                    <div class="hero-body">
                        <div class="container has-text-centered">
                            <div class="column is-6 is-offset-3">
                                <div class="box">
                                    <h1 class="title has-text-black">
                                        Sports
                                    </h1>
                                    <h2 class="subtitle has-text-black">
                                        Find a partner for your activities
                                </h2>
                                </div>
                                <div class="box is-rounded">
                                    Enter your location to find nearby partners
                                    <div class="field is-grouped">
                                        <p class="control is-expanded">
                                            <input class="input is-rounded" type="text" placeholder="99999" onChange={this.handleZipcodeChange}>
                                            </input>
                                        </p>
                                        <p class="control">
                                            <a class="button is-info is-rounded is-link"
                                                onClick={this.submitSearch}>
                                                Search
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default LandingSearchPage;
