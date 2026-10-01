const categoryService = require("../../services/categoryService");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const getCategory = async (event) => {
    try {
        const categoryId = event.pathParameters.id;

        const category =
            await categoryService.getCategoryById(categoryId);

        return successResponse(200, category);
    } catch (error) {
        console.error("Get category error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    getCategory
};