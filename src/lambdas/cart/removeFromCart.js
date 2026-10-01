const cartService = require("../../services/cartService");
const { authenticate } = require("../../middleware/auth");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const removeFromCart = async (event) => {
    try {
        const user = authenticate(event);

        const cartItemId =
            Number(event.pathParameters.id);

        const cart =
            await cartService.removeFromCart(
                user.userId,
                cartItemId
            );

        return successResponse(200, cart);

    } catch (error) {
        console.error(
            "Remove cart item error:",
            error
        );

        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    removeFromCart
};