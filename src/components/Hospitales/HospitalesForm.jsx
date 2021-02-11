import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';

function Map(){
    return (
        <GoogleMap defaultZoom={14} defaultCenter={{lat: -38.7176219, lng: -62.2676738}}/>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export const HospitalesForm = () => {
    return(
        <div style={{width: '40vw', height: '40vw'}}>
            <WrappedMap 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${'AIzaSyBDwnlRCF5uS4vhlSEfG768fVftBJUswt8'}`}
                loadingElement={<div style={{height: "100%"}} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}