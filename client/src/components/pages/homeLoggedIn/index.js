import React, {Component} from 'react'

import RouteService from './../../../service/RoutesService'

import Spinner from 'react-bootstrap/Spinner'

import MyMapComponent from './map'
import Map from './../routeCard'

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
                <p>Rutas de todos los usuarios...</p>
                    {!this.state.routes ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : <div>{this.state.routes.map(route => <Map {...route} />)}</div>} 
            </>
        )
    }
}
//CREAR TARJETAS PARA CADA RUTA

export default AllRoutes