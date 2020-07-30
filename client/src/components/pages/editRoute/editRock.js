import React, { Component } from 'react'
import RouterService from '../../../service/RoutesService'
import FilesService from '../../../service/FilesService'
import RockForm from '../../forms/rockForm'

class EditRock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rockId: props.rock._id,
            name: props.rock.name,
            rockType: props.rock.rockType,
            description: props.rock.description,
            samplesId: props.rock.samplesId,
            photos: props.rock.photos,
            dataType: props.rock.directions.dataType,
            data: props.rock.directions.data
        }
        this.routeService = new RouterService()
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
                this.setState({ photos: this.state.photos.concat(response.data.secure_url) })
            })
            .catch(err => console.log(err))
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.routeService
            .editRock(this.state)
            .then(() => this.props.handleFormSubmit())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <RockForm {...this.state} onSubmit={this.handleFormSubmit} fileUpload={this.handleFileUpload} inputChange={this.handleInputChange} />
            </>
        )
    }
}

export default EditRock