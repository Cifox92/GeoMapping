const mongoose = require("mongoose")
const Schema = mongoose.Schema

const pointSchema = new Schema({
    name: {type: String},
    route:{ type: Schema.Types.ObjectId, ref: 'Route' },
    location: { 
        lat: {type: String}, 
        lon: {type: String} },
    rocks: [{
        name: {type: String},
        description: {type: String},
        samplesId: {type: Array},
        photos: {type: Array},
        directions: {
            dataType: {
                type: {type: String},
                enum: ['putas rocas', 'putas rocas 2 el regreso'],
                default: 'putas rocas'
            },
            data: {
                type: String
            }

        }
    }]
}, {
    timestamps: true
})

const Point = mongoose.model("User", pointSchema)

module.exports = Point