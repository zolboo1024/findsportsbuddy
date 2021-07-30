//display this map when users go to /sportsMap
//does not need to be logged in to see this
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import mapStyles from './mapStyles';
import axios from 'axios';
import React, { useEffect } from 'react';
var CONFIG = require('./../config.json');

//function that returns the custom map
const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
}
const options = {
    style: mapStyles,
    disableDefaultUI: true
}
const center = {
    lat: 42.058406,
    lng: -88.125363
}
export default function DisplayMap(props) {
    //load the maps
    const libraries = ["places"];
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: CONFIG.JS_MAPS_KEY,
        libraries
    });
    var [markers, setMarker] = React.useState();
    useEffect(() => {
        axios.get(CONFIG.API_URL + '/events/getAll').then(
            (events) => {
                var newMarkers = events.data.map(
                    function (event) {
                        var loc = event.location.split(" ");
                        var curLat = parseFloat(loc[0]);
                        var curLng = parseFloat(loc[1]);
                        return { lat: curLat, lng: curLng };
                    }
                )
                setMarker(newMarkers);
            }
        )
    }, []);
    if (loadError) return "LoadError";
    if (!isLoaded) return "Loading";
    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
                options={options}
            >
                {markers &&
                    markers.map(
                        function (marker) {
                            return <Marker position={{ lat: marker.lat, lng: marker.lng }}></Marker>
                        }
                    )
                }
            </GoogleMap>
        </div>
    );
}