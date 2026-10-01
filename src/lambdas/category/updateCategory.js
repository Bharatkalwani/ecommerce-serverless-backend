const categoryService = require("../../services/categoryService");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const updateCategory = async (event) => {
    try {
        const categoryId = event.pathParameters.id;

        const body = JSON.parse(event.body || "{}");

        const category =
            await categoryService.updateCategory(
                categoryId,
                body
            );

        return successResponse(200, category);
    } catch (error) {
        console.error("Update category error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    updateCategory
};