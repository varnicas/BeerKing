const UserModel = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const response = await UserModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getUsers,
};
