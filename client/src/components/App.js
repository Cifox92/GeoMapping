import React, { Component } from 'react'
import 'antd/dist/antd.css';
import './App.css'
import AuthService from './../service/AuthService'
import { Switch, Route } from 'react-router-dom'
import SignupForm from './auth/Signup-form'
import LoginForm from './auth/Login-form'
import ProfilePage from './pages/profile'
import HomeLoggedIn from './pages/homeLoggedIn'
import HomeNotLoggedIn from './pages/homeNotLoggedIn'
import CreateRoute from './pages/createRoute'
import MyRoutes from './pages/myRoutes'
import RouteCreation from './pages/routeCreation'
import RouteDetails from './pages/routeDetails'
import Edit from './pages/editRoute'
import { Layout, Menu, Drawer, Button } from 'antd';

const { Header, Content, Footer } = Layout;


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedInUser: null,
      visible: false
    }
    this.AuthService = new AuthService()
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

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

      <Layout className="layout">
        <Header>
          <div className="logo" />          
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-drawer-render-in-current-wrapper">
            <Switch>
              <Route exact path='/' render={() => this.state.loggedInUser ? <HomeLoggedIn /> : <HomeNotLoggedIn />} />
              <Route path='/login' render={props => <LoginForm {...props} setTheUser={this.setTheUser} />} />
              <Route path='/signup' render={props => <SignupForm {...props} setTheUser={this.setTheUser} />} />
              <Route path='/profile' render={() => <ProfilePage loggedInUser={this.state.loggedInUser} />} />
              <Route path='/createRoute' render={props => <CreateRoute {...props} loggedInUser={this.state.loggedInUser} />} />
              <Route path='/myRoutes' render={props => <MyRoutes {...props} loggedInUser={this.state.loggedInUser} />} />
              <Route path='/routeCreation/:id' render={props => <RouteCreation {...props} loggedInUser={this.state.loggedInUser} />} />
              <Route path='/routeDetails/:id' render={props => <RouteDetails {...props} loggedInUser={this.state.loggedInUser} />} />
              <Route path='/routeEdit/:id' render={props => <Edit {...props} loggedInUser={this.state.loggedInUser} />} />
            </Switch>
            <Drawer
              title="Basic Drawer"
              placement="left"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
              getContainer={false}
              style={{ position: 'absolute' }}
            >
              <p>Some contents...</p>
            </Drawer>
          </div>
          <div className="site-layout-content">Content</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>GeoMapping ©2020 Created by Ignacio Serrano & David Roel</Footer>
      </Layout>
    )
  }
}

export default App





