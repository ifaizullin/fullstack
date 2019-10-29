const mongoose = require('mongoose')
const Shema = mongoose.Schema


const categorySchema = new Shema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    user: {
        ref: 'users',
        type: Shema.Types.ObjectId
    }
})

module.exports = mongoose.model('categories', categorySchema)