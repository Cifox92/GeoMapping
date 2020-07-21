const express = require('express')
const router = express.Router()

const Route = require('./../models/Route.model')
const Point = require('./../models/Point.model')
const Rock = require('./../models/Rock.model')

//Endpoints
router.get('/getAllRoutes', (req, res, next) => {
    Route.find().populate('points')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/getMyRoutes/:userId', (req, res, next) => {
   Route.find({owner: req.params.userId}).populate('points')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/getOneRoute/:id', (req, res, next) => {
    Route.findById(req.params.id).populate('points')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/createNewRoute', (req, res, next) => {
    const { name, description, owner, points } = req.body
    
    Route
        .create({ name, description, owner, points })
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))
})

router.get('/editRoute/:id', (req, res, next) => {
    Route.findById(req.params.id).populate('points')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/editRoute', (req, res, next) => {
    const { name, description, points } = req.body

    Route.findOneAndUpdate({ name: name }, { name: name, description: description, points: points })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/addPoint', (req, res, next) => {
    const { routeId, name, location, rocks } = req.body
    
    Point.create({ name, location, rocks })
        .then(response => Route.findByIdAndUpdate(routeId, { $push: { points: response.id }}, {new: true}))
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/addRock', (req, res, next) => {
    const { pointId, name, rockType, description, samplesId, photos, dataType, data } = req.body

    const directions = {
        dataType: dataType,
        data: data
    }

    Rock.create({ name, rockType, description, samplesId, photos, directions })
        .then(response => Point.findByIdAndUpdate(pointId, { $push: { rocks: response.id }}, {new: true}))
        .then(response => res.json(response))
        .catch(err => next(err))
})
module.exports = router