"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("addresses", {
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
                onDelete: "CASCADE"
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false
            },

            phone: {
                type: Sequelize.STRING,
                allowNull: false
            },

            addressLine1: {
                type: Sequelize.STRING,
                allowNull: false
            },

            addressLine2: {
                type: Sequelize.STRING,
                allowNull: true
            },

            city: {
                type: Sequelize.STRING,
                allowNull: false
            },

            state: {
                type: Sequelize.STRING,
                allowNull: false
            },

            postalCode: {
                type: Sequelize.STRING,
                allowNull: false
            },

            country: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "India"
            },

            isDefault: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
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
        await queryInterface.dropTable("addresses");
    }
};