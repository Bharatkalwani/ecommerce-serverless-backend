const productService = require("../../services/productService");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const deleteProduct = async (event) => {
    try {
        const productId = event.pathParameters?.id;

        await productService.deleteProduct(productId);

        return successResponse(200, {
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error("Delete product error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Failed to delete product"
        );
    }
};

module.exports = {
    deleteProduct
};