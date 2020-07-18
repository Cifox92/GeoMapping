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

router.get('getMyRoutes/:userId', (req, res, next) => {
    const userId = User.findById(req.params._id)
    const route = Route.find({owner: userId}).populate('points')

    Promise.all([userId, route])
        .then(response => res.json({user: response[0], route: response[1]}))
        .catch(err => next(err))
})

router.get('getOneRoute/:id', (req, res, next) => {
    Route.findById(req.params.id).populate('points')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('createNewRoute/:id', (req, res, next) => {
    const { name, description} = req.body
    const owner = req.params._id

    Route
        .create({ name, description, owner })
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))
})

router.get('editRoute/:id', (req, res, next) => {
    Route.findById(req.params.id).populate('points')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('editRoute', (req, res, next) => {
    const {name, description, points} = req.body

    Route.findOneAndUpdate({name: name}, {name: name, description: description, points: points})
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('addPoint', (req, res, next) => {
    Route.findByIdAndUpdate(req.params.id, {})
})

module.exports = router