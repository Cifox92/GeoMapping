import axios from 'axios'

export default class RouterService {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/routes`,
            withCredentials: true
        })
    }

    getUser = userId => this.service.get(`/getUser/${userId}`)
    getAllRoutes = () => this.service.get('/getAllRoutes')
    getOneRoute = id => this.service.get(`/getOneRoute/${id}`)
    getMyRoutes = userId => this.service.get(`/getMyRoutes/${userId}`)
    createRoute = route => this.service.post(`/createNewRoute`, route)
    addPoint = point => this.service.post('/addPoint', point)
    addRock = rock => this.service.post('/addRock', rock)
    getOnePoint = pointId => this.service.get(`/getOnePoint/${pointId}`)
    editRoute = route => this.service.put('/editRoute', route)
    editPoint = point => this.service.put('/editPoint', point)
    editRock = rock => this.service.put('/editRock', rock)
    deleteRoute = toDelete => this.service.post('/deleteRoute', toDelete)
    deletePoint = toDelete => this.service.post('/deletePoint', toDelete)
    deleteRock = toDelete => this.service.post('/deleteRock', toDelete)
}