import React, {Component} from 'react'
import RouteService from '../../../service/RoutesService'
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

class AddPoint extends Component  {
    constructor (props) {
        super (props)
        this.state = {
            routeId: props.match.params.id,
            name: undefined,
            location: {
                lat: undefined,
                lng: undefined
            },
            rocks:[]
        }
        this.routeService = new RouteService()
    }
    componentDidMount = () => this.geolocation()
    
    geolocation() {
        navigator.geolocation.getCurrentPosition(position => {
          this.setState({
            location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
          })
        })
      }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        this.geolocation()
        e.preventDefault()
        this.routeService
            .addPoint(this.state)
            .then(() => this.props.updatePointList())
            .catch((err) => console.log(err.response.data.message))
        }

    render () {
        return (
            <>
                <Row>
                    <Col md={{ offset: 3, span: 6 }}>
                    <h3>New Point</h3>

                    <hr></hr>
                        <Form onSubmit={this.handleFormSubmit}>
                            <Form.Group>
                                <Form.Label>Lat</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.location.lat} name="lat" type="text" />
                                <Form.Label>Lon</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.location.lng} name="lng" type="text" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Name of the point</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.name} name="name" type="text" />
                            </Form.Group>

                            <Button variant="dark" type="submit">Add a new Point</Button>
                        </Form>
                    </Col>
                </Row>
            </>
        )
    }
}

export default AddPoint