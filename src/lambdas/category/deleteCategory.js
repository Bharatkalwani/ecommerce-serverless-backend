const categoryService = require("../../services/categoryService");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const deleteCategory = async (event) => {
    try {
        const categoryId = event.pathParameters.id;

        const result =
            await categoryService.deleteCategory(categoryId);

        return successResponse(200, result);
    } catch (error) {
        console.error("Delete category error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    deleteCategory
};