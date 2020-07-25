import React, {Component} from 'react'
import RouterService from '../../../service/RoutesService'
import EditRouteInfo from './editRouteInfo'

import Spinner from 'react-bootstrap/Spinner'

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
        this.routeService.getOneRoute(this.state.routeId)
            .then(response => {
                this.setState({route: response.data, ownerId: response.data.owner})
                response.data.points.map(point => {
                    this.routeService.getOnePoint(point._id)
                        .then(response => this.setState({points: this.state.points.concat(response.data).reverse()}))
                })
            })
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
                        </>
                    )
            }
            </>
        )
    }
}

export default Edit