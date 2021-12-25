//display this map when users go to /sportsMap
//does not need to be logged in to see this
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyles from './mapStyles';
import axios from 'axios';
import React, { useEffect } from 'react';
import CustomNavbar from './CustomNavbar';
import './DisplayMap.css';
var CONFIG = require('./../config.json');

const libraries = ["places"];
//function that returns the custom map
const mapContainerStyle = {
    width: "66vw",
    height: "80vh"
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true
}
export default function DisplayMap(props) {
    //load the maps
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: CONFIG.JS_MAPS_KEY,
        libraries
    });
    var [markers, setMarker] = React.useState();
    const [selected, setSelected] = React.useState();
    const params = new URLSearchParams(props.location.search);
    var center = { lat: 38.8977, lng: 77.0365 }
    if (localStorage.getItem("selectedLocation")) {
        const savedLocation = localStorage.getItem("selectedLocation");
        const split = savedLocation.split(' ')
        center = {
            lat: parseFloat(split[0]),
            lng: parseFloat(split[1])
        }
    }
    if (params.get("lat")) {
        center = {
            lat: parseFloat(params.get("lat")),
            lng: parseFloat(params.get("lng"))
        }
    }
    useEffect(() => {
        axios.get(CONFIG.API_URL + '/events/getAll').then(
            (events) => {
                var newMarkers = events.data.filter(
                    function (event) {
                        const eventTime = new Date(event.start_time).getTime();
                        if (eventTime <= Date.now()) {
                            return false;
                        }
                        function deg2rad(deg) {
                            return deg * (Math.PI / 180)
                        }
                        var loc = event.location.split(" ");
                        const lat1 = center.lat;
                        const lon1 = center.lng;
                        const lat2 = parseFloat(loc[0]);
                        const lon2 = parseFloat(loc[1]);
                        var R = 6371; // Radius of the earth in km
                        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
                        var dLon = deg2rad(lon2 - lon1);
                        var a =
                            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2)
                            ;
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        var d = R * c; // Distance in km
                        console.log(d);
                        if (d > 5) {
                            return false;
                        }
                        return true;
                    }
                ).map(
                    function (event) {
                        var loc = event.location.split(" ");
                        var curLat = parseFloat(loc[0]);
                        var curLng = parseFloat(loc[1]);
                        var starttime = (new Date(event.start_time).toTimeString()).substring(0, 5);
                        var endtime = (new Date(event.end_time).toTimeString()).substring(0, 5);
                        return {
                            id: event.id,
                            lat: curLat,
                            lng: curLng,
                            sportName: event.sport_type,
                            startTime: starttime,
                            endTime: endtime,
                            numParticipants: event.num_participants
                        };
                    }
                );
                setMarker(newMarkers);
            }
        )
    }, []);
    if (loadError) return "LoadError";
    if (!isLoaded) return "Loading";
    console.log(localStorage.getItem("selectedLocation"))
    return (
        <div>
            <CustomNavbar></CustomNavbar>
            <div className="is-fullheight-with-navbar">
                <h1 className="title has-text-centered">Join These Activities Near You (or <a href="/hostEvent">Host Your Own One)</a></h1>
                <h2 className="title has-text-centered">Click on the emoji for more information</h2>
                <div className="columns">
                    <div className="column is-one-third">

                    </div>
                    <div className="column">
                        <div className="container container-extra">
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
                                                onClick={() => {
                                                    console.log(marker)
                                                    setSelected(marker);
                                                }}
                                                icon={{
                                                    url: "/emojis/" + marker.sportName + ".png",
                                                    scaledSize: new window.google.maps.Size(30, 30),
                                                    origin: new window.google.maps.Point(0, 0),
                                                    anchor: new window.google.maps.Point(15, 15)
                                                }}
                                                key={marker.id}
                                            ></Marker>
                                        }
                                    )
                                }
                                {
                                    selected && (
                                        <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}>
                                            <div className="card">
                                                <header className="card-header">
                                                    <p className="card-header-title">
                                                        {selected.sportName}
                                                    </p>
                                                </header>
                                                <div className="card-content">
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
                </div>
            </div>
        </div>
    );
}