const userService = require("../../services/userService");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const login = async (event) => {
    try {
        const body = JSON.parse(event.body || "{}");
        const result = await userService.loginUser(body);
        return successResponse(200, result);

    } catch (error) {
        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    login
};