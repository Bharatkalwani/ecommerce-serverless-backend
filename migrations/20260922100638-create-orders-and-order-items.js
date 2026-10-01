"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("orders", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },

            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT"
            },

            shippingAddressId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "addresses",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT"
            },

            shippingName: {
                type: Sequelize.STRING,
                allowNull: false
            },

            shippingPhone: {
                type: Sequelize.STRING,
                allowNull: false
            },

            shippingAddressLine1: {
                type: Sequelize.STRING,
                allowNull: false
            },

            shippingAddressLine2: {
                type: Sequelize.STRING,
                allowNull: true
            },

            shippingCity: {
                type: Sequelize.STRING,
                allowNull: false
            },

            shippingState: {
                type: Sequelize.STRING,
                allowNull: false
            },

            shippingPostalCode: {
                type: Sequelize.STRING,
                allowNull: false
            },

            shippingCountry: {
                type: Sequelize.STRING,
                allowNull: false
            },

            totalAmount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },

            status: {
                type: Sequelize.ENUM(
                    "pending",
                    "confirmed",
                    "shipped",
                    "delivered",
                    "cancelled"
                ),
                allowNull: false,
                defaultValue: "pending"
            },

            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },

            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });

        await queryInterface.createTable("order_items", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },

            orderId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "orders",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },

            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "products",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT"
            },

            productName: {
                type: Sequelize.STRING,
                allowNull: false
            },

            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },

            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            subtotal: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },

            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },

            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("order_items");
        await queryInterface.dropTable("orders");

        await queryInterface.sequelize.query(
            'DROP TYPE IF EXISTS "enum_orders_status";'
        );
    }
};