const mongoose = require("mongoose");

const establishmentSchema = new mongoose.Schema({
  establishment_name: {
    type: String,
    required: true
  },
  establishment_type: {
    type: String,
    required: true
  },
  establishment_id: {
    type: Number,
    required: true
  },
  city_id: {
    type: Number,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  schedule: {
    type: Date,
    required: true
  },
  qualification: {
    type: Number,
    required: true
  },
  phone: {
    type: Number,
    required: true
  }
})

const Establishment = mongoose.model('Establishment', establishmentSchema);

module.exports = Establishment;