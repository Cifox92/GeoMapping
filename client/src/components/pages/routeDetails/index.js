import React, { Component } from 'react'
import RouterService from '../../../service/RoutesService'
import { Container, Row, Col, Spinner, Accordion, Card } from 'react-bootstrap'

import MapComp from './../../ui/routeMap'
import { Link } from 'react-router-dom'
import PieChart from './../../ui/visualData/pieChart'

class RouteDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: props.loggedInUser._id,
            ownerId: undefined,
            routeId: props.match.params.id,
            route: undefined,
            points: [],
            countRocks: {},
            isFinished: false
        }
        this.routeService = new RouterService()

    }

    componentDidMount = () => {
        this.getRouteInfo()
    }

    getRouteInfo = () => {
        this.routeService.getOneRoute(this.state.routeId)
            .then(response => {
                this.setState({ route: response.data, ownerId: response.data.owner })
                response.data.points.map(point => {
                    this.routeService.getOnePoint(point._id)
                        .then(response => {
                            this.setState({ points: this.state.points.concat(response.data) })
                            this.rockTypeCount(response.data)
                        })
                })
            })
            .then(() => setTimeout(() => this.setState({isFinished: true}), 500))
            .catch(err => console.log(err))
    }

    rockTypeCount = point => {
        point.rocks.map(rock => {
            if(rock.rockType === 'Sedimentary') {
              if(!this.state.countRocks.hasOwnProperty('Sedimentary')) {
                  this.state.countRocks.Sedimentary = 1
              } else {
                this.state.countRocks.Sedimentary += 1
              }
            }
            if(rock.rockType === 'Igneous') {
                if(!this.state.countRocks.hasOwnProperty('Igneous')) {
                    this.state.countRocks.Igneous = 1
                } else {
                    this.state.countRocks.Igneous += 1
                }
            }
            if(rock.rockType === 'Metamorphic') {
                if(!this.state.countRocks.hasOwnProperty('Metamorphic')) {
                    this.state.countRocks.Metamorphic = 1
                } else {
                    this.state.countRocks.Metamorphic += 1
                }
            }
        })
    }

    render() {
        return (
            <>
                {!this.state.route ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> :
                    <>
                        <h2 className='innerTitle'>{this.state.route.name}</h2>
                        <Row className='map-data'>
                            <Col md={6}>
                                <div className='detailMap'>
                                    <MapComp defaultZoom={15} {...this.state.route} />
                                </div>
                                
                            </Col>
                            <Col md={6}>
                                <div className='container' style={{ height: '500px' }} >
                                    {!this.state.isFinished ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : <PieChart countRocks={this.state.countRocks} />}
                                </div>
                            </Col>
                        </Row>
                        

                        <h2 className='innerTitle'>Points of the route</h2>
                        <Container>
                            <Accordion>
                            {this.state.points.map((point, idx) =>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey={`${idx}`}>
                                        <h4>Point: {point.name}</h4>
                                        <small>Lat: {point.location.lat} | Lng: {point.location.lng}</small>
                                    </Accordion.Toggle>

                                    <Accordion.Collapse eventKey={`${idx}`}>
                                        <Card.Body>
                                            {point.rocks.map((rock, idx) =>
                                                <div key={idx}>
                                                    <p>Rocks in this point:</p>
                                                    <p>Name: {rock.name}</p>
                                                    <p>Description: {rock.description}</p>
                                                </div>
                                            )}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            )}
                            </Accordion>
                        </Container>
                       
                        
                        {this.state.userId === this.state.ownerId ? <Link to={`/routeEdit/${this.state.routeId}`}>Edit this route!</Link> : null}
                    </>
                }
            </>
        )
    }
}

export default RouteDetails