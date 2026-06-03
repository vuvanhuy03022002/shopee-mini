const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

  name: String,
  phone: String,
  address: String,

  items: [
    {
      id: String,
      name: String,
      price: Number,
      qty: Number
    }
  ],

  total: Number,

  status: {
    type: String,
    default: 'pending'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('Order', OrderSchema)