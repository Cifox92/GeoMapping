const mongoose = require("mongoose")
const Schema = mongoose.Schema

const routeSchema = new Schema({
    name: {type: String},
    description: {type: String},
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
})

const Route = mongoose.model("User", routeSchema)

module.exports = Route