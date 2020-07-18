const mongoose = require("mongoose")
const Schema = mongoose.Schema

const pointSchema = new Schema({
    name: {type: String},
    location: { 
        lat: {type: String}, 
        lon: {type: String} 
    },
    rocks: [{
        name: {type: String},
        description: {type: String},
        samplesId: {type: Array},
        photos: {type: Array},
        directions: {
            dataType: {
                type: String,
                enum: ['Direction and Dip'],
                default: 'Direction and Dip'
            },
            data: {
                type: String
            }
        }
    }]
}, {
    timestamps: true
})

const Point = mongoose.model("Point", pointSchema)

module.exports = Point