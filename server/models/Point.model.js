const mongoose = require("mongoose")
const Schema = mongoose.Schema

const pointSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: { 
        lat: {
            type: String,
            required: true
        }, 
        lng: {
            type: String,
            required: true
        } 
    },
    rocks: [{type: Schema.Types.ObjectId, ref: 'Rock'}]
}, {
    timestamps: true
})

const Point = mongoose.model("Point", pointSchema)

module.exports = Point