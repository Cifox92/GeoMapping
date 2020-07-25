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

router.get('/getOnePoint/:id', (req, res, next) => {
    Point.findById(req.params.id).populate('rocks') 
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/createNewRoute', (req, res, next) => {
    const { name, description, owner, points } = req.body
    
    Route.create({ name, description, owner, points })
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))
})


router.put('/editRoute', (req, res, next) => {
    const { id, name, description } = req.body

    Route.findByIdAndUpdate(id, { name: name, description: description })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put('/editPoint', (req, res, next) => {
    const { pointId, name, lat, lng } = req.body

    const location = {
        lat: lat,
        lng: lng
    }

    Point.findByIdAndUpdate(pointId, {name: name, location: location})
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.put('/editRock', (req, res, next) => {
    const { rockId, name, rockType, description, samplesId, photos, dataType, data } = req.body

    const directions = {
        dataType: dataType,
        data: data
    }

    Rock.findByIdAndUpdate(rockId, {name, rockType, description, samplesId, photos, directions })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.post('/addPoint', (req, res, next) => {
    const { routeId, name, lat, lng, rocks } = req.body

    const location = {
        lat: lat,
        lng: lng
    }
    
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

    Rock.create({pointId, name, rockType, description, samplesId, photos, directions })
        .then(response => Point.findByIdAndUpdate(pointId, { $push: { rocks: response.id }}, {new: true}))
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.delete('/deleteRock/:id', (req, res, next) => {
    Rock.findOneAndDelete(req.params.id)
        .catch(err => next(err))
})

router.delete('/deletePoint/:id', (req, res, next) => {
    Point.findOneAndDelete(req.params.id)
        .catch(err => next(err))
})

router.delete('/deleteRoute/:id', (req, res, next) => {
    Route.findOneAndDelete(req.params.id)
        .catch(err => next(err))
})

module.exports = router