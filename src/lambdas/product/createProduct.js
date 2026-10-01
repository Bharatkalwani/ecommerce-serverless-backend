const productService = require("../../services/productService");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const createProduct = async (event) => {
    try {
        const body = JSON.parse(event.body || "{}");

        const product = await productService.createProduct(body);

        return successResponse(201, product);
    } catch (error) {
        console.error("Create product error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Failed to create product"
        );
    }
};

module.exports = {
    createProduct
};