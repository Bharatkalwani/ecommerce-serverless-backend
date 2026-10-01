const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/sequelize");

class Address extends Model {}

Address.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },

        addressLine1: {
            type: DataTypes.STRING,
            allowNull: false
        },

        addressLine2: {
            type: DataTypes.STRING,
            allowNull: true
        },

        city: {
            type: DataTypes.STRING,
            allowNull: false
        },

        state: {
            type: DataTypes.STRING,
            allowNull: false
        },

        postalCode: {
            type: DataTypes.STRING,
            allowNull: false
        },

        country: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "India"
        },

        isDefault: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize,
        tableName: "addresses",
        timestamps: true
    }
);

module.exports = Address;