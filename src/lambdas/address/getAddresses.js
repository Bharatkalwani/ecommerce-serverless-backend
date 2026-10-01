const addressService = require("../../services/addressService");
const { authenticate } = require("../../middleware/auth");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const getAddresses = async (event) => {
    try {
        const user = authenticate(event);

        const addresses =
            await addressService.getAddresses(
                user.userId
            );

        return successResponse(200, addresses);
    } catch (error) {
        console.error("Get addresses error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    getAddresses
};