const Sequelize = require("sequelize");
const db = require("../utils/database");
const User = require("./user");

const Datastore = db.define("Datastore", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    key: Sequelize.STRING,
    value: Sequelize.STRING,
    username: Sequelize.STRING,
});

Datastore.belongsTo(User, {
    foreignKey: "username",
    targetKey: "username",
});

User.hasMany(Datastore, {
    foreignKey: "username",
    sourceKey: "username",
});

module.exports = Datastore;
