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

    render () {
        return (
            <>
                <h2>Edit this Route</h2>
                {!this.state.route ? 
                <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> :
                    (
                        <>
                            <EditRouteInfo {...this.state.route} />
                            <Button>Delete this route</Button>

                            {!this.state.points ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : <ul>{this.state.points.map(point => 
                                <li key={point._id}>
                                    <EditPoint point={point} handleFormSubmit={this.handleFormSubmit} />
                                    <Button>Delete this point</Button>
                                    <p>Rocks in this point:</p>
                                    {point.rocks.map(rock => 
                                        <>
                                            <EditRock rock={rock} handleFormSubmit={this.handleFormSubmit} />
                                            <Button>Delete this rock</Button>
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