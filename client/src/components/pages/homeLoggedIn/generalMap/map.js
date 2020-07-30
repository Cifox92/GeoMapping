import React from "react"

import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps"

import { Link } from 'react-router-dom'

class Map extends React.Component {
  state = {
    points: this.props.markers,
    selectedRoute: null
  }

  setSelectedRoute = point => {
    this.setState({ selectedRoute: point })
  }

  render() {
    return (
      <>
        <GoogleMap mapTypeId="satellite" defaultCenter={this.props.defaultCenter} defaultZoom={this.props.defaultZoom} options={function (maps) { return { mapTypeId: "satellite" } }}>
          {this.state.points.map((point, idx) => <Marker key={idx} position={{ lat: point.lat, lng: point.lng }} onClick={() => this.setSelectedRoute(point)} />)}
        </GoogleMap>

        {this.state.selectedRoute && (<InfoWindow onCloseClick={() => this.setSelectedRoute(null)} position={{ lat: this.state.selectedRoute.lat, lng: this.state.selectedRoute.lng }}>
          <>
            <Link to={`routeDetails/${this.state.selectedRoute.routeId}`}>Route: {this.state.selectedRoute.name}</Link>
          </>
        </InfoWindow>
        )}
      </>
    )
  }
}

export default withScriptjs(withGoogleMap(Map))