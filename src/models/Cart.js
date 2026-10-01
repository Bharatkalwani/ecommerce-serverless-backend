const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/sequelize");

class Cart extends Model {}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "users",
                key: "id"
            }
        }
    },
    {
        sequelize,
        tableName: "carts",
        timestamps: true
    }
);

module.exports = Cart;