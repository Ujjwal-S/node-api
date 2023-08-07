const User = require("../models/user");
const AppException = require("../utils/AppException");
const validatedRegistrationData = require("../utils/validateRegistrationData");

async function registerUser(req, res, next) {
  const userDataToBeRegistered = validatedRegistrationData(req.body);

  try {
    // Create user in Database.
    const user = await User.create(userDataToBeRegistered);

    const data = { ...user.toJSON() };
    delete data.password;
    delete data.createdAt;
    delete data.updatedAt;

    res.status(200).json({
      status: "success",
      message: "User successfully registered!",
      data,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      // Unique constraint check
      const fieldname = error.fields.hasOwnProperty("username")
        ? "username"
        : "email";
      const errorCode =
        fieldname === "username" ? "USERNAME_EXISTS" : "EMAIL_EXISTS";
      const message =
        fieldname === "username"
          ? "The provided username is already taken. Please choose a different username."
          : "The provided email is already registered. Please use a different email address.";

      throw new AppException(400, errorCode, message);
    }

    throw new AppException(); // Default Exception 500
  }
}

module.exports = { registerUser };
