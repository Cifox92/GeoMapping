import React, {Component} from 'react'
import RouterService from '../../../service/RoutesService'
import Spinner from 'react-bootstrap/Spinner'

import MapComp from './../../ui/routeMap'

class RouteDetails extends Component {
    constructor (props) {
        super (props)
        this.state = {
            userId: props.loggedInUser._id,
            ownerId: undefined, 
            routeId: props.match.params.id,
            route: undefined
        }
        this.routeService = new RouterService()
    }

    componentDidMount = () => this.getRouteInfo()

    getRouteInfo = () => {
        this.routeService.getOneRoute(this.state.routeId)
            .then(response => this.setState({route: response.data, ownerId: response.data.owner}))
            .catch(err => console.log(err))
    }

    render () {
        return (
            <>
                {!this.state.route ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> :
                <>
                    <MapComp defaultZoom={15} {...this.state.route} />
                    <h2>Points of the route</h2>
                    {this.state.route.points.map(point => <p>{point.name}</p>)}
                    {this.state.userId === this.state.ownerId ? <p>ES TU RUTA!</p> : null}
                </>
                }
            </>
        )
    }
}

export default RouteDetails