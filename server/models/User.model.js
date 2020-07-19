const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type: String},
    password: {type: String},
    avatar: {
        type: String,
        default: 'https://static.thenounproject.com/png/1974868-200.png'
    },
    aboutMe: {type: String}
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User