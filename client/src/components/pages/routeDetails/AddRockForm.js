import React, { Component } from 'react'

import RouteService from '../../../service/RoutesService'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class AddRockForm extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            description: '',
            samplesId: '',
            photos: '',
            directions: {
                
            }
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
            .addRock(this.state)
            .then(() => this.props.handleRockSubmit())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <h3>Add a new rock to this point</h3>
                <hr></hr>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Samples</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.length} name="samplesId" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Photos</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.inversions} name="photos" type="file" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Directions</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.directions} name="directions" type="text" />
                    </Form.Group>

                    <Button variant="dark" type="submit">Add rock!</Button>
                </Form>
            </>
        )
    }
}

export default AddRockForm