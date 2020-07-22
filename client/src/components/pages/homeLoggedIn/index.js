import React, {Component} from 'react'

import RouteService from './../../../service/RoutesService'

import Spinner from 'react-bootstrap/Spinner'

import MapComp from './routeMap/MapComp'
// import GeneralMap from './generalMap'

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
                {/* <GeneralMap /> */}
                
                <p>Rutas de todos los usuarios...</p>
                
                {!this.state.routes ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : this.state.routes.map(route => <MapComp defaultZoom={7} {...route} /> )}
            </>
        )
    }
}
//CREAR TARJETAS PARA CADA RUTA

export default AllRoutes