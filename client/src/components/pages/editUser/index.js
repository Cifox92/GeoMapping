import React, {Component} from 'react'
import RouteService from './../../../service/RoutesService'
import FilesService from '../../../service/FilesService'
import UserForm from './../../forms/userForm'

class EditProfile extends Component {
    constructor (props) {
        super (props)
        this.state = {
            userId: this.props._id,
            username: this.props.username,
            password: '',
            avatar: this.props.avatar,
            aboutMe: this.props.aboutMe
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
            this.setState({avatar: response.data.secure_url})
          })
          .catch(err => console.log(err))
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.routeService.editUser(this.state)
            .then(() => this.props.handleUserSubmit())
            .catch(err => console.log(err))
    }

    render () {
        return (
            <UserForm {...this.state} onSubmit={this.handleFormSubmit} fileUpload={this.handleFileUpload} inputChange={this.handleInputChange} /> 
        )
    }
}

export default EditProfile