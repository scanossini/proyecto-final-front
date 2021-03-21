import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

const Map = (props) => {
    const [marker, setMarker] = useState("")

    const handleClick = (event) => {
        var position = event.latLng
        setMarker({lat: position.lat(), lng: position.lng()})
    }

    return (
        <GoogleMap 
            defaultZoom={14}
            defaultCenter={{lat: -38.71883, lng: -62.2670513}}
            onClick={event => handleClick(event)}
        >
            { marker ? <Marker position={{lat: marker.lat, lng: marker.lng}} /> : null }
        </GoogleMap>
    )
}

export default withScriptjs(
    withGoogleMap(
        Map
    )
)