const mongoose = require("mongoose");
const { Schema } = mongoose;

const manufacturerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    unique: true,
    required: true,
  },
  founded: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  linkToPage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const ManufacturerModel = mongoose.model("manufacturers", manufacturerSchema);

module.exports = ManufacturerModel;
