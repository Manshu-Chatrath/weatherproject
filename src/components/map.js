import React, { useState,useContext,useEffect } from 'react';
import Nav from './nav';
import LatLongContext from '../contexts/LatLongContext';
import CityContext from '../contexts/CityContext';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import history from './history';
import '../css/map.css'
const MapContainer=()=>{

 const renderMarkers = (map, maps) => {
        
    let marker = new maps.Marker({
        position: { lat: latLongValues.lat,lng: latLongValues.long },
        map
        });
        return marker;
       };

    const {setCity}=useContext(CityContext);   
    const {setLatLongValues,latLongValues}=useContext(LatLongContext);
    let city='';
    const findlatlong=async ()=>{
        const location=await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleapikey}`)
        setLatLongValues({lat: location.data.results[0].geometry.location.lat,long: location.data.results[0].geometry.location.lng})
        setCity(city);
        history.push('/');
    }
    return(
        <div className="container2">
        <div className="location-container2">
            <Nav />
            <div className="input">
                <div className="locationinput">
                <label className="locationlabel">Enter the location</label><br/>
                <input onChange={(e)=>city=e.target.value} placeholder="Enter your city" /><button onClick={findlatlong} className="locationButton">Change Location</button>
                </div>
            </div>
            <div className="mapContainer">
            <div className="map">
            <GoogleMapReact 
                bootstrapURLKeys={{keys: 'googleapikey'}}
                defaultCenter={{lat: latLongValues.lat,lng: latLongValues.long}}
                defaultZoom={6}
                onGoogleApiLoaded={({map,maps})=>renderMarkers(map,maps)}>
            </GoogleMapReact>
            </div>
            </div>
        </div>
    </div>
    )
}

export default MapContainer;