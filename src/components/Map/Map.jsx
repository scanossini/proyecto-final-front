import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

const Map = (props) => {
    const defaultCenter = {lat: -38.71883, lng: -62.2670513}

    return (
        <GoogleMap 
            defaultZoom={14}
            onClick={props.onInput}
            center={props.marker ? props.marker : defaultCenter}
        >
            { props.marker ? <Marker position={{lat: props.marker.lat, lng: props.marker.lng}} /> : null }
        </GoogleMap>
    )
}

export default withScriptjs(
    withGoogleMap(
        Map
    )
)