const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  cellphone: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  qualification: {
    type: Number,
    required: true
  }
})

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;