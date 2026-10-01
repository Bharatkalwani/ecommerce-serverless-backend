const cartService = require("../../services/cartService");
const { authenticate } = require("../../middleware/auth");
const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const addToCart = async (event) => {
    try {
        const user = authenticate(event);
console.log("User authenticated:", user);
        const body = JSON.parse(
            event.body || "{}"
        );

        const productId = Number(body.productId);
        const quantity = Number(body.quantity || 1);

        if (!productId) {
            return errorResponse(
                400,
                "productId is required"
            );
        }

        const cart = await cartService.addToCart(
            user.userId,
            productId,
            quantity
        );

        return successResponse(200, cart);

    } catch (error) {
        console.error("Add to cart error:", error);

        return errorResponse(
            error.statusCode || 500,
            error.message || "Internal server error"
        );
    }
};

module.exports = {
    addToCart
};