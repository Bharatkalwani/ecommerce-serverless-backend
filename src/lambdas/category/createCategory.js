const categoryService = require("../../services/categoryService");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const createCategory = async (event) => {
    try {
        const body = JSON.parse(event.body || "{}");

        const category =
            await categoryService.createCategory(body);

        return successResponse(201, category);
    } catch (error) {
        console.error("Create category error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    createCategory
};