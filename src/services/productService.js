const {
    Product,
    Category
} = require("../models/associations");

const getProducts = async () => {
    return await Product.findAll({
        include: [
            {
                model: Category,
                attributes: ["id", "name"]
            }
        ],
        order: [["createdAt", "DESC"]]
    });
};

const getProductById = async (productId) => {
    const product = await Product.findByPk(productId, {
        include: [
            {
                model: Category,
                attributes: ["id", "name"]
            }
        ]
    });

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    return product;
};

const createProduct = async (data) => {
    const {
        name,
        productUrl,
        price,
        stock,
        description,
        categoryId
    } = data;

    const category = await Category.findByPk(categoryId);

    if (!category) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
    }

    return await Product.create({
        name,
        productUrl,
        price,
        stock,
        description,
        categoryId
    });
};

const updateProduct = async (productId, data) => {
    const product = await Product.findByPk(productId);

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    const {
        name,
        productUrl,
        price,
        stock,
        description,
        categoryId
    } = data;

    if (categoryId) {
        const category = await Category.findByPk(categoryId);

        if (!category) {
            const error = new Error("Category not found");
            error.statusCode = 404;
            throw error;
        }
    }

    await product.update({
        name,
        productUrl,
        price,
        stock,
        description,
        categoryId
    });

    return product;
};

const deleteProduct = async (productId) => {
    const product = await Product.findByPk(productId);

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    await product.destroy();

    return {
        message: "Product deleted successfully"
    };
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};