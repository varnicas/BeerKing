const mongoose = require("mongoose");
const { Schema } = mongoose;

const beerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  percentage: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});

const BeerModel = mongoose.model("beers", beerSchema);

module.exports = BeerModel;
