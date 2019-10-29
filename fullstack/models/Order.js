const mongoose = require('mongoose')
const Shema = mongoose.Schema


const orderSchema = new Shema({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    list: [
        {
            name: {
                type: String
            },
            quantity: {
                type: Number
            },
            cost: {
                type: Number
            }
        }
    ],
    user: {
        ref: 'users',
        type: Shema.Types.ObjectId
    }
})

module.exports = mongoose.model('orders', orderSchema)