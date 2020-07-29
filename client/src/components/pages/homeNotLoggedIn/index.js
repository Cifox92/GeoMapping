import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import GeoImg from './../../img/logo.png'

const HomeNotLoggedIn = () => {

    return (
        <>
            <Row className='title'>
                <section >
                   
                    <h1><span><img className='topLogo' src={GeoImg} alt="GeologistLogo"/>GeoMapping_</span></h1>
                    <p className='subtitle'>The new connecting tool for Geologists.</p>
                </section>
            </Row>

            <Row className='share section'>
                <Col md={6} className='img'>
                    <section className='sectionText'>
                        <h2><span>Share your Field investigations</span></h2>
                        <p className='p-presentation'>Join a community where Geologists can share their investigation in the field, using Google maps integration to create routes with points of observation, all while working.</p>
                    </section>
                </Col>
            </Row>

            <Row className='mapImg section'>
                <Col md={6}>
                    
                </Col>
                <Col md={6}>
                    <section className='sectionText'>
                        <h2><span>Access to information around you</span></h2>
                        <p className='p-presentation'>With Geolocation enabled, you can see other routes and check the information other Geologists have collected.</p>
                    </section>

                </Col>
            </Row>

            <Row className='signup'>
                <Col md={4}>
                    <section className='sectionText'>
                        <h2><span>Ready?</span></h2>
                        <p className='p-presentation'>Join us.</p>
                    </section>
                </Col>
                <Col md={4}>
                    <Link className='signUpBtn' to='/signup'>Sign Up</Link>
                </Col>
                <Col md={4}>
                    <img className='bottomLogo' src={GeoImg} alt="GeologistLogo"/>
                </Col>
            </Row>
        </>
    )
}

export default HomeNotLoggedIn