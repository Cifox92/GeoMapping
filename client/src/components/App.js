import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import AuthService from './../service/AuthService'
import { Switch, Route } from 'react-router-dom'
import Navigation from './ui/Navbar'
import SignupForm from './auth/Signup-form'
import LoginForm from './auth/Login-form'
import ProfilePage from './pages/profile'
import EditProfile from './pages/editUser'
import HomeLoggedIn from './pages/homeLoggedIn'
import HomeNotLoggedIn from './pages/homeNotLoggedIn'
import CreateRoute from './pages/createRoute'
import MyRoutes from './pages/myRoutes'
import RouteCreation from './pages/routeCreation'
import RouteDetails from './pages/routeDetails'
import Edit from './pages/editRoute'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedInUser: null,
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
      <div className='contain'>
        <div className='content'>
          <Navigation setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

          <Switch>
            <Route exact path='/' render={() => this.state.loggedInUser ? <HomeLoggedIn /> : <HomeNotLoggedIn />} />
            <Route path='/login' render={props => <LoginForm {...props} setTheUser={this.setTheUser} />} />
            <Route path='/signup' render={props => <SignupForm {...props} setTheUser={this.setTheUser} />} />
            <Route path='/profile/:id' render={props => this.state.loggedInUser ? <ProfilePage {...props} loggedInUser={this.state.loggedInUser} /> : <HomeNotLoggedIn />} />
            <Route path='/createRoute' render={props => this.state.loggedInUser ? <CreateRoute {...props} loggedInUser={this.state.loggedInUser} /> : <HomeNotLoggedIn />} />
            <Route path='/myRoutes' render={props => this.state.loggedInUser ? <MyRoutes {...props} loggedInUser={this.state.loggedInUser} /> : <HomeNotLoggedIn />} />
            <Route path='/routeCreation/:id' render={props => this.state.loggedInUser ? <RouteCreation {...props} loggedInUser={this.state.loggedInUser} /> : <HomeNotLoggedIn />} />
            <Route path='/routeDetails/:id' render={props => this.state.loggedInUser ? <RouteDetails {...props} loggedInUser={this.state.loggedInUser} /> : <HomeNotLoggedIn />} />
            <Route path='/routeEdit/:id' render={props => this.state.loggedInUser ? <Edit {...props} loggedInUser={this.state.loggedInUser} /> : <HomeNotLoggedIn />} />
          </Switch>
        </div>
        <footer className='footer'><small>Copyright ©2020 Ignacio Serrano & David Roel Gómez</small></footer>
      </div>
    )
  }
}

export default App