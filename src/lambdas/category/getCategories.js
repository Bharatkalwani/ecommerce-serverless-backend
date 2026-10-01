const categoryService = require("../../services/categoryService");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const getCategories = async () => {
    try {
        const categories = await categoryService.getCategories();

        return successResponse(200, categories);
    } catch (error) {
        console.error("Get categories error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    getCategories
};