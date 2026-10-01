const userService = require("../../services/userService");
const { authenticate } = require("../../middleware/auth");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const myProfile = async (event) => {

    try {

        const decodedToken = authenticate(event);

        const user = await userService.getProfile(
            decodedToken.userId
        );

        return successResponse(200, user);

    } catch (error) {

        console.error("Profile error:", error);

        return errorResponse(
            error.statusCode || 401,
            error.message || "Unauthorized"
        );
    }
};

module.exports = {
    myProfile
};