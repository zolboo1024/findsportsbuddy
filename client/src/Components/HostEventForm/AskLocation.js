//The form of the hostEvent page that asks for the users location
//Author: Zolboo Erdenebaatar

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import mapStyles from './../mapStyles';
import React, { useEffect, useState } from 'react';
import CustomNavbar from '../CustomNavbar';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'bulma/css/bulma.min.css';
import './AskLocation.css';
import Geocode from "react-geocode";
var CONFIG = require('./../../config.json');
Geocode.setApiKey(CONFIG.PLACES_KEy);
//function that returns the custom map
const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
}
const options = {
    styles: mapStyles,
    disableDefaultUI: true
}
export default function AskLocation(props) {
    const [selected, setSelected] = useState(null);
    const [center, setCenter] = useState({ lat: 38.8977, lng: 77.0365 })
    //load the maps
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: CONFIG.JS_MAPS_KEY
    });
    const [marker, setMarker] = React.useState();
    useEffect(() => {
        const savedLocation = localStorage.getItem("selectedLocation");
        const split = savedLocation.split(' ')
        setCenter({
            lat: parseFloat(split[0]),
            lng: parseFloat(split[1])
        })
    }, []);
    function handleAddressChange(event) {
        const address = event.value.description;
        // Get latitude & longitude from address.
        Geocode.fromAddress(address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                const selectedLocation = lat + " " + lng
                localStorage.setItem("selectedLocation", selectedLocation);
                setSelected({
                    lat: parseFloat(lat),
                    lng: parseFloat(lng)
                })
            },
            (error) => {
                console.error(error);
            }
        );
    }
    if (loadError) return "LoadError";
    if (!isLoaded) return "Loading";
    return (
        <div>
            <CustomNavbar></CustomNavbar>
            <div className="hero is-fullheight-with-navbar">
                <div className="box has-text-black" id="question">
                    <h1 className="title has-text-black">
                        Where would you like to play? (Drop a pin)
                    </h1>
                    <h3>
                        Search for a specific location:
                    </h3>
                    <GooglePlacesAutocomplete
                        apiKey={CONFIG.PLACES_KEy}
                        selectProps={{
                            selected,
                            onChange: handleAddressChange,
                        }}
                    />

                </div>
                {
                    marker &&
                    <div className="box" id="rightarrow">
                        <input
                            type="image"
                            alt="right arrow"
                            src={window.location.origin + "/svgs/rightarrow.svg"}
                            onClick={props.nextStep}>
                        </input>
                    </div>
                }
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={15}
                    center={center}
                    options={options}
                    onClick={
                        (event) => {
                            setMarker({
                                lat: event.latLng.lat(),
                                lng: event.latLng.lng()
                            });
                            //save the location into the parent's state
                            props.handleLocation(event.latLng.lat(), event.latLng.lng());
                        }
                    }
                >
                    {marker &&
                        <Marker position={{ lat: marker.lat, lng: marker.lng }}></Marker>
                    }
                </GoogleMap>
            </div>
        </div>
    );
}