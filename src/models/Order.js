const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/sequelize");

class Order extends Model {}

Order.init(
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

        shippingAddressId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "addresses",
                key: "id"
            }
        },

        shippingName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        shippingPhone: {
            type: DataTypes.STRING,
            allowNull: false
        },

        shippingAddressLine1: {
            type: DataTypes.STRING,
            allowNull: false
        },

        shippingAddressLine2: {
            type: DataTypes.STRING,
            allowNull: true
        },

        shippingCity: {
            type: DataTypes.STRING,
            allowNull: false
        },

        shippingState: {
            type: DataTypes.STRING,
            allowNull: false
        },

        shippingPostalCode: {
            type: DataTypes.STRING,
            allowNull: false
        },

        shippingCountry: {
            type: DataTypes.STRING,
            allowNull: false
        },

        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM(
                "pending",
                "confirmed",
                "shipped",
                "delivered",
                "cancelled"
            ),
            allowNull: false,
            defaultValue: "pending"
        }
    },
    {
        sequelize,
        tableName: "orders",
        timestamps: true
    }
);

module.exports = Order;