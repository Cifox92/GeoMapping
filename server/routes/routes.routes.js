const express = require('express')
const router = express.Router()

const Route = require('./../models/Route.model')
const User = require('../models/User.model')
const Point = require('./../models/Point.model')

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
    const {name, description, points} = req.body

    Route.findOneAndUpdate({name: name}, {name: name, description: description, points: points})
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/addPoint', (req, res, next) => {
    Route.findByIdAndUpdate(req.params.id, {})
})

module.exports = router