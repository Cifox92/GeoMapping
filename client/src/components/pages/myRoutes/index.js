import React, { Component } from 'react'
import RouteService from './../../../service/RoutesService'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
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
            .then(response => {
                let routesFiltered = []
                response.data.filter(route => route.points.length > 0 ? routesFiltered.push(route) : null)
                this.setState({ routes: routesFiltered })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container>
                <h2 className='innerTitle'>Your Routes</h2>
                <Row>
                    {!this.state.routes ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : this.state.routes.map(route =>
                        <Col className='route' md={4}>
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
        )
    }
}

export default MyRoutes