import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import AuthService from './../service/AuthService'

import { Switch, Route } from 'react-router-dom'

import Navigation from './ui/Navbar'

import SignupForm from './auth/Signup-form'
import LoginForm from './auth/Login-form'
import ProfilePage from './pages/profile'
import HomeLoggedIn from './pages/homeLoggedIn'
import HomeNotLoggedIn from './pages/homeNotLoggedIn'
import CreateRoute from './pages/createRoute'
import MyRoutes from './pages/myRoutes'
import RouteDetails from './pages/routeDetails'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedInUser: null,
      toast: {
        visible: false,
        text: ''
      }
    }
    this.AuthService = new AuthService()
  }

  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log("El estado de App ha cambiado:", this.state))

  fetchUser = () => {
    this.AuthService
      .isLoggedIn()
      .then(response => this.state.loggedInUser === null && this.setState({ loggedInUser: response.data }))
      .catch(err => console.log({ err }))
  }

  render() {

    this.fetchUser()

    return (
      <>
        <Navigation setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

        <Switch>
          <Route exact path='/' render={() => this.state.loggedInUser ? <HomeLoggedIn /> : <HomeNotLoggedIn />} />
          <Route path='/login' render={props => <LoginForm {...props} setTheUser={this.setTheUser} />} />
          <Route path='/signup' render={props => <SignupForm {...props} setTheUser={this.setTheUser} />} />
          <Route path='/profile' render={() => <ProfilePage loggedInUser={this.state.loggedInUser} />} />
          <Route path='/createRoute' render={props => <CreateRoute {...props} loggedInUser={this.state.loggedInUser} />} />
          <Route path='/myRoutes' render={props => <MyRoutes {...props} loggedInUser={this.state.loggedInUser} />} />
          <Route path='/routeDetails/:id' render={props => <RouteDetails {...props} loggedInUser={this.state.loggedInUser} />} />
        </Switch>
      </>
    )
  }
}

export default App