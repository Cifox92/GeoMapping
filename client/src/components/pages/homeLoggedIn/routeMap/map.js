/* global google*/
import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  Polyline
} from "react-google-maps";

class Map extends React.Component {
  state = {
    points: this.props.markers
  }

  render() {
    return (
      <GoogleMap defaultCenter={this.props.defaultCenter} defaultZoom={this.props.defaultZoom}>
        <Polyline
          path={this.state.points}
          geodesic={true}
              options={{
                strokeColor: "#ff2527",
                strokeOpacity: 0.75,
                strokeWeight: 2
              }}
          />
          {this.state.points.map(point => <Marker position={{lat: point.lat, lng: point.lng}}/>)}
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(Map))


























// /* global google*/
// import React from "react";
// import {
//   withGoogleMap,
//   GoogleMap,
//   withScriptjs,
//   Marker,
//   DirectionsRenderer
// } from "react-google-maps";

// class MapDirectionsRenderer extends React.Component {
//   state = {
//     directions: null,
//     error: null
//   };

//   componentDidMount() {
//     const { places, travelMode } = this.props
    
//     const waypoints = places.map(p => ({
//         location: {lat: parseFloat(p.lat), lng: parseFloat(p.lng)},
//         stopover: true
//     }))

//     console.log(waypoints)
//     const origin = waypoints.shift().location
//     const destination = waypoints.pop().location
    
//     const directionsService = new google.maps.DirectionsService();
//     directionsService.route(
//       {
//         origin: origin,
//         destination: destination,
//         travelMode: travelMode,
//         waypoints: waypoints
//       },
//       (result, status) => {
//         if (status === google.maps.DirectionsStatus.OK) {
//           this.setState({
//             directions: result
//           })
//         } else {
//           this.setState({ error: result })
//         }
//       }
//     )
//   }

//   render() {
//     if (this.state.error) {
//       return <h1>{this.state.error}</h1>;
//     }
//     return (this.state.directions && <DirectionsRenderer directions={this.state.directions} />)
//   }
// }

// const Map = withScriptjs(
//   withGoogleMap(props => (
//     <GoogleMap
//       defaultCenter={props.defaultCenter}
//       defaultZoom={props.defaultZoom}
//     >
//       {props.markers.map((marker, index) => {
//         const position = { lat: marker.latitude, lng: marker.longitude }
//         return <Marker key={index} position={position} />
//       })}
//       <MapDirectionsRenderer
//         places={props.markers}
//         travelMode={google.maps.TravelMode.WALKING}
//       />
//     </GoogleMap>
//   ))
// )

// export default Map