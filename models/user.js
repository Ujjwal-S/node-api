const Sequelize = require("sequelize");
const db = require("../utils/database");

const User = db.define("User", {
    username: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: Sequelize.STRING,
    full_name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    gender: {
      type: Sequelize.ENUM("female", "male", "third_gender"),
    },
});

module.exports = User;
