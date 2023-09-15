const BeerModel = require("../models/beerModel");
const UserModel = require("../models/userModel");
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

const saveBeer = async (req, res) => {
  try {
    const beer = await BeerModel.findById(req.body.beerID);
    const user = await UserModel.findById(req.body.userID);
    user.savedBeers.push(beer);
    await user.save();
    res.json({ savedBeers: user.savedBeers });
  } catch (error) {
    res.json(error);
  }
};

const deleteSavedBeer = async (req, res) => {
  try {
    const beer = await BeerModel.findById(req.params.beerID);
    const user = await UserModel.findById(req.params.userID);
    const indexOfBeer = user.savedBeers.indexOf(req.params.beerID);
    if (indexOfBeer > -1) {
      user.savedBeers.splice(indexOfBeer, 1);
    }
    await user.save();
    res.json({ savedBeers: user.savedBeers });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const savedBeersById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedBeers: user.savedBeers });
  } catch (error) {
    res.json(error);
  }
};

const savedBeers = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedBeers = await BeerModel.find({
      _id: { $in: user.savedBeers },
    });

    res.json({ savedBeers });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  addBeer,
  getBeers,
  deleteBeer,
  updateBeer,
  getBeerById,
  saveBeer,
  savedBeersById,
  savedBeers,
  deleteSavedBeer,
};
