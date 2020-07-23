import React from 'react'
import Map from './map'

const googleMapsApiKey = "AIzaSyDq34sAhjDIRsBySpw92CgvTmo8mW8Mwt8";

const MapComp = props => {
  const places = props.points.map(p => p.location)
  let waypoints = places.map(p => ({lat: parseFloat(p.lat), lng: parseFloat(p.lng)}))
  let centerRoute = Math.ceil(waypoints.length / 2) - 1
  let lat = waypoints[centerRoute].lat, lng = waypoints[centerRoute].lng

  const {
    loadingElement,
    containerElement,
    mapElement,
    defaultCenter,
    defaultZoom
  } = props

  return (
    <Map
      googleMapURL={
        'https://maps.googleapis.com/maps/api/js?key=' +
        googleMapsApiKey +
        '&libraries=geometry,drawing,places'
      }
      markers={waypoints}
      loadingElement={loadingElement || <div style={{height: `100%`}}/>}
      containerElement={containerElement || <div style={{height: "80vh"}}/>}
      mapElement={mapElement || <div style={{height: `100%`}}/>}
      defaultCenter={defaultCenter || {lat: lat, lng: lng}}
      defaultZoom={defaultZoom || 11}
    />
  )
}

export default MapComp