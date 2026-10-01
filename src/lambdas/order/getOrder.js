const orderService = require("../../services/orderService");
const { authenticate } = require("../../middleware/auth");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const getOrder = async (event) => {
    try {
        const user = authenticate(event);

        const orderId =
            Number(event.pathParameters.id);

        const order =
            await orderService.getOrderById(
                user.userId,
                orderId
            );

        return successResponse(
            200,
            order
        );

    } catch (error) {
        console.error(
            "Get order error:",
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
    getOrder
};