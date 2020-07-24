const mongoose = require("mongoose")
const Schema = mongoose.Schema

const rockSchema = new Schema({
    pointId: {type: String}, 
    name: {type: String},
    rockType: {type: String},
    description: {type: String},
    samplesId: {type: String},
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
}, {
    timestamps: true
})

const Rock = mongoose.model("Rock", rockSchema)

module.exports = Rock