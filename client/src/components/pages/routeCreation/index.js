import React, { Component } from 'react'
import RouteService from '../../../service/RoutesService'
import AddPoint from './addPoint'
import AddRock from './addRock'
import MapComp from './../../ui/routeMap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


class RouteCreation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            routeId: props.match.params.id,
            route: undefined,
            hasPoints: false,
            pointIdClicked: undefined,
            showModal: false
        }
        this.routeService = new RouteService()
    }

    componentDidMount = () => this.updatePointList()

    updatePointList = () => {
        this.routeService
            .getOneRoute(this.state.routeId)
            .then(response => {
                this.setState({ route: response.data })
                if (response.data.points.length > 0) {
                    this.setState({ hasPoints: true })
                }
            })
            .catch(err => console.log(err))
    }

    handleModal = status => this.setState({ showModal: status })
    pointIdClicked = pointId => this.setState({ pointIdClicked: pointId })

    handleRockSubmit = () => {
        this.handleModal(false)
        this.updatePointList()
    }

    render() {
        return (
            <Container fluid>
                <h1 className='innerTitle'>Add points to the route while you are working!</h1>
                <Row>
                    <Col md={6}>
                        <div className='detailMap'>
                            {!this.state.hasPoints ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : <MapComp defaultZoom={15} {...this.state.route} />}
                        </div>
                    </Col>
                    <Col md={6}>
                        <AddPoint {...this.props} updatePointList={this.updatePointList} routeId={this.state.routeId} />
                        <h3>Points added:</h3>
                        <hr />
                        {!this.state.route ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> :
                            <>
                                {this.state.route.points.map(point =>
                                    <Button key={point._id} onClick={() => { this.handleModal(true); this.pointIdClicked(point._id) }} variant="dark" size="sm" style={{ marginBottom: '20px' }}>{point.name}</Button>
                                )}
                            </>}
                    </Col>
                </Row>

                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <AddRock pointIdClicked={this.state.pointIdClicked} handleRockSubmit={this.handleRockSubmit} />
                    </Modal.Body>
                </Modal>
            </Container>
        )
    }
}

export default RouteCreation