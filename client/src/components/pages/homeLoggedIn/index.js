import React, { Component } from 'react'
import RouteService from './../../../service/RoutesService'
import Spinner from 'react-bootstrap/Spinner'
import MapComp from './../../ui/routeMap'
import GeneralMap from './generalMap'
import Card from 'react-bootstrap/Card'

class AllRoutes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            routes: undefined,
            location: undefined
        }
        this.routeService = new RouteService()
    }

    componentDidMount = () => {
        this.updateRouteList()
        this.geolocation()
    }

    geolocation() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })
        })
    }

    updateRouteList = () => {
        this.routeService
            .getAllRoutes()
            .then(response => this.setState({ routes: response.data }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                {!this.state.location ?
                    <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> :
                    (
                        <>
                            <h2>HOLA!</h2>
                            {!this.state.routes ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : <GeneralMap defaultZoom={10} routes={this.state.routes} centerLoc={this.state.location} />}

                            <p>Rutas de todos los usuarios...</p>

                            {!this.state.routes ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : this.state.routes.map(route => <Card
                                bg='dark'
                                text='white'
                                style={{ width: '20rem' }}
                                className="mb-3"
                            >
                                <Card.Header>{route.name}</Card.Header>

                                <MapComp className="map" defaultZoom={15} {...route} />

                                <Card.Footer>
                                    <small className="text-muted">{route.description}</small>
                                </Card.Footer>

                            </Card>)}
                        </>
                    )
                }
            </>
        )
    }
}

export default AllRoutes