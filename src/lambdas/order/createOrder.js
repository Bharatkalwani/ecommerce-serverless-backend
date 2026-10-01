const orderService = require("../../services/orderService");
const { authenticate } = require("../../middleware/auth");

const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const createOrder = async (event) => {
    try {
        const user = authenticate(event);

        const body = JSON.parse(
            event.body || "{}"
        );

        const addressId =
            Number(body.addressId);

        if (!addressId) {
            return errorResponse(
                400,
                "addressId is required"
            );
        }

        const order =
            await orderService.createOrder(
                user.userId,
                addressId
            );

        return successResponse(
            201,
            order
        );

    } catch (error) {
        console.error(
            "Create order error:",
            error
        );

        return errorResponse(
            error.statusCode || 500,
            error.message ||
                "Internal server error"
        );
    }
};

module.exports = {
    createOrder
};