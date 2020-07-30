import React, { Component } from "react"
import AuthService from "../../../service/AuthService"
import FilesService from '../../../service/FilesService'
import UserForm from './../../forms/userForm'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      avatar: '',
      aboutMe: ''
    }
    this.authService = new AuthService()
    this.filesService = new FilesService()
  }

  handleFileUpload = e => {
    const uploadData = new FormData()
    uploadData.append('photo', e.target.files[0])

    this.filesService.handleUpload(uploadData)
      .then(response => {
        console.log('Subida de archivo finalizada! La URL de Cloudinary es: ', response.data.secure_url)
        this.setState({ avatar: response.data.secure_url })
      })
      .catch(err => console.log(err))
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    this.authService.signup(this.state)
      .then((response) => {
        this.props.setTheUser(response.data);
        this.props.history.push('/')
      })
      .catch((err) => console.log(err.response.data.message));
  }

  render() {
    return (
      <UserForm {...this.state} onSubmit={this.handleFormSubmit} fileUpload={this.handleFileUpload} inputChange={this.handleInputChange} /> 
    )
  }
}

export default SignupForm
