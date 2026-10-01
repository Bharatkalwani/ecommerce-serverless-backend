const addressService = require("../../services/addressService");
const { authenticate } = require("../../middleware/auth");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const deleteAddress = async (event) => {
    try {
        const user = authenticate(event);

        const addressId =
            Number(event.pathParameters.id);

        const result =
            await addressService.deleteAddress(
                user.userId,
                addressId
            );

        return successResponse(200, result);
    } catch (error) {
        console.error("Delete address error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    deleteAddress
};