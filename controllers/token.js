const User = require("../models/user");
const AppException = require("../utils/AppException");
const tokenService = require("../services/tokenService");

async function generateToken(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password)
    throw new AppException(
      400,
      "MISSING_FIELDS",
      "Missing fields. Please provide both username and password."
    );

  // Check Password
  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (!user || user.password !== password)
    throw new AppException(
      401,
      "INVALID_CREDENTIALS",
      "Invalid credentials. The provided username or password is incorrect."
    );

  const tokenString = tokenService.generateAccessToken(username);

  res.status(200).json({
    status: "success",
    message: "Access token generated successfully.",
    data: {
      access_token: tokenString,
      expires_in: 60,
    },
  });
}

module.exports = { generateToken };
