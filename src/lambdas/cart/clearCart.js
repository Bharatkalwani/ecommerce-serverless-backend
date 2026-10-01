const cartService = require("../../services/cartService");
const { authenticate } = require("../../middleware/auth");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const clearCart = async (event) => {
    try {
        const user = authenticate(event);

        const result =
            await cartService.clearCart(
                user.userId
            );

        return successResponse(200, result);

    } catch (error) {
        console.error(
            "Clear cart error:",
            error
        );

        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    clearCart
};