import React, {Component} from 'react'
import RouteForm from '../../forms/routeForm'

import RouterService from '../../../service/RoutesService'

class EditRouteInfo extends Component {
    constructor (props) {
        super (props)
        this.state = {
            id: props._id,
            name: props.name,
            description: props.description
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
            .editRoute(this.state)
            .catch((err) => console.log(err.response.data.message))
        }

    render () {
        return (
            <>
                <RouteForm {...this.state} onSubmit={this.handleFormSubmit} inputChange={this.handleInputChange} />
            </>
        )
    }
}

export default EditRouteInfo