import axios from 'axios'

export default class CoasterService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/coasters',
            withCredentials: true
        })
    }

    getAllCoasters = () => this.service.get('/getAllCoasters')
    getOneCoaster = id => this.service.get(`/getOneCoaster/${id}`)
    createCoaster = coaster => this.service.post(`/newCoaster`, coaster)
}