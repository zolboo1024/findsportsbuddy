import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import mapStyles from './../mapStyles';
import React from 'react';
import CustomNavbar from '../CustomNavbar';
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
export default function Map(props) {
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
            <div class="is-fullheight-with-navbar">
                <h1 class="title has-text-centered">Where do you plan to play?</h1>
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