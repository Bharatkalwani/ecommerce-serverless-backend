const addressService = require("../../services/addressService");
const { authenticate } = require("../../middleware/auth");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const updateAddress = async (event) => {
    try {
        const user = authenticate(event);

        const addressId =
            Number(event.pathParameters.id);

        const body = JSON.parse(
            event.body || "{}"
        );

        const address =
            await addressService.updateAddress(
                user.userId,
                addressId,
                body
            );

        return successResponse(200, address);
    } catch (error) {
        console.error("Update address error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    updateAddress
};