import React, {Component} from 'react'
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    Marker,
    DirectionsRenderer
  } from "react-google-maps";

class RouteCard extends Component {
    constructor (props) {
        super (props)
        this.state = {
            directions: null,
            error: null
        }
    }

    componentDidMount() {
        const points = this.props.points

        console.log(points)
        const waypoints = []

        points.map(p => (
             console.log(p.location),
             waypoints.push({
            location: { lat: p.location.lat, lng: p.location.lng },
            stopover: true
        })))

        const origin = waypoints.shift().location
        const destination = waypoints.pop().location

        // const directionsService = new google.maps.DirectionsService()
        // directionsService.route(
        //     {
        //         origin: origin,
        //         destination: destination,
        //         travelMode: 'WALKING',
        //         waypoints: waypoints
        //     }, (result, status) => {
        //         if (status === google.maps.DirectionsStatus.OK) {
        //             this.setState({ directions: result })
        //         } else {
        //           this.setState({ error: result });
        //         }
        //     }
        // )
    }

    render() {
        if (this.state.error) {
          return <h1>{this.state.error}</h1>;
        }
        return (this.state.directions && <DirectionsRenderer directions={this.state.directions} />)
      }
}

export default RouteCard