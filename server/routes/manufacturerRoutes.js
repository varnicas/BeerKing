const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const cors = require("cors");
const {
  addManufacturer,
  getManufacturers,
  updateManufacturer,
  deleteManufacturer,
  getManufacturerById,
  countArticles,
} = require("../controllers/manufacturerController");

router.get("/getManufacturers", getManufacturers);
router.post("/addManufacturer", addManufacturer);
router.delete("/deleteManufacturer/:id", deleteManufacturer);
router.put("/updateManufacturer/:id", updateManufacturer);
router.get("/getManufacturerById/:id", getManufacturerById);
router.get("/countArticles", countArticles);

module.exports = router;
