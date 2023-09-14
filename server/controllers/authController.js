const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const test = (req, res) => {
  res.json("test is working");
};

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "5d" });
};

//Register endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Check if name was entered
    if (!name || name.length < 5) {
      return res.json({
        error: "Name is required and must be at least 5 characters",
      });
    }

    const testMail = /\S+@\S+\.\S+/.test(email);
    if (!testMail) {
      return res.json({
        error: "Mail format is not valid",
      });
    }

    //Check if email was entered
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }

    //Check if password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and must be at least 6 characters long",
      });
    }

    //Check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);
    //Create user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: createToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.log(error);
  }
};

//Login endpoint

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "User not found",
      });
    }

    //Check if email was entered
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }

    //Check if password is correct
    const match = await comparePassword(password, user.password);
    const token = createToken(user._id);
    if (match) {
      res.cookie("access_token", token, {
        httpOnly: false,
        maxAge: 4200000,
      });
      res.status(200).json({ user: user, created: true, token: token });
    }
    if (!match) {
      res.json({
        error: "Passwords do not match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
};
