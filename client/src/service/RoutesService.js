import axios from 'axios'

export default class RouterService {
    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/routes',
            withCredentials: true
        })
    }

    getAllRoutes = () => this.service.get('/getAllCoasters')
    getOneRoute = id => this.service.get(`/getOneRoute/${id}`)
    getMyRoutes = userId => this.service.get(`/getOneCoaster/${userId}`)
    createRoute = coaster => this.service.post(`/newCoaster`, coaster) //Revisar esto...
}