import React, { Component } from 'react';
import 'bulma/css/bulma.min.css';
import './LandingSearchPage.css';
import CustomNavbar from './CustomNavbar';
class LandingSearchPage extends Component {
    constructor(props) {
        super(props);
    }

    callAPI() {
    }

    componentWillMount() {
    }
    render() {
        return (
            <section class="hero is-info is-fullheight-with-navbar has-bg-img">
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <div class="column is-6 is-offset-3">
                            <div class="box">
                                <h1 class="title has-text-black">
                                    Sports
                                </h1>
                                <h2 class="subtitle has-text-black">
                                    Find a partner for your activities near you
                                </h2>
                            </div>
                            <div class="box is-rounded">
                                <div class="field is-grouped">
                                    <p class="control is-expanded">
                                        <input class="input is-rounded" type="text" placeholder="i.e., badminton">
                                        </input>
                                    </p>
                                    <p class="control">
                                        <a class="button is-info is-rounded is-link">
                                            Search
                                </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default LandingSearchPage;
