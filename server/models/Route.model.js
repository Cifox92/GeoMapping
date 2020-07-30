const mongoose = require("mongoose")
const Schema = mongoose.Schema

const routeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'A new route!'
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    points: [{type: Schema.Types.ObjectId, ref: 'Point'}]
}, {
    timestamps: true
})

const Route = mongoose.model("Route", routeSchema)

module.exports = Route