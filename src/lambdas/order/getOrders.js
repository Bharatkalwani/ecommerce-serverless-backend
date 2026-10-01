const orderService = require("../../services/orderService");
const { authenticate } = require("../../middleware/auth");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const getOrders = async (event) => {
    try {
        const user = authenticate(event);

        const orders =
            await orderService.getOrders(
                user.userId
            );

        return successResponse(
            200,
            orders
        );

    } catch (error) {
        console.error(
            "Get orders error:",
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
    getOrders
};