import axios from 'axios'

export default class RouterService {
    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/routes',
            withCredentials: true
        })
    }

    getAllRoutes = () => this.service.get('/getAllRoutes')
    getOneRoute = id => this.service.get(`/getOneRoute/${id}`)
    getMyRoutes = userId => this.service.get(`/getMyRoutes/${userId}`)
    createRoute = route => this.service.post(`/createNewRoute`, route)
}