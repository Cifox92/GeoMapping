import React, { Component } from 'react'
import RouteService from './../../../service/RoutesService'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import MapComp from './../../ui/routeMap'

class MyRoutes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: props.loggedInUser._id,
            routes: undefined
        }
        this.routeService = new RouteService()
    }

    componentDidMount = () => this.updateRouteList()

    updateRouteList = () => {
        this.routeService
            .getMyRoutes(this.state.userId)
            .then(response => this.setState({ routes: response.data }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
            {!this.state.routes ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner>
                :
                this.state.routes.map(route =>

                    <Card
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

                    </Card>

                )}
        </>
        )
    }
}
//CREAR TARJETAS PARA CADA RUTA

export default MyRoutes