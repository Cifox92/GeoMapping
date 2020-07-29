/* global google*/
import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";

class Map extends React.Component {
  state = {
    points: this.props.markers
  }
  render() {
    return (
      <GoogleMap  mapTypeId= "satellite" defaultCenter={this.props.defaultCenter} defaultZoom={this.props.defaultZoom} options={function (maps) { return { mapTypeId: "satellite" } }}>
        {this.state.points.map(point => <Marker position={{lat: point.lat, lng: point.lng}}/>)}
      </GoogleMap>
    )  
  }
}

export default withScriptjs(withGoogleMap(Map))