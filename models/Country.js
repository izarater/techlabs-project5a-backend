const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const Country = mongoose.model('Country', countrySchema);

export default Country;