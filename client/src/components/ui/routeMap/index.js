import React from 'react'
import Map from './map'
import { Link } from 'react-router-dom';

const googleMapsApiKey = `${process.env.REACT_APP_MAPS_KEYS}`

const MapComp = props => {
  const places = props.points.map(p => ({lat: parseFloat(p.location.lat), lng: parseFloat(p.location.lng), name: p.name}))
  let centerRoute = Math.ceil(places.length / 2) - 1
  let lat = places[centerRoute].lat, lng = places[centerRoute].lng

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
        markers={places}
        loadingElement={loadingElement || <div style={{height: `100%`}}/>}
        containerElement={containerElement || <div style={{height: "600px"}}/>}
        mapElement={mapElement || <div style={{height: `100%`}}/>}
        defaultCenter={defaultCenter || {lat: lat, lng: lng}}
        defaultZoom={defaultZoom || 20}
      />
      <Link to={`/routeDetails/${props._id}`}>
        
    
      </Link>
    </>
  )
}

export default MapComp