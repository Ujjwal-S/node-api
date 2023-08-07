const Datastore = require("../models/dataStore");
const AppException = require("../utils/AppException");
const tokenService = require("../services/tokenService");


// Store Data
async function storeData(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    throw new AppException(400, "MISSING_TOKEN", "No access token provided.");

  const validToken = await tokenService.verifyAccessToken(token);
  if (!validToken)
    throw new AppException(
      401,
      "INVALID_TOKEN",
      "Invalid access token provided."
    );

  const { key, value } = req.body;
  if (!key || typeof key !== "string")
    throw new AppException(
      400,
      "INVALID_KEY",
      "The provided key is not valid or missing."
    );
  if (!value || typeof value !== "string")
    throw new AppException(
      400,
      "INVALID_VALUE",
      "The provided value is not valid or missing."
    );

  // Check if this user already created this key
  const keyInDb = await Datastore.findOne({
    where: {
      username: validToken.username,
      key: key,
    },
  });
  if (keyInDb)
    throw new AppException(
      400,
      "KEY_EXISTS",
      "The provided key already exists in the database. To update an existing key, use the update API."
    );

  // save in db
  await Datastore.create({
    key: key,
    value: value,
    username: validToken.username,
  });

  res.status(200).json({
    status: "success",
    message: "Data stored successfully.",
  });
}


// Retrive Data
async function retriveDataByKey(req, res, next) {
  const { key } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    throw new AppException(400, "MISSING_TOKEN", "No access token provided.");

  const validToken = await tokenService.verifyAccessToken(token);
  if (!validToken)
    throw new AppException(
      401,
      "INVALID_TOKEN",
      "Invalid access token provided."
    );

  const data = await Datastore.findOne({
    where: {
      username: validToken.username,
      key: key,
    },
  });
  if (!data)
    throw new AppException(
      404,
      "KEY_NOT_FOUND",
      "The provided key does not exist in the database."
    );

  res.status(200).json({
    status: "success",
    data: {
      key,
      value: data.value,
    },
  });
}


// Update Data
async function updateData(req, res, next) {
  const { key } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    throw new AppException(400, "MISSING_TOKEN", "No access token provided.");

  const validToken = await tokenService.verifyAccessToken(token);
  if (!validToken)
    throw new AppException(
      401,
      "INVALID_TOKEN",
      "Invalid access token provided."
    );

  const { value } = req.body;

  const existingData = await Datastore.findOne({
    where: {
      username: validToken.username,
      key: key,
    },
  });

  if (!existingData)
    throw new AppException(
      404,
      "KEY_NOT_FOUND",
      "The provided key does not exist in the database."
    );

  await existingData.update({
    value: value,
  });

  res.status(200).json({
    status: "success",
    message: "Data updated successfully.",
  });
}


// Delete Data
async function deleteData(req, res, next) {
  const { key } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  if (!token)
    throw new AppException(400, "MISSING_TOKEN", "No access token provided.");

  const validToken = await tokenService.verifyAccessToken(token);
  if (!validToken)
    throw new AppException(
      401,
      "INVALID_TOKEN",
      "Invalid access token provided."
    );

  // Find the record using the composite condition
  const existingData = await Datastore.findOne({
    where: {
      username: validToken.username,
      key: key,
    },
  });

  if (!existingData)
    throw new AppException(
      404,
      "KEY_NOT_FOUND",
      "The provided key does not exist in the database."
    );

  // Delete the record based on the unique identifier (id)
  await existingData.destroy();

  res.status(200).json({
    status: "success",
    message: "Data deleted successfully.",
  });
}

module.exports = { storeData, retriveDataByKey, updateData, deleteData };
