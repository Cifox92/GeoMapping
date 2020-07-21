const mongoose = require("mongoose")
const Schema = mongoose.Schema

const pointSchema = new Schema({
    name: {type: String},
    location: { 
        lat: {type: String}, 
        lng: {type: String} 
    },
    rocks: [{type: Schema.Types.ObjectId, ref: 'Rock'}]
}, {
    timestamps: true
})

const Point = mongoose.model("Point", pointSchema)

module.exports = Point