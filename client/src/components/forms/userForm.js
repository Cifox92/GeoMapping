import React from 'react'

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const UserForm = props => {
    return (
        <Container as="main">
        <Row>
          <Col md={{ offset: 3, span: 6 }}>
            <h3>User</h3>

            <hr></hr>

            <Form onSubmit={props.onSubmit}>
              <Form.Group>
                <Form.Label>User Name</Form.Label>
                <Form.Control onChange={props.inputChange} value={props.username} name="username" type="text" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={props.inputChange} value={props.password} name="password" type="password" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Text className="text-muted">Tell us a bit about yourself.</Form.Text>
                <Form.Control as="textarea" onChange={props.inputChange} value={props.aboutMe} name="aboutMe" type="text" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Avatar (file)</Form.Label>
                <Form.Control name="avatar" type="file" onChange={props.fileUpload} />
              </Form.Group>

              <Button variant="dark" type="submit">Done!</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
}

export default UserForm