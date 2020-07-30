import React, { Component } from 'react'
import RouterService from '../../../service/RoutesService'
import EditRouteInfo from './editRouteInfo'
import EditPoint from './editPoint'
import EditRock from './editRock'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            routeId: props.match.params.id,
            userId: props.loggedInUser._id,
            ownerId: undefined,
            route: undefined,
            points: []
        }
        this.routeService = new RouterService()
    }

    componentDidMount = () => {
        this.getRouteInfo()
    }

    getRouteInfo = () => {
        this.setState({ points: [] })
        this.routeService.getOneRoute(this.state.routeId)
            .then(response => {
                this.setState({ route: response.data, ownerId: response.data.owner })
                response.data.points.map(point => {
                    this.routeService.getOnePoint(point._id)
                        .then(response => this.setState({ points: this.state.points.concat(response.data).sort((a, b) => (a._id > b._id) ? 1 : -1) }))
                })
            })
            .catch(err => console.log(err))
    }

    handleFormSubmit = () => {
        this.getRouteInfo()
    }

    deleteRoute = () => {
        const pointsId = [], rocksId = []

        this.state.points.map(point => {
            pointsId.push(point._id)
            point.rocks.map(rock => rocksId.push(rock._id))
        })

        const toDelete = {
            route: this.state.routeId,
            points: pointsId,
            rocks: rocksId
        }

        this.routeService.deleteRoute(toDelete)
            .then(response => this.props.history.push('/myRoutes'))
            .catch(err => console.log(err))
    }

    deletePoint = point => {
        const rocksId = []

        point.rocks.map(rock => rocksId.push(rock._id))

        const toDelete = {
            route: this.state.routeId,
            point: point._id,
            rocks: rocksId
        }

        this.routeService.deletePoint(toDelete)
            .then(response => this.getRouteInfo())
            .catch(err => console.log(err))
    }

    deleteRock = (rock, point) => {
        const toDelete = {
            point: point,
            rock: rock
        }

        this.routeService.deleteRock(toDelete)
            .then(response => this.getRouteInfo())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container>
                <h2 className='innerTitle'>Edit this Route</h2>
                {!this.state.route ?
                    <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> :
                    <>
                        <EditRouteInfo {...this.state.route} />
                        <Button className='deleteBtn' onClick={() => this.deleteRoute()}>Delete this route</Button>

                        <Accordion>
                            {!this.state.points ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> :
                                <>
                                    {this.state.points.map((point, idx) =>
                                        <Card key={point._id}>
                                            <Accordion.Toggle as={Card.Header} eventKey={`${idx}`}>
                                                <h4>Point: {point.name}</h4>
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey={`${idx}`}>
                                                <Row className='justify-content-md-center'>
                                                    <Col md={10}>
                                                        <p className='innerTitle'>Edit Point:</p>

                                                        <EditPoint point={point} handleFormSubmit={this.handleFormSubmit} />

                                                        <Button className='deleteBtn' onClick={() => this.deletePoint(point)}>Delete this point</Button>

                                                        <hr />

                                                        <p className='innerTitle'>Rocks in this point:</p>
                                                        {point.rocks.map(rock =>
                                                            <div key={rock._id}>
                                                                <EditRock rock={rock} handleFormSubmit={this.handleFormSubmit} />
                                                                <Button className='deleteBtn' onClick={() => this.deleteRock(rock._id, point._id)}>Delete this rock</Button>
                                                                <hr />
                                                            </div>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </Accordion.Collapse>
                                        </Card>
                                    )}
                                </>
                            }
                        </Accordion>
                    </>
                }
            </Container>
        )
    }
}

export default Edit