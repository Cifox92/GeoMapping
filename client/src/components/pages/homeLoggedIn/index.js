import React, {Component} from 'react'
import RouteService from './../../../service/RoutesService'
import Spinner from 'react-bootstrap/Spinner'
import MyMapComponent from './map'

class AllRoutes extends Component {
    constructor (props) {
        super (props)
        this.state = {
            routes: undefined
        }
        this.routeService = new RouteService()
    }





    componentDidMount = () => this.updateRouteList()

    updateRouteList = () => {
        this.routeService
            .getAllRoutes()
            .then(response => this.setState({routes :response.data}))
            .catch(err => console.log(err))
    }
    
    render () {
        return (
            <>
            <h2>HOLA!</h2>
             
             
            <MyMapComponent
  isMarkerShown
  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>





                {!this.state.routes ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : <ul>{this.state.routes.map(route => <li key={route._id}>{route.name}</li>)}</ul>} 
            </>
        )
    }
}
//CREAR TARJETAS PARA CADA RUTA

export default AllRoutes