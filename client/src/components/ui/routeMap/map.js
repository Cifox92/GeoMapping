import React from "react";

import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  Polyline
} from "react-google-maps"

class Map extends React.Component {
  state = {
    points: this.props.markers
  }

  render() {
    return (
      <GoogleMap mapTypeId="satellite" defaultCenter={this.props.defaultCenter} defaultZoom={this.props.defaultZoom}>
        <Polyline
          path={this.state.points}
          geodesic={true}
          options={{
            strokeColor: "#ff2527",
            strokeOpacity: 0.75,
            strokeWeight: 2
          }}
        />
        {this.state.points.map((point, idx) => <Marker key={idx} position={{ lat: point.lat, lng: point.lng }} label={point.name} />)}
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(Map))