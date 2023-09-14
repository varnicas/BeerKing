const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");
const { requireAuth } = require("../middleware/requireAuth");
const { getUsers } = require("../controllers/usersController");
//middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

router.get("/test", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.get("/users", getUsers);
router.post("/", requireAuth);

module.exports = router;
