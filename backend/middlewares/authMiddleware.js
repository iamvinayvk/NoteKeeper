const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  //   console.log(req.headers.auhtorization.split(" ")[1]);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //   console.log(req.headers.authorization);
      console.log(req.headers.authorization);
      token = req.headers.authorization.split(" ")[1];
      //   console.log("yaha");
      console.log(token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error(`Not Authorized , token failed`);
    }
  }
  if (!token) {
    res.status(401);
    throw new Error(`Not Authorized , no token`);
  }
});

module.exports = { protect };
