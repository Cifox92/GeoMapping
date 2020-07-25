import axios from 'axios'

export default class RouterService {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/routes`,
            withCredentials: true
        })
    }

    getAllRoutes = () => this.service.get('/getAllRoutes')
    getOneRoute = id => this.service.get(`/getOneRoute/${id}`)
    getMyRoutes = userId => this.service.get(`/getMyRoutes/${userId}`)
    createRoute = route => this.service.post(`/createNewRoute`, route)
    addPoint = point => this.service.post('/addPoint', point)
    addRock = rock => this.service.post('/addRock', rock)
    getOnePoint = pointId => this.service.get(`/getOnePoint/${pointId}`)
    editRoute = route => this.service.put('/editRoute', route)
}