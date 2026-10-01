const productService = require("../../services/productService");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const updateProduct = async (event) => {
    try {
        const productId = event.pathParameters?.id;

        const body = JSON.parse(event.body || "{}");

        const product = await productService.updateProduct(
            productId,
            body
        );

        return successResponse(200, product);
    } catch (error) {
        console.error("Update product error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Failed to update product"
        );
    }
};

module.exports = {
    updateProduct
};