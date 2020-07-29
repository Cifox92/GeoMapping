import React from 'react'
import Map from './map'

const googleMapsApiKey = `${process.env.REACT_APP_MAPS_KEYS}`

const GeneralMap = props => {
  const initialPoints = props.routes.map(route => ({lat: parseFloat(route.points[0].location.lat), lng: parseFloat(route.points[0].location.lng), name: route.name, routeId: route._id}))
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
      markers={initialPoints}
      loadingElement={loadingElement || <div style={{height: 'inherit'}}/>}
      containerElement={containerElement || <div style={{height: 'inherit'}}/>}
      mapElement={mapElement || <div style={{height: 'inherit'}}/>}
      defaultCenter={defaultCenter || {lat: lat, lng: lng}}
      defaultZoom={defaultZoom || 20}
    />
  )
}

export default GeneralMap