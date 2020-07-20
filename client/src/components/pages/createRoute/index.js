import React, {Component} from 'react'

import RouteService from './../../../service/RoutesService'

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

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
            this.props.history.push(`/routeDetails/${response.data._id}`)
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
                        <Form onSubmit={this.handleFormSubmit}>
                            <Form.Group>
                                <Form.Label>Route Name</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Description of the Route</Form.Label>
                                <Form.Control as="textarea" onChange={this.handleInputChange} value={this.state.description} name="description" type="text" />
                            </Form.Group>

                            <Button variant="dark" type="submit">Add a new Route</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CreateRoute