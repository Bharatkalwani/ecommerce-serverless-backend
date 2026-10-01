const productService = require("../../services/productService");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const getProducts = async (event) => {
    try {
        const products = await productService.getProducts();

        return successResponse(200, products);
    } catch (error) {
        console.error("Get products error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Failed to get products"
        );
    }
};

module.exports = {
    getProducts
};