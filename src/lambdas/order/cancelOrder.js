const orderService = require("../../services/orderService");
const { authenticate } = require("../../middleware/auth");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const cancelOrder = async (event) => {
    try {
        const user = authenticate(event);

        const orderId =
            Number(event.pathParameters.id);

        const order =
            await orderService.cancelOrder(
                user.userId,
                orderId
            );

        return successResponse(
            200,
            order
        );

    } catch (error) {
        console.error(
            "Cancel order error:",
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
    cancelOrder
};