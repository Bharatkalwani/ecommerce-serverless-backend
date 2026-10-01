const addressService = require("../../services/addressService");
const { authenticate } = require("../../middleware/auth");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const createAddress = async (event) => {
    try {
        const user = authenticate(event);

        const body = JSON.parse(
            event.body || "{}"
        );

        const address =
            await addressService.createAddress(
                user.userId,
                body
            );

        return successResponse(201, address);
    } catch (error) {
        console.error("Create address error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    createAddress
};