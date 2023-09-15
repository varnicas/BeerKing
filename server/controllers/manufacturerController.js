const ManufacturerModel = require("../models/manufacturerModel");
const BeerModel = require("../models/beerModel");
const addManufacturer = async (req, res) => {
  try {
    const manufacturer = new ManufacturerModel(req.body);
    if (
      !manufacturer.name ||
      !manufacturer.image ||
      !manufacturer.founded ||
      !manufacturer.country ||
      !manufacturer.description ||
      !manufacturer.linkToPage
    ) {
      return res.json({
        error: "No field can be empty",
      });
    }
    const response = await manufacturer.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

const getManufacturers = async (req, res) => {
  try {
    const response = await ManufacturerModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

const deleteManufacturer = async (req, res) => {
  const id = req.params.id;
  const manufacturer = await ManufacturerModel.findById({ _id: id });
  const isThereBeer = await BeerModel.find({ manufacturer: manufacturer.name });
  if (isThereBeer.length == 0) {
    await ManufacturerModel.findByIdAndDelete({ _id: id })
      .then((res) => res.json(res))
      .catch((err) => res.json(err));
  } else {
    return res.json({
      error: "There is beer from this manufacturer in store",
    });
  }
};

const countArticles = async (req, res) => {
  let articles = {};
  try {
    const products = await BeerModel.find({});
    products.forEach((element) => {
      articles[element.manufacturer] =
        (articles[element.manufacturer] || 0) + 1;
    });
    res.json(articles);
  } catch (error) {
    console.log(error);
  }
};

const updateManufacturer = (req, res) => {
  const id = req.params.id;
  //Check if there is empty field
  const manufacturer = new ManufacturerModel(req.body);
  if (
    !manufacturer.name ||
    !manufacturer.image ||
    !manufacturer.founded ||
    !manufacturer.country ||
    !manufacturer.description ||
    !manufacturer.linkToPage
  ) {
    return res.json({
      error: "No field can be empty",
    });
  }
  ManufacturerModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      founded: req.body.founded,
      country: req.body.country,
      description: req.body.description,
      image: req.body.image,
      linkToPage: req.body.linkToPage,
    }
  )
    .then((manufacturer) => res.json(manufacturer))
    .catch((err) => res.json(err));
};

const getManufacturerById = (req, res) => {
  const id = req.params.id;
  ManufacturerModel.findById({ _id: id })
    .then((manufacturer) => res.json(manufacturer))
    .catch((err) => res.json(err));
};

module.exports = {
  addManufacturer,
  getManufacturers,
  deleteManufacturer,
  updateManufacturer,
  getManufacturerById,
  countArticles,
};
