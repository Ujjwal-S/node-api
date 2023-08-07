const AppException = require("./AppException");

const VALID_GENDER_VALUES = ["male", "female", "third_gender"];

/**
 * Validates and formats registration data before use.
 * @param {object} data - Registration data to be validated.
 * @returns {object} - Validated and formatted data.
 * @throws {AppException} - If validation fails.
 */
function validatedRegistrationData(data) {
  const { username, email, password, full_name, age, gender } = data;

  // Check for required fields: username, email, password, full_name
  if (!username || !email || !password || !full_name) {
    throw new AppException(
      400,
      "INVALID_REQUEST",
      "Invalid request. Please provide all required fields: username, email, password, full_name."
    );
  }

  // Check if age is valid (age is optional from what I understood from notion doc.)
  if (age !== undefined && !(Number.isInteger(parseInt(age)) && age > 0)) {
    throw new AppException(
      400,
      "INVALID_AGE",
      "Invalid age value. Age must be a positive integer."
    );
  }

  // Check for valid Password
  if (!isPasswordValid(password)) {
    throw new AppException(
      400,
      "INVALID_PASSWORD",
      "The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters."
    );
  }

  // Check for the presence of gender field
  if (!gender) {
    throw new AppException(
      400,
      "GENDER_REQUIRED",
      "Gender field is required. Please specify the gender (male, female, third_gender)."
    );
  }

  // Check if gender is one of the valid values
  if (!VALID_GENDER_VALUES.includes(gender)) {
    throw new AppException(
      400,
      "INVALID_GENDER",
      "Invalid gender value. Gender must be one of: male, female, third_gender."
    );
  }

  const validatedData = {
    username,
    email,
    password,
    full_name,
    gender,
  };

  if (age !== undefined) {
    validatedData.age = parseInt(age);
  }

  return validatedData;
}

function isPasswordValid(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
  return passwordRegex.test(password);
}

module.exports = validatedRegistrationData;
