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

            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Type of Rock</Form.Label>
                <Form.Control as='select' onChange={props.inputChange} value={props.rockType} name="rockType" type="text">
                    <option value='0'>Choose one!</option>
                    <option value='Sedimentary'>Sedimentary</option>
                    <option value='Igneous'>Igneous</option>
                    <option value='Metamorphic'>Metamorphic</option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as='textarea' onChange={props.inputChange} value={props.description} name="description" type="text" />
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Samples</Form.Label>
                <Form.Control onChange={props.inputChange} value={props.samplesId} name="samplesId" type="text" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Photos</Form.Label>
                <Form.Control onChange={props.fileUpload} name="photos" type="file" />
                <p>Added photos: </p>
                {props.photos.map(photo => <img className='rockImg' src={photo} alt='rockImg' />)}
            </Form.Group>

            <Form.Group>
                <Form.Label>Directions</Form.Label>

                <Form.Text className="text-muted">Type of data</Form.Text>
                <Form.Control as='select' onChange={props.inputChange} value={props.dataType} name="dataType" type="text">
                    <option value='0'>Choose one!</option>
                    <option value='none'>none</option>
                    <option value='Direction and Dip'>Direction and Dip</option>
                    <option value='Lineation'>Lineation</option>
                    <option value='Foliation'>Foliation</option>
                </Form.Control>

                <Form.Text className="text-muted">Data</Form.Text>
                <Form.Control onChange={props.inputChange} value={props.data} name="data" type="text" />
            </Form.Group>

            <Button variant="dark" type="submit">Done!</Button>
        </Form>
    )  
}

export default RockForm