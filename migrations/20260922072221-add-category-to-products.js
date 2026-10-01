"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn(
            "products",
            "categoryId",
            {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "categories",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT"
            }
        );
    },

    async down(queryInterface) {
        await queryInterface.removeColumn(
            "products",
            "categoryId"
        );
    }
};