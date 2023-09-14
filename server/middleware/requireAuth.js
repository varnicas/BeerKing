const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const requireAuth = (req, res, next) => {
  const token = req.cookies.access_token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const user = await User.findById(decodedToken._id);
        if (user) res.json({ status: true, user: user });
        else res.json({ status: false });
        next();
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};

module.exports = {
  requireAuth,
};
