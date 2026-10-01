const productService = require("../../services/productService");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const getProductById = async (event) => {
    try {
        const productId = event.pathParameters?.id;

        const product = await productService.getProductById(productId);

        return successResponse(200, product);
    } catch (error) {
        console.error("Get product error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Failed to get product"
        );
    }
};

module.exports = {
    getProductById
};