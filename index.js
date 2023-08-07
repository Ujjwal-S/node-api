const express = require("express");
const helmet = require("helmet");
const sequelize = require("./utils/database");
const catchAsync = require("./utils/catchAsync");
const AppException = require("./utils/AppException");
const { registerUser } = require("./controllers/users.js");
const { generateToken } = require("./controllers/token.js");

const app = express();
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});


// Routes
app.post("/api/register", catchAsync(registerUser));
app.post("/api/token", catchAsync(generateToken));
app.use("/api/data", require("./routes/data"));



// Global error handling middleware.
// This middleware handles both custom 'AppException' errors and generic errors.
app.use((err, req, res, next) => {
  // Destructure 'AppException' fields or provide default values for generic errors.
  const {
    httpStatus = 500,
    errorCode = "INTERNAL_SERVER_ERROR",
    message = "An internal server error occurred. Please try again later.",
  } = err instanceof AppException ? err : {};

  console.log("message", message);
  console.log("err", err);

  res.status(httpStatus).json({
    status: "error",
    code: errorCode,
    message: message,
  });
});


// Start Server and Sync DB
const maxRetries = 5;
async function attemptConnection(retries) {
  try {
    await sequelize.sync();
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("App Listening on port 3000");
    });
  } catch (err) {
    if (retries > 0) {
      console.log(
        `DB connection failed. Retrying in 5 seconds. Retries left: ${retries}`
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await attemptConnection(retries - 1);
    } else {
      console.error(
        "Maximum retries reached. Unable to establish a database connection."
      );
    }
  }
}

attemptConnection(maxRetries);
