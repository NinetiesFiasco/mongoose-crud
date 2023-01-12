const mongoose = require('mongoose')

const humanSchema = new mongoose.Schema({
  name: String,
  age: Number,
  createdAd: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  }
})

module.exports = mongoose.model('Human', humanSchema)