const Category = require("../models/Category");

const getCategories = async () => {
    return await Category.findAll({
        order: [["createdAt", "DESC"]]
    });
};

const getCategoryById = async (categoryId) => {
    const category = await Category.findByPk(categoryId);

    if (!category) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
    }

    return category;
};

const createCategory = async ({ name, description }) => {
    if (!name) {
        const error = new Error("Category name is required");
        error.statusCode = 400;
        throw error;
    }

    const existingCategory = await Category.findOne({
        where: { name }
    });

    if (existingCategory) {
        const error = new Error("Category already exists");
        error.statusCode = 409;
        throw error;
    }

    return await Category.create({
        name,
        description
    });
};

const updateCategory = async (categoryId, { name, description }) => {
    const category = await Category.findByPk(categoryId);

    if (!category) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
    }

    if (!name) {
        const error = new Error("Category name is required");
        error.statusCode = 400;
        throw error;
    }

    const existingCategory = await Category.findOne({
        where: {
            name,
            id: {
                [require("sequelize").Op.ne]: categoryId
            }
        }
    });

    if (existingCategory) {
        const error = new Error("Category already exists");
        error.statusCode = 409;
        throw error;
    }

    await category.update({
        name,
        description
    });

    return category;
};

const deleteCategory = async (categoryId) => {
    const category = await Category.findByPk(categoryId);

    if (!category) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
    }

    await category.destroy();

    return {
        message: "Category deleted successfully"
    };
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};