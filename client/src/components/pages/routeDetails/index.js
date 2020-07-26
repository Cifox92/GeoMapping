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
            sedimentaryCount: 0,
            igneousCount: 0,
            metamorphicCount: 0,
            count: undefined
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
                let countRocks = {
                    sedimentaryCount: this.state.sedimentaryCount,
                    igneousCount: this.state.igneousCount,
                    metamorphicCount: this.state.metamorphicCount 
                }
        
                this.setState({count: countRocks})
            })
            .catch(err => console.log(err))
    }

    rockTypeCount = point => {
        point.rocks.map(rock => {
            if(rock.rockType === 'Sedimentary') {
              this.state.sedimentaryCount++
            }
            else if(rock.rockType === 'Igneous') {
                this.state.igneousCount++
            }
            else if(rock.rockType === ' Metamorphic') {
                this.state.metamorphicCount++
            }
        })
    }

    render() {
        return (
            <>
                {!this.state.route ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> :
                    <>
                        <MapComp defaultZoom={15} {...this.state.route} />
                        <div className='container' style={{ height: '500px' }} >
                           {!this.state.count ? <Spinner animation="grow" role="status"><span className="sr-only">Loading...</span></Spinner> : <PieChart count={this.state.count} />}
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