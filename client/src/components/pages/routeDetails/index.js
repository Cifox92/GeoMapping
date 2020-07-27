import React, { Component } from 'react'
import RouterService from '../../../service/RoutesService'
import Spinner from 'react-bootstrap/Spinner'

import MapComp from './../../ui/routeMap'
import { Link } from 'react-router-dom'
import PieChart from './../../ui/visualData/pieChart'

class RouteDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: props.loggedInUser._id,
            ownerId: undefined,
            routeId: props.match.params.id,
            route: undefined,
            points: [],
            countRocks: {},
            isFinished: false
        }
        this.routeService = new RouterService()

    }

    componentDidMount = () => {
        this.getRouteInfo()
    }

    getRouteInfo = () => {
        this.routeService.getOneRoute(this.state.routeId)
            .then(response => {
                this.setState({ route: response.data, ownerId: response.data.owner })
                response.data.points.map(point => {
                    this.routeService.getOnePoint(point._id)
                        .then(response => {
                            this.setState({ points: this.state.points.concat(response.data).reverse() })
                            this.rockTypeCount(response.data)
                        })
                })
            })
            .then(() => setTimeout(() => this.setState({isFinished: true}), 500))
            .catch(err => console.log(err))
    }

    rockTypeCount = point => {
        point.rocks.map(rock => {
            if(rock.rockType === 'Sedimentary') {
              if(!this.state.countRocks.hasOwnProperty('Sedimentary')) {
                  this.state.countRocks.Sedimentary = 1
              } else {
                this.state.countRocks.Sedimentary += 1
              }
            }
            if(rock.rockType === 'Igneous') {
                if(!this.state.countRocks.hasOwnProperty('Igneous')) {
                    this.state.countRocks.Igneous = 1
                } else {
                    this.state.countRocks.Igneous += 1
                }
            }
            if(rock.rockType === 'Metamorphic') {
                if(!this.state.countRocks.hasOwnProperty('Metamorphic')) {
                    this.state.countRocks.Metamorphic = 1
                } else {
                    this.state.countRocks.Metamorphic += 1
                }
            }
            console.log(this.state.countRocks)
        })
    }

    render() {
        return (
            <>
                {!this.state.route ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> :
                    <>
                        <MapComp defaultZoom={15} {...this.state.route} />
                        <div className='container' style={{ height: '500px' }} >
                           {!this.state.isFinished ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : <PieChart countRocks={this.state.countRocks} />}
                        </div>
                        <h2>Points of the route</h2>
                        {this.state.points.map(point =>
                            <>
                                <h3>{point.name}</h3>
                                <p>Lat: {point.location.lat}</p>
                                <p>Lng: {point.location.lng}</p>
                                {point.rocks.map(rock =>
                                    <>
                                        <p>Rocks in this point:</p>
                                        <p>Name: {rock.name}</p>
                                        <p>Description: {rock.description}</p>
                                    </>
                                )}
                            </>
                        )}
                        {this.state.userId === this.state.ownerId ? <Link to={`/routeEdit/${this.state.routeId}`}>Edit this route!</Link> : null}
                    </>
                }
            </>
        )
    }
}

export default RouteDetails