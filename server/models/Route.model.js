const mongoose = require("mongoose")
const Schema = mongoose.Schema

const routeSchema = new Schema({
    name: {type: String},
    description: {type: String},
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    points: [{type: Schema.Types.ObjectId, ref: 'Point'}]
}, {
    timestamps: true
})

const Route = mongoose.model("Route", routeSchema)

module.exports = Route