import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import RouteService from './../../../service/RoutesService'
import Spinner from 'react-bootstrap/Spinner'
import MapComp from './../../ui/routeMap'
import GeneralMap from './generalMap'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

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
            .then(response => {
                let routesFiltered = []
                response.data.filter(route => route.points.length > 0 ? routesFiltered.push(route) : null)
                this.setState({ routes: routesFiltered })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                {!this.state.location ?
                    <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> :
                    <>
                        <h2 className='innerTitle'>Routes around you</h2>

                        <div className='generalMap'>
                            {!this.state.routes ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : <GeneralMap defaultZoom={10} routes={this.state.routes} centerLoc={this.state.location} />}
                        </div>

                        <Container>
                            <h2 className='innerTitle'>Routes of all the users</h2>

                            <Row className='allRoutes'>
                                {!this.state.routes ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : this.state.routes.map((route, idx) =>

                                    <Col key={idx} className='route' md={4}>
                                        <Card bg='dark' text='white' className='routeCard'>
                                            <MapComp defaultZoom={15} {...route} />
                                            <Card.Body>
                                                <Card.Title>{route.name}</Card.Title>
                                                <small>{route.description}</small>
                                                <Link to={`/routeDetails/${route._id}`} className="btn btn-primary btn-block btn-sm">See Details</Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )}
                            </Row>
                        </Container>
                    </>
                }
            </>
        )
    }
}

export default AllRoutes