import './index.css'

import React from 'react'
import { Typography } from 'antd'
const { Title } = Typography


const HomeNotLoggedIn = () => {

    return (
        <>
            <section className='title'>
                <Title>GeoMapping_</Title>
                <p>The new social network for Geologists.</p>
            </section>

        </>
    )
}

export default HomeNotLoggedIn