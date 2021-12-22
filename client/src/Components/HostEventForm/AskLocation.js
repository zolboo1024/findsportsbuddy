import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import mapStyles from './../mapStyles';
import React from 'react';
import CustomNavbar from '../CustomNavbar';
import 'bulma/css/bulma.min.css';
import './AskLocation.css';
var CONFIG = require('./../../config.json');

//function that returns the custom map
const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
}
const options = {
    styles: mapStyles,
    disableDefaultUI: true
}
const center = {
    lat: 42.058406,
    lng: -88.125363
}
export default function AskLocation(props) {
    //load the maps
    const libraries = ["places"];
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: CONFIG.JS_MAPS_KEY,
        libraries
    });
    const [marker, setMarker] = React.useState();
    if (loadError) return "LoadError";
    if (!isLoaded) return "Loading";
    return (
        <div>
            <CustomNavbar></CustomNavbar>
            <div class="hero is-fullheight-with-navbar">
                <div class="box" id="question">
                    <h1 class="title has-text-black">
                        Where would you like to play?
                    </h1>
                </div>
                {
                    marker &&
                    <div class="box" id="rightarrow">
                        <input
                            type="image"
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