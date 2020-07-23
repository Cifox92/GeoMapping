import React, { Component } from 'react'
import RouteService from '../../../service/RoutesService'
import FilesService from '../../../service/FilesService'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class AddRockForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pointId: props.pointIdClicked,
            name: '',
            rockType: '',
            description: '',
            samplesId: '',
            photos: [],
            dataType: '',
            data: ''
        }
        this.routeService = new RouteService()
        this.filesService = new FilesService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append('photo', e.target.files[0])
    
        this.filesService.handleUpload(uploadData)
          .then(response => {
            console.log('Subida de archivo finalizada! La URL de Cloudinary es: ', response.data.secure_url)
            this.setState({photos: this.state.photos.concat(response.data.secure_url)})
          })
          .catch(err => console.log(err))
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
                        <Form.Label>Type of Rock</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.rockType} name="rockType" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Samples</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.samplesId} name="samplesId" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Photos</Form.Label>
                        <Form.Control onChange={this.handleFileUpload} name="photos" type="file" />
                        <p>Added photos: </p>
                        {this.state.photos.map(photo => <img src={photo} />)}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Directions</Form.Label>

                        <Form.Text className="text-muted">Type of data</Form.Text>
                        <Form.Control onChange={this.handleInputChange} value={this.state.dataType} name="dataType" type="text" />

                        <Form.Text className="text-muted">Data</Form.Text>
                        <Form.Control onChange={this.handleInputChange} value={this.state.data} name="data" type="text" />
                    </Form.Group>

                    <Button variant="dark" type="submit">Add rock!</Button>
                </Form>
            </>
        )
    }
}
export default AddRockForm