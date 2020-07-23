import React, { Component } from 'react'
import RouteService from '../../../service/RoutesService'
import FilesService from '../../../service/FilesService'

import RockForm from '../../forms/rockForm'

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

                <RockForm {...this.state} onSubmit={this.handleFormSubmit} fileUpload={this.handleFileUpload} inputChange={this.handleInputChange} />

            </>
        )
    }
}
export default AddRockForm