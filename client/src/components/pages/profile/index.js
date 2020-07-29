import React, { Component } from 'react'

import RouteService from './../../../service/RoutesService'
import MapComp from './../../ui/routeMap'

import { Spinner, Container,Col, Row, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedUser: this.props.loggedInUser._id,
            userId: this.props.match.params.id,
            userData: undefined,
            userRoutes: undefined
        }
        this.routeService = new RouteService()
    }

    componentDidMount = () => this.getAllInfo()

    getAllInfo = () => {
        this.routeService.getUser(this.state.userId)
            .then(response => this.setState({ userData: response.data }))
            .catch(err => console.log(err))
        
        this.routeService.getMyRoutes(this.state.userId)
            .then(response => {
                let routesFiltered = []
                response.data.filter(route => route.points.length > 0 ? routesFiltered.push(route) : null)
                this.setState({ userRoutes: routesFiltered })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                {!this.state.userRoutes ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> :

                        <Row className='profileInfo'>
                            <Col md={4}>
                                <img className='profileImg' src={this.state.userData.avatar} alt='profileImg' />
                            </Col>
                            <Col md={8}>
                                <h1>{this.state.userData.username}</h1>
                                <p>{this.state.userData.aboutMe}</p>
                            </Col>
                        </Row>                        
                }
                {this.state.userId !== this.state.loggedUser ? 
                    <Container>
                        <h2 className='innerTitle'>Routes</h2>
                        <Row>
                        {!this.state.userRoutes ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : this.state.userRoutes.map(route =>
                            <Col className='route' md={4}>
                                <Card bg='dark' text='white' className='routeCard'>
                                    <MapComp defaultZoom={15} {...route} />
                                    <Card.Body>
                                        <Card.Title>{route.name}</Card.Title>
                                        <small>{route.description}</small>
                                        <Link to={`/routeDetails/${route._id}`} className="btn btn-primary btn-block btn-sm">See Details</Link>
                                    </Card.Body>
                                </Card> 
                            </Col>
                        )}   
                        </Row>    
                    </Container>
               : 
                <div className='editRoute'>
                        <Link className='editBtn' to={`#`}>Edit your Profile!</Link>
                    </div>

                }
            </>
        )
    }
}

export default ProfilePage