import React, {Component} from 'react'

import Spinner from 'react-bootstrap/Spinner'

import RouteService from '../../../service/RoutesService'
import AddPoint from './addPoint'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class RouteDetails extends Component {
    constructor (props) {
        super (props)
        this.state = {
            routeId: props.match.params.id,
            points: undefined
        }
        this.routeService = new RouteService()
    }

    componentDidMount= () => this.updatePointList()

    updatePointList = () => {
        this.routeService
            .getOneRoute(this.state.routeId)
            .then(response => this.setState({points: response.data.points}))
            .catch(err => console.log(err))
    }

    handleModal = status => this.setState({ showModal: status })

    render () {
        return (
            <>
                <h1>Add points to the route while you are working!</h1>
                <p>Mapa aqui con los puntos</p>
                <AddPoint {...this.props} updatePointList={this.updatePointList} routeId={this.state.routeId}/>

                {!this.state.points ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : <ul>{this.state.points.map(point => 
                    <li key={point._id}>
                        <Button onClick={() => this.handleModal(true)} variant="dark" size="sm" style={{ marginBottom: '20px' }}>{point.name}</Button>
                    </li>
                    )}
                </ul>}
            </>
        )
    }
}

export default RouteDetails