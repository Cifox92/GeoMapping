import React from 'react'

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const PointForm = props => {
    return (
        <Form onSubmit={props.onSubmit}>
            <Form.Group>
                <Form.Label>Lat</Form.Label>
                <Form.Control onChange={props.inputChange} value={props.location.lat} name="lat" type="text" />
                <Form.Label>Lon</Form.Label>
                <Form.Control onChange={props.inputChange} value={props.location.lng} name="lng" type="text" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Name of the point</Form.Label>
                <Form.Control onChange={props.inputChange} value={props.name} name="name" type="text" />
            </Form.Group>

            <Button variant="dark" type="submit">Add a new Point</Button>
        </Form>
    )  
}

export default PointForm