import React, { Component } from 'react'
import PointForm from '../../forms/pointForm'
import Spinner from 'react-bootstrap/Spinner'
import RouterService from '../../../service/RoutesService'

class EditPoint extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pointId: props.point._id,
            name: props.point.name,
            lat: props.point.location.lat,
            lng: props.point.location.lng
        }
        this.routeService = new RouterService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.routeService
            .editPoint(this.state)
            .then(() => this.props.handleFormSubmit())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                {!this.state.name ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> :
                    <PointForm {...this.state} inputChange={this.handleInputChange} onSubmit={this.handleFormSubmit} />}
            </>
        )
    }
}

export default EditPoint