const addressService = require("../../services/addressService");
const { authenticate } = require("../../middleware/auth");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const getAddress = async (event) => {
    try {
        const user = authenticate(event);

        const addressId =
            Number(event.pathParameters.id);

        const address =
            await addressService.getAddressById(
                user.userId,
                addressId
            );

        return successResponse(200, address);
    } catch (error) {
        console.error("Get address error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    getAddress
};