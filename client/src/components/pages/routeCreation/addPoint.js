import React, { Component } from 'react'
import RouteService from '../../../service/RoutesService'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import PointForm from '../../forms/pointForm'

class AddPoint extends Component {
    constructor(props) {
        super(props)
        this.state = {
            routeId: props.match.params.id,
            name: undefined,
            lat: undefined,
            lng: undefined,
            rocks: []
        }
        this.routeService = new RouteService()
    }
    componentDidMount = () => this.geolocation()

    geolocation() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude
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

    render() {
        return (
            <>
                <Row>
                    <Col md={6}>
                        <h3>New Point</h3>

                        <hr></hr>
                        <PointForm {...this.state} onSubmit={this.handleFormSubmit} inputChange={this.handleInputChange} />
                    </Col>
                </Row>
            </>
        )
    }
}

export default AddPoint