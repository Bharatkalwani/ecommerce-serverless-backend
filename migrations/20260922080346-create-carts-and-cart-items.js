"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("carts", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },

            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                references: {
                    model: "users",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
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

        await queryInterface.createTable("cart_items", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },

            cartId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "carts",
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
                onDelete: "CASCADE"
            },

            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
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

        await queryInterface.addIndex(
            "cart_items",
            ["cartId", "productId"],
            {
                unique: true,
                name: "cart_items_cart_product_unique"
            }
        );
    },

    async down(queryInterface) {
        await queryInterface.dropTable("cart_items");
        await queryInterface.dropTable("carts");
    }
};