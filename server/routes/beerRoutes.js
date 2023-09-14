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
} = require("../controllers/beerController");

router.get("/getBeers", getBeers);
router.post("/addBeer", addBeer);
router.delete("/deleteBeer/:id", deleteBeer);
router.put("/updateBeer/:id", updateBeer);
router.get("/getBeerById/:id", getBeerById);
module.exports = router;
