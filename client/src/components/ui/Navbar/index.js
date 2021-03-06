import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import AuthService from './../../../service/AuthService'
import { Link, NavLink } from 'react-router-dom'
import './index.css'
import GeoImg from './../../img/logo.png'

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.AuthService = new AuthService()
    }

    logout = () => {
        this.AuthService
            .logout()
            .then(() => {
                this.props.setTheUser(false)
                this.props.handleToast(true, 'Usuario desconectado')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (

            <Navbar bg="dark" variant="dark" expand="lg" sticky="top" >
                <Navbar.Brand>
                    <Link to="/"><img className='navLogo' src={GeoImg} alt="GeologistLogo" /> GeoMapping_</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {this.props.loggedInUser ?
                            (
                                <>
                                    <Nav.Link as="span">
                                        <NavLink to="/myRoutes" activeStyle={{ color: 'white' }}>Your Routes</NavLink>
                                    </Nav.Link>
                                    <Nav.Link as="span">
                                        <NavLink to="/createRoute" activeStyle={{ color: 'white' }}>Create a new route</NavLink>
                                    </Nav.Link>
                                    <Nav.Link as="span">
                                        <span onClick={this.logout}>Log Out</span>
                                    </Nav.Link>
                                    <Nav.Link as="span">
                                        <NavLink to={`/profile/${this.props.loggedInUser._id}`} activeStyle={{ color: 'white' }}><Image className="navAvatar" src={this.props.loggedInUser.avatar} roundedCircle /></NavLink>
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as="span">
                                        <NavLink to="/signup" activeStyle={{ color: 'white' }}>Sign Up</NavLink>
                                    </Nav.Link>
                                    <Nav.Link as="span">
                                        <NavLink to="/login" activeStyle={{ color: 'white' }}>Log In</NavLink>
                                    </Nav.Link>
                                </>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        )
    }
}

export default Navigation