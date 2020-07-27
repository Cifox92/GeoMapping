import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
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
import RouteCreation from './pages/routeCreation'
import RouteDetails from './pages/routeDetails'
import Edit from './pages/editRoute'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedInUser: null,
      collapsed: false
    }
    this.AuthService = new AuthService()
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
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
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />} />
          </Menu>
        </Sider>
        <Layout className="site-layout">
          
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
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
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout> 
    )
  }
}

export default App