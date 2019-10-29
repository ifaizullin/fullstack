const mongoose = require('mongoose')
const Shema = mongoose.Schema


const userSchema = new Shema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }    
})

module.exports = mongoose.model('users', userSchema)