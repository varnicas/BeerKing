const BeerModel = require("../models/beerModel");

const addBeer = async (req, res) => {
  try {
    const beer = new BeerModel(req.body);
    //Check if there is empty field
    if (
      !beer.name ||
      !beer.image ||
      !beer.manufacturer ||
      !beer.percentage ||
      !beer.type ||
      !beer.price
    ) {
      return res.json({
        error: "No field can be empty",
      });
    }
    const response = await beer.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

const getBeers = async (req, res) => {
  try {
    const response = await BeerModel.find({});
    res.json(response);
  } catch (error) {
    res.json(err);
  }
};

const deleteBeer = (req, res) => {
  const id = req.params.id;
  BeerModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
};

const updateBeer = (req, res) => {
  const id = req.params.id;
  //Check if there is empty field
  const beer = new BeerModel(req.body);
  if (
    !beer.name ||
    !beer.image ||
    !beer.manufacturer ||
    !beer.percentage ||
    !beer.type ||
    !beer.price
  ) {
    return res.json({
      error: "No field can be empty",
    });
  }
  BeerModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      price: req.body.price,
      percentage: req.body.percentage,
      type: req.body.type,
      image: req.body.image,
      manufacturer: req.body.manufacturer,
    }
  )
    .then((beers) => res.json(beers))
    .catch((err) => res.json(err));
};

const getBeerById = (req, res) => {
  const id = req.params.id;
  BeerModel.findById({ _id: id })
    .then((beers) => res.json(beers))
    .catch((err) => res.json(err));
};

module.exports = {
  addBeer,
  getBeers,
  deleteBeer,
  updateBeer,
  getBeerById,
};
