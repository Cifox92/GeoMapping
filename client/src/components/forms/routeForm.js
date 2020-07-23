import React from 'react'

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const RouteForm = props => {
    return (
        <Form onSubmit={props.onSubmit}>
            <Form.Group>
                <Form.Label>Route Name</Form.Label>
                <Form.Control onChange={props.inputChange} value={props.name} name="name" type="text" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Description of the Route</Form.Label>
                <Form.Control as="textarea" onChange={props.inputChange} value={props.description} name="description" type="text" />
            </Form.Group>

            <Button variant="dark" type="submit">Add a new Route</Button>
        </Form>
    )  
}

export default RouteForm