import React, {Component} from 'react'
import RouteService from './../../../service/RoutesService'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import RouteForm from './../../forms/routeForm'

class CreateRoute extends Component {
    constructor (props) {
        super (props)
        this.state = {
            name: '',
            description: '',
            owner: props.loggedInUser._id,
            points: []
        }
        this.routeService = new RouteService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.routeService
            .createRoute(this.state)
            .then(response => {
                this.props.history.push(`/routeCreation/${response.data._id}`)
            })
            .catch((err) => console.log(err.response.data.message))
    }

    render () {
        return (
            <Container as="main">
                <Row>
                    <Col md={{ offset: 3, span: 6 }}>
                    <h3>New Route</h3>

                    <hr></hr>
                        <RouteForm {...this.state} onSubmit={this.handleFormSubmit} inputChange={this.handleInputChange} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CreateRoute