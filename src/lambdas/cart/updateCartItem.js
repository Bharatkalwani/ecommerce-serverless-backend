const cartService = require("../../services/cartService");
const { authenticate } = require("../../middleware/auth");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const updateCartItem = async (event) => {
    try {
        const user = authenticate(event);

        const cartItemId =
            Number(event.pathParameters.id);

        const body = JSON.parse(
            event.body || "{}"
        );

        const quantity = Number(body.quantity);

        const cart =
            await cartService.updateCartItem(
                user.userId,
                cartItemId,
                quantity
            );

        return successResponse(200, cart);

    } catch (error) {
        console.error(
            "Update cart item error:",
            error
        );

        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    updateCartItem
};