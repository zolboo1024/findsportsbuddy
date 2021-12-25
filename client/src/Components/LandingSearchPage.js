import 'bulma/css/bulma.min.css';
import './LandingSearchPage.css';
import CustomNavbar from './CustomNavbar';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import React, { useState } from 'react';
import Geocode from "react-geocode";
import history from './../history';
var CONFIG = require('./../config.json');

function submitSearch(address) {
    Geocode.setApiKey(CONFIG.PLACES_KEy);
    // Get latitude & longitude from address.
    Geocode.fromAddress(address.value.description).then(
        (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            const selectedLocation = lat + " " + lng
            localStorage.setItem("selectedLocation", selectedLocation);
            // console.log(address.label)
            // console.log(lat + " " + lng)
            changePage('/sportsMap', lat, lng);
        },
        (error) => {
            console.error(error);
        }
    );
}

function changePage(newUrl, lat, lng) {
    history.push(newUrl + "?lat=" + lat + "&lng=" + lng);
    window.location.reload();
}

function searchButton(selected) {
    if (selected) {
        return (
            <a className="button is-info is-rounded is-link"
                onClick={function () { submitSearch(selected) }}>
                Search
            </a>
        )
    }
    else {
        return (
            <a className="button is-info is-rounded is-link" disabled={true}>
                Search
            </a>
        )
    }
}

export default function LandingSearchPage(props) {
    const [selected, setSelected] = useState(null);
    if (!localStorage.getItem("eventCreated")) {
        console.log("saving event cookie")
        localStorage.setItem("eventCreated", "false")
    }
    return (
        <div className="landingSearchPage">
            <CustomNavbar />
            <section className="hero is-info is-fullheight-with-navbar has-bg-img">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="column is-6 is-offset-3">
                            <div className="box">
                                <h1 className="title has-text-black">
                                    Sports
                                </h1>
                                <h2 className="subtitle has-text-black">
                                    Find a partner for your activities
                                </h2>
                            </div>
                            <div className="box is-rounded">
                                Enter your location to find nearby partners
                                <div className="field is-grouped">
                                    <div className="control is-expanded">
                                        <GooglePlacesAutocomplete
                                            className="control is-expanded"
                                            apiKey={CONFIG.PLACES_KEy}
                                            selectProps={{
                                                selected,
                                                onChange: setSelected,
                                            }}
                                        />
                                    </div>
                                    {searchButton(selected)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
