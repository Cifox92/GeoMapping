const mongoose = require('mongoose')

const Point = require('../models/Point.model')
const Route = require('../models/Route.model')
const User = require('../models/User.model')

mongoose.connect(process.env.DB)

Point.collection.drop()
Route.collection.drop()
User.collection.drop()

const routes = [
    {
        name: 'Route1',
        description: 'Por las montañas me perdi JOPUTA',
        owner: {
            username: 'G1',
            password: '1234',
            avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.es%2Fvector-premium%2Fperfil-avatar-hombre-icono-redondo_2651713.htm&psig=AOvVaw0nsnna9g2qu8hdMVDHj4RX&ust=1595155165269000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCND_zanO1uoCFQAAAAAdAAAAABAD',
            aboutMe: 'Geólogo con ganas de ver ROCAS EVERYWHERE'
        },
        points: [
            {
                name: 'X1',
                location: { 
                    lat: '40', 
                    lon: '2' 
                },
                rocks: [
                    {
                        name: 'Sandstone',
                        description: 'Fine grane size, with several ripples of dune-type',
                        samplesId: ['1A', '1B'],
                        photos: ['http://t2.gstatic.com/images?q=tbn:ANd9GcQxOtM91e-9J8ux5UfJo0x_VR7HHNIB4Tkpm5u9mMYaPwlseS00oLIh0v0T6T8UY4jgodhNOtkDs6tiKw8T9Hg'],
                        directions: {
                            dataType: 'Direction and Dip',
                            data: 'N90E / 20E'
                        }
                    }
                ]
            }
        ]
    }
]

let createUser = routes.map(route => {
    let newUser = new User(route.owner)
    return newUser.save()
        .then(user => {
            return user.username
        })
        .catch(err => {
            throw new Error(`Impossible to add the user: ${err}`)
        })
})

// let createPoint = routes.map(route => {
//     let newPoint = new Point(route.points[0])
//     return newPoint.save()
//         .then(point => {
//             return point.name
//         })
//         .catch(err => {
//             throw new Error(`Impossible to add the point: ${err}`)
//         })
// })

let findUsers = Promise.all(createUser)
    .then(user => {
        return routes.map(route => {
            return User.findOne({username: route.owner.username})
                .then(user => {
                    if(!user) {
                        throw new Error(`unknown user ${route.user.username}`)
                    }
                    return Object.assign({}, route, {owner: user._id})
                })
        })
    })
    .catch(err => {
        throw new Error(err)
    })

let saveRoute = findUsers.then(findUsers => {
    return Promise.all(findUsers)
        .then(routes => {
            return routes.map(route => {
                const newRoute = new Route(route)
                return newRoute.save()

                .catch(err => {
                    throw new Error(err)
                })
            })
        })
})

mongoose.connection.close()