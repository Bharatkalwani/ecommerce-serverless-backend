const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/sequelize");

class OrderItem extends Model {}

OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "orders",
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

        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "order_items",
        timestamps: true
    }
);

module.exports = OrderItem;