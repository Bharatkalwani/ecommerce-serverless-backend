const userService = require("../../services/userService");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const register = async (event) => {
    try {
        const body = JSON.parse(event.body || "{}");
        const result = await userService.registerUser(body);
        return successResponse(201, result);

    } catch (error) {
        console.error("Register error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    register
};