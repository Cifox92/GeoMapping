import React, {Component} from 'react'

import RouteService from './../../../service/RoutesService'

import Spinner from 'react-bootstrap/Spinner'

import MapComp from './MapComp'


class AllRoutes extends Component {
    constructor (props) {
        super (props)
        this.state = {
            routes: undefined
        }
        this.routeService = new RouteService()
        this.places = [
            {latitude: 25.8103146,longitude: -80.1751609},
            {latitude: 27.9947147,longitude: -82.5943645},
            {latitude: 28.4813018,longitude: -81.4387899}
          ]
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
                <MapComp defaultZoom={7} places={this.places} />
                <p>Rutas de todos los usuarios...</p>
                    {!this.state.routes ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : null} 
            </>
        )
    }
}
//CREAR TARJETAS PARA CADA RUTA

export default AllRoutes