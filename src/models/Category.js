const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/sequelize");

class Category extends Model {}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "categories",
        timestamps: true
    }
);

module.exports = Category;