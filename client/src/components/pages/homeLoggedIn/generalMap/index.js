import React from 'react'
import Map from './map'

const googleMapsApiKey = `${process.env.REACT_APP_MAPS_KEYS}`

const GeneralMap = props => {
  const initialPoints = props.routes.map(route => route.points[0].location)
  const waypoints = initialPoints.map(p => ({lat: parseFloat(p.lat), lng: parseFloat(p.lng)}))
  let lat = props.centerLoc.lat, lng = props.centerLoc.lng
 
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
      defaultZoom={defaultZoom || 20}
    />
  )
}

export default GeneralMap