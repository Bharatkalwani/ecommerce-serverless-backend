const {
    Cart,
    CartItem,
    Product,
    Category
} = require("../models/associations");

const sequelize = require("../db/sequelize");

const getOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({
        where: {
            userId
        }
    });

    if (!cart) {
        cart = await Cart.create({
            userId
        });
    }

    return cart;
};

const getCart = async (userId) => {
    const cart = await getOrCreateCart(userId);

    const cartWithItems = await Cart.findByPk(cart.id, {
        include: [
            {
                model: CartItem,
                as: "items",
                include: [
                    {
                        model: Product,
                        include: [
                            {
                                model: Category,
                                attributes: ["id", "name"]
                            }
                        ]
                    }
                ]
            }
        ]
    });

    let totalAmount = 0;
    let totalItems = 0;

    const items = cartWithItems.items.map((item) => {
        const price = Number(item.Product.price);
        const quantity = item.quantity;
        const subtotal = price * quantity;

        totalAmount += subtotal;
        totalItems += quantity;

        return {
            id: item.id,
            productId: item.productId,
            quantity,
            product: item.Product,
            subtotal
        };
    });

    return {
        cartId: cart.id,
        items,
        totalItems,
        totalAmount
    };
};

const addToCart = async (userId, productId, quantity = 1) => {
    
    if (!Number.isInteger(quantity) || quantity <= 0) {
        const error = new Error(
            "Quantity must be a positive integer"
        );
        error.statusCode = 400;
        throw error;
    }

    const transaction = await sequelize.transaction();

    try {
        const product = await Product.findByPk(productId, {
            transaction
        });

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }

        if (product.stock < quantity) {
            const error = new Error(
                `Only ${product.stock} items available`
            );
            error.statusCode = 400;
            throw error;
        }

        const cart = await getOrCreateCart(userId);

        let cartItem = await CartItem.findOne({
            where: {
                cartId: cart.id,
                productId
            },
            transaction
        });

        if (cartItem) {
            const newQuantity =
                cartItem.quantity + quantity;

            if (newQuantity > product.stock) {
                const error = new Error(
                    `Only ${product.stock} items available`
                );
                error.statusCode = 400;
                throw error;
            }

            await cartItem.update(
                {
                    quantity: newQuantity
                },
                {
                    transaction
                }
            );
        } else {
            cartItem = await CartItem.create(
                {
                    cartId: cart.id,
                    productId,
                    quantity
                },
                {
                    transaction
                }
            );
        }

        await transaction.commit();

        return await getCart(userId);

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const updateCartItem = async (
    userId,
    cartItemId,
    quantity
) => {
    if (!Number.isInteger(quantity) || quantity <= 0) {
        const error = new Error(
            "Quantity must be a positive integer"
        );
        error.statusCode = 400;
        throw error;
    }

    const cart = await Cart.findOne({
        where: {
            userId
        }
    });

    if (!cart) {
        const error = new Error("Cart not found");
        error.statusCode = 404;
        throw error;
    }

    const cartItem = await CartItem.findOne({
        where: {
            id: cartItemId,
            cartId: cart.id
        },
        include: [
            {
                model: Product
            }
        ]
    });

    if (!cartItem) {
        const error = new Error("Cart item not found");
        error.statusCode = 404;
        throw error;
    }

    if (quantity > cartItem.Product.stock) {
        const error = new Error(
            `Only ${cartItem.Product.stock} items available`
        );
        error.statusCode = 400;
        throw error;
    }

    await cartItem.update({
        quantity
    });

    return await getCart(userId);
};

const removeFromCart = async (
    userId,
    cartItemId
) => {
    const cart = await Cart.findOne({
        where: {
            userId
        }
    });

    if (!cart) {
        const error = new Error("Cart not found");
        error.statusCode = 404;
        throw error;
    }

    const cartItem = await CartItem.findOne({
        where: {
            id: cartItemId,
            cartId: cart.id
        }
    });

    if (!cartItem) {
        const error = new Error("Cart item not found");
        error.statusCode = 404;
        throw error;
    }

    await cartItem.destroy();

    return await getCart(userId);
};

const clearCart = async (userId) => {
    const cart = await Cart.findOne({
        where: {
            userId
        }
    });

    if (!cart) {
        return {
            message: "Cart is already empty"
        };
    }

    await CartItem.destroy({
        where: {
            cartId: cart.id
        }
    });

    return {
        message: "Cart cleared successfully"
    };
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};