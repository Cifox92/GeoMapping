const express = require('express')
const mongoose = require("mongoose")
const router = express.Router()
const bcrypt = require("bcrypt")
const ensureLogin = require("connect-ensure-login");

const User = require('./../models/User.model')
const Route = require('./../models/Route.model')
const Point = require('./../models/Point.model')
const Rock = require('./../models/Rock.model')

//Endpoints
router.get('/getUser/:id',ensureLogin.ensureLoggedIn(), (req, res, next) => {
    User.findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put('/editProfile',ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const { userId, username, password, avatar, aboutMe } = req.body

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    User.findByIdAndUpdate(userId,ensureLogin.ensureLoggedIn(), { username, password: hashPass, avatar, aboutMe })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/getAllRoutes',ensureLogin.ensureLoggedIn(), (req, res, next) => {
    Route.find().populate('points')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/getMyRoutes/:userId',ensureLogin.ensureLoggedIn(), (req, res, next) => {
    Route.find({ owner: req.params.userId }).populate('points')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/getOneRoute/:id',ensureLogin.ensureLoggedIn(), (req, res, next) => {
    Route.findById(req.params.id).populate('points').populate('owner')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.get('/getOnePoint/:id',ensureLogin.ensureLoggedIn(), (req, res, next) => {
    Point.findById(req.params.id).populate('rocks')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/createNewRoute',ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const { name, description, owner, points } = req.body

    Route.create({ name, description, owner, points })
        .then(response => res.json(response))
        .catch(err => next(new Error(err)))
})

router.put('/editRoute',ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const { id, name, description } = req.body

    Route.findByIdAndUpdate(id, { name, description })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put('/editPoint',ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const { pointId, name, lat, lng } = req.body

    const location = {
        lat: lat,
        lng: lng
    }

    Point.findByIdAndUpdate(pointId, { name, location })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put('/editRock',ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const { rockId, name, rockType, description, samplesId, photos, dataType, data } = req.body

    const directions = {
        dataType: dataType,
        data: data
    }

    Rock.findByIdAndUpdate(rockId, { name, rockType, description, samplesId, photos, directions })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/addPoint',ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const { routeId, name, lat, lng, rocks } = req.body

    const location = {
        lat: lat,
        lng: lng
    }

    Point.create({ name, location, rocks })
        .then(response => Route.findByIdAndUpdate(routeId, { $push: { points: response.id } }, { new: true }))
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/addRock',ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const { pointId, name, rockType, description, samplesId, photos, dataType, data } = req.body

    const directions = {
        dataType: dataType,
        data: data
    }

    Rock.create({ pointId, name, rockType, description, samplesId, photos, directions })
        .then(response => Point.findByIdAndUpdate(pointId, { $push: { rocks: response.id } }, { new: true }))
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/deleteRock',ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const { point, rock } = req.body

    let pointUpdate = Point.findByIdAndUpdate(point, { $pull: { rocks: mongoose.Types.ObjectId(rock) } }, { new: true })
    let rockDelete = Rock.findByIdAndDelete(rock)

    Promise.all([pointUpdate, rockDelete])
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/deletePoint',ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const { route, point, rocks } = req.body

    let routeUpdate = Route.findByIdAndUpdate(route, { $pull: { points: mongoose.Types.ObjectId(point) } }, { new: true })
    let pointDeleted = Point.findByIdAndDelete(point)
    let rocksDeleted = Rock.deleteMany({ _id: rocks })

    Promise.all([routeUpdate, rocksDeleted, pointDeleted])
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/deleteRoute',ensureLogin.ensureLoggedIn(), (req, res, next) => {
    const { route, points, rocks } = req.body
    let routeDelete = Route.findByIdAndDelete(route)
    let pointsDelete = Point.deleteMany({ _id: points })
    let rocksDelete = Rock.deleteMany({ _id: rocks })

    Promise.all([rocksDelete, pointsDelete, routeDelete])
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router