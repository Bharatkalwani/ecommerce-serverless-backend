const cartService = require("../../services/cartService");
const { authenticate } = require("../../middleware/auth");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const getCart = async (event) => {
    try {
        const user = authenticate(event);

        const cart = await cartService.getCart(
            user.userId
        );

        return successResponse(200, cart);

    } catch (error) {
        console.error("Get cart error:", error);

        return errorResponse(
            error.statusCode || 401,
            error.message || "Unauthorized"
        );
    }
};

module.exports = {
    getCart
};