import React, { Component } from "react"

import AuthService from "../../../service/AuthService"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      avatar: "",
      description: ""
    }
    this.authService = new AuthService()
  }
  

  handleInputChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    this.authService
      .signup(this.state)
      .then((response) => {
        this.props.setTheUser(response.data);
        //this.props.handleToast(true, 'Registro completado')
        this.props.history.push("/")
      })
      .catch((err) => console.log(err.response.data.message));
  }

  render() {
    return (
      <Container as="main">
        <Row>
          <Col md={{ offset: 3, span: 6 }}>
            <h3>New User</h3>

            <hr></hr>

            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group>
                <Form.Label>User Name</Form.Label>
                <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={this.handleInputChange} value={this.state.password}name="password" type="password" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Text className="text-muted">Tell us a bit about yourself.</Form.Text>
                <Form.Control as="textarea" onChange={this.handleInputChange} value={this.state.description} name="description" type="text" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Avatar</Form.Label>
                <Form.Control onChange={this.handleInputChange} value={this.state.avatar} name="avatar" type="file" />
              </Form.Group>

              <Button variant="dark" type="submit">Sign Up!</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default SignupForm
