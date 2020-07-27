import React, {Component} from 'react'
import RouterService from '../../../service/RoutesService'
import EditRouteInfo from './editRouteInfo'
import EditPoint from './editPoint'

import Spinner from 'react-bootstrap/Spinner'
import EditRock from './editRock'
import Button from 'react-bootstrap/esm/Button'

class Edit extends Component {
    constructor (props) {
        super (props)
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
        this.setState({points: []})
        this.routeService.getOneRoute(this.state.routeId)
            .then(response => {
                this.setState({route: response.data, ownerId: response.data.owner})
                response.data.points.map(point => {
                    this.routeService.getOnePoint(point._id)
                        .then(response => this.setState({points: this.state.points.concat(response.data)}))
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

    render () {
        return (
            <>
                <h2>Edit this Route</h2>
                {!this.state.route ? 
                <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> :
                    (
                        <>
                            <EditRouteInfo {...this.state.route} />
                            <Button onClick={() => this.deleteRoute()}>Delete this route</Button>

                            {!this.state.points ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : <ul>{this.state.points.map(point => 
                                <li key={point._id}>
                                    <EditPoint point={point} handleFormSubmit={this.handleFormSubmit} />
                                    <Button onClick={() => this.deletePoint(point)}>Delete this point</Button>
                                    <p>Rocks in this point:</p>
                                    {point.rocks.map(rock => 
                                        <>
                                            <EditRock rock={rock} handleFormSubmit={this.handleFormSubmit} />
                                            <Button onClick={() => this.deleteRock(rock._id, point._id)}>Delete this rock</Button>
                                        </>
                                    )}
                                </li>
                            )}
                            </ul>}
                        </>
                    )
                }
            </>
        )
    }
}

export default Edit