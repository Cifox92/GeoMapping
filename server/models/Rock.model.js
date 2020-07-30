const mongoose = require("mongoose")
const Schema = mongoose.Schema

const rockSchema = new Schema({
    pointId: {type: String}, 
    name: {
        type: String,
        required: true
    },
    rockType: {
        type: String,
        enum: ['Sedimentary', 'Igneous', 'Metamorphic'],
        required: true
    },
    description: {type: String},
    samplesId: {type: String},
    photos: {type: Array},
    directions: {
        dataType: {
            type: String,
            enum: ['Direction and Dip', 'Lineation']
        },
        data: {type: String}
    }
}, {
    timestamps: true
})

const Rock = mongoose.model("Rock", rockSchema)

module.exports = Rock