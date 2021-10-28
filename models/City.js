const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country_code: {
    type: Number,
    required: true
  }
  /*country_id: {
    _id: {
      type: ObjectId,
    }
  }*/
})

//{"_id":{"$oid":"61792b8553a58b2c8357fe4f"},"code":{"$numberInt":"57"},"name":"Colombia","__v":{"$numberInt":"0"}}

const City = mongoose.model('City', citySchema);

module.exports = City;