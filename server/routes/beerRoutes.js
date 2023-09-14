const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
const cors = require("cors");
const {
  addBeer,
  getBeers,
  deleteBeer,
  updateBeer,
  getBeerById,
  saveBeer,
  savedBeersById,
  savedBeers,
} = require("../controllers/beerController");

router.get("/getBeers", getBeers);
router.post("/addBeer", addBeer);
router.delete("/deleteBeer/:id", deleteBeer);
router.put("/updateBeer/:id", updateBeer);
router.get("/getBeerById/:id", getBeerById);
router.put("/saveBeer", saveBeer);
router.get("/savedBeers/:userID", savedBeersById);
router.get("/getSavedBeers/:userID", savedBeers);
module.exports = router;
