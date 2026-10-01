const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/sequelize");

class CartItem extends Model {}

CartItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "carts",
                key: "id"
            }
        },

        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "products",
                key: "id"
            }
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    },
    {
        sequelize,
        tableName: "cart_items",
        timestamps: true,

        indexes: [
            {
                unique: true,
                fields: ["cartId", "productId"]
            }
        ]
    }
);

module.exports = CartItem;