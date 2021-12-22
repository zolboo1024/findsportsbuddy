//display this map when users go to /sportsMap
//does not need to be logged in to see this
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import mapStyles from './mapStyles';
import axios from 'axios';
import React, { useEffect } from 'react';
import CustomNavbar from './CustomNavbar';
var CONFIG = require('./../config.json');

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
export default function DisplayMap(props) {
    //load the maps
    const libraries = ["places"];
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: CONFIG.JS_MAPS_KEY,
        libraries
    });
    var [markers, setMarker] = React.useState();
    const [selected, setSelected] = React.useState();
    useEffect(() => {
        axios.get(CONFIG.API_URL + '/events/getAll').then(
            (events) => {
                var newMarkers = events.data.map(
                    function (event) {
                        var loc = event.location.split(" ");
                        var curLat = parseFloat(loc[0]);
                        var curLng = parseFloat(loc[1]);
                        var starttime = (new Date(event.start_time).toTimeString()).substring(0, 5);
                        var endtime = (new Date(event.end_time).toTimeString()).substring(0, 5);
                        return {
                            lat: curLat,
                            lng: curLng,
                            sportName: event.sport_type,
                            startTime: starttime,
                            endTime: endtime,
                            numParticipants: event.num_participants
                        };
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
            <CustomNavbar></CustomNavbar>
            <div class="is-fullheight-with-navbar">
                <h1 class="title has-text-centered">Join These Activities Near You (or <a href="/hostEvent">Host Your Own One)</a></h1>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={15}
                    center={center}
                    options={options}
                >
                    {markers &&
                        markers.map(
                            function (marker) {
                                return <Marker
                                    position={{ lat: marker.lat, lng: marker.lng }}
                                    icon={{
                                        url: window.location.origin + "/emojis/" + marker.sportName + ".png",
                                        scaledSize: new window.google.maps.Size(30, 30),
                                        origin: new window.google.maps.Point(0, 0),
                                        anchor: new window.google.maps.Point(15, 15)
                                    }}
                                    onClick={() => {
                                        setSelected(marker);
                                    }}
                                ></Marker>
                            }
                        )
                    }
                    {
                        selected && (
                            <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}>
                                <div class="card">
                                    <header class="card-header">
                                        <p class="card-header-title">
                                            {selected.sportName}
                                        </p>
                                    </header>
                                    <div class="card-content">
                                        <p>Starts: {selected.startTime}</p>
                                        <p>Ends: {selected.endTime}</p>
                                        <p># of people: {selected.numParticipants}</p>
                                    </div>
                                </div>
                            </InfoWindow>
                        )
                    }
                </GoogleMap>
            </div>
        </div>
    );
}