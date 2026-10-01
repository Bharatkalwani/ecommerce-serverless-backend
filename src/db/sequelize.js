const { Sequelize } = require("sequelize");
const { db } = require("../config/env");

const sequelize = new Sequelize(
    db.name,
    db.user,
    db.password,
    {
        host: db.host,
        port: db.port,
        dialect: "postgres",

        logging: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = sequelize;