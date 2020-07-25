import React from 'react'

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

const RockForm = props => {
    return (
        <Form onSubmit={props.onSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={props.inputChange} value={props.name} name="name" type="text" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Type of Rock</Form.Label>
                <Form.Control onChange={props.inputChange} value={props.rockType} name="rockType" type="text" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control onChange={props.inputChange} value={props.description} name="description" type="text" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Samples</Form.Label>
                <Form.Control onChange={props.inputChange} value={props.samplesId} name="samplesId" type="text" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Photos</Form.Label>
                <Form.Control onChange={props.fileUpload} name="photos" type="file" />
                <p>Added photos: </p>
                {props.photos.map(photo => <img src={photo} />)}
            </Form.Group>

            <Form.Group>
                <Form.Label>Directions</Form.Label>

                <Form.Text className="text-muted">Type of data</Form.Text>
                <Form.Control onChange={props.inputChange} value={props.dataType} name="dataType" type="text" />

                <Form.Text className="text-muted">Data</Form.Text>
                <Form.Control onChange={props.inputChange} value={props.data} name="data" type="text" />
            </Form.Group>

            <Button variant="dark" type="submit">Done!</Button>
        </Form>
    )  
}

export default RockForm