import './index.css'

import React from 'react'
import { Row, Col } from 'react-bootstrap'

const HomeNotLoggedIn = () => {

    return (
        <>
            <Row className='title'>
                <section >
                    <h1><span>GeoMapping_</span></h1>
                    <p className='subtitle'>The new social network for Geologists.</p>
                </section>
            </Row>

            <Row className='share section'>
                <Col md={6} className='img'>
                    <section className='sectionText'>
                        <h2><span>Share your Field investigations</span></h2>
                        <p>Join a community where Geologists can share their investigation in the field, using Google maps integration to create routes with points of observation, all while working.</p>
                    </section>
                </Col>
            </Row>

            <Row className='map section'>
                <Col md={6}>
                    
                </Col>
                <Col md={6}>
                    <section className='sectionText'>
                        <h2><span>Access to information around you</span></h2>
                        <p>With Geolocation enabled, you can see other routes and check the information other Geologists have collected.</p>
                    </section>

                </Col>
            </Row>

            <Row>
                <Col md={12}>
                <section className='sectionText'>
                        <h2><span>Ready?</span></h2>
                        <p>With Geolocation enabled, you can see other routes and check the information other Geologists have collected.</p>
                    </section>
                </Col>
            </Row>
        </>
    )
}

export default HomeNotLoggedIn