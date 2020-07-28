import React from 'react'
import Map from './map'
import { Link } from 'react-router-dom';

const googleMapsApiKey = `${process.env.REACT_APP_MAPS_KEYS}`

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
    <>
      <Map
        googleMapURL={
          'https://maps.googleapis.com/maps/api/js?key=' +
          googleMapsApiKey +
          '&libraries=geometry,drawing,places'
        }
        markers={waypoints}
        loadingElement={loadingElement || <div style={{height: `100%`}}/>}
        containerElement={containerElement || <div style={{height: "80px"}}/>}
        mapElement={mapElement || <div style={{height: `100%`}}/>}
        defaultCenter={defaultCenter || {lat: lat, lng: lng}}
        defaultZoom={defaultZoom || 11}
      />
      <Link to={`/routeDetails/${props._id}`}>
        
    
      </Link>
    </>
  )
}

export default MapComp