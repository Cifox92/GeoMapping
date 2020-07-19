import React from 'react'

const Profile = props => {

    return props.loggedInUser && <h1>¡Hola, {props.loggedInUser.username}!</h1>
}

export default Profile