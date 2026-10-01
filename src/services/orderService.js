const {
    Order,
    OrderItem,
    Cart,
    CartItem,
    Product,
    Address
} = require("../models/associations");
const { sendOrderEmailMessage } = require("../utils/sqs");
const { aws } = require("../config/env");

const sequelize = require("../db/sequelize");

const createOrder = async (userId, addressId) => {

    const transaction = await sequelize.transaction();

    try {

        // 1. Get user's address
        const address = await Address.findOne({
            where: {
                id: addressId,
                userId
            },
            transaction
        });

        if (!address) {
            const error = new Error(
                "Shipping address not found"
            );

            error.statusCode = 404;
            throw error;
        }

        // 2. Get user's cart
        const cart = await Cart.findOne({
            where: {
                userId
            },
            include: [
                {
                    model: CartItem,
                    as: "items",
                    include: [
                        {
                            model: Product
                        }
                    ]
                }
            ],
            transaction
        });

        if (!cart || cart.items.length === 0) {
            const error = new Error("Cart is empty");

            error.statusCode = 400;
            throw error;
        }

        // 3. Validate stock and calculate total
        let totalAmount = 0;

        for (const item of cart.items) {

            const product = item.Product;

            if (!product) {
                const error = new Error(
                    `Product ${item.productId} not found`
                );

                error.statusCode = 404;
                throw error;
            }

            if (product.stock < item.quantity) {
                const error = new Error(
                    `Insufficient stock for ${product.name}`
                );

                error.statusCode = 400;
                throw error;
            }

            const price = Number(product.price);

            totalAmount += price * item.quantity;
        }

        // 4. Create order
        const order = await Order.create(
            {
                userId,

                shippingAddressId: address.id,

                shippingName: address.name,

                shippingPhone: address.phone,

                shippingAddressLine1:
                    address.addressLine1,

                shippingAddressLine2:
                    address.addressLine2,

                shippingCity:
                    address.city,

                shippingState:
                    address.state,

                shippingPostalCode:
                    address.postalCode,

                shippingCountry:
                    address.country,

                totalAmount,

                status: "pending"
            },
            {
                transaction
            }
        );

        // 5. Create order items + reduce stock
        for (const item of cart.items) {

            const product = item.Product;

            const price = Number(product.price);

            const subtotal =
                price * item.quantity;

            await OrderItem.create(
                {
                    orderId: order.id,

                    productId: product.id,

                    productName: product.name,

                    price,

                    quantity: item.quantity,

                    subtotal
                },
                {
                    transaction
                }
            );

            await product.decrement(
                "stock",
                {
                    by: item.quantity,
                    transaction
                }
            );
        }

        // 6. Clear cart
        await CartItem.destroy({
            where: {
                cartId: cart.id
            },
            transaction
        });

        // 7. Commit DB transaction
        await transaction.commit();

        // =========================================
        // TRANSACTION IS FINISHED HERE
        // Don't rollback after this point
        // =========================================

        // 8. Send email event to SQS
        try {

            await sendOrderEmailMessage({
                eventType: "ORDER_PLACED",

                orderId: order.id,

                userId,

                email: aws.sesToEmail,

                customerName: address.name,

                totalAmount: order.totalAmount
            });

        } catch (emailError) {

            console.error(
                "Order created but failed to send email event:",
                emailError
            );

            // Don't throw here for now.
            // Order is already successfully created.
        }

        // 9. Return order
        return await getOrderById(
            userId,
            order.id
        );

    } catch (error) {

        // Rollback ONLY if transaction is still active
        if (!transaction.finished) {
            await transaction.rollback();
        }

        throw error;
    }
};

const getOrders = async (userId) => {
    return await Order.findAll({
        where: {
            userId
        },
        include: [
            {
                model: OrderItem,
                as: "items"
            }
        ],
        order: [
            ["createdAt", "DESC"]
        ]
    });
};

const getOrderById = async (
    userId,
    orderId
) => {
    const order = await Order.findOne({
        where: {
            id: orderId,
            userId
        },
        include: [
            {
                model: OrderItem,
                as: "items"
            }
        ]
    });

    if (!order) {
        const error = new Error(
            "Order not found"
        );
        error.statusCode = 404;
        throw error;
    }

    return order;
};

const cancelOrder = async (
    userId,
    orderId
) => {
    const transaction =
        await sequelize.transaction();

    try {
        const order = await Order.findOne({
            where: {
                id: orderId,
                userId
            },
            include: [
                {
                    model: OrderItem,
                    as: "items"
                }
            ],
            transaction
        });

        if (!order) {
            const error = new Error(
                "Order not found"
            );
            error.statusCode = 404;
            throw error;
        }

        if (
            order.status !== "pending" &&
            order.status !== "confirmed"
        ) {
            const error = new Error(
                "Order cannot be cancelled"
            );
            error.statusCode = 400;
            throw error;
        }

        // Restore stock
        for (const item of order.items) {
            const product =
                await Product.findByPk(
                    item.productId,
                    {
                        transaction
                    }
                );

            if (product) {
                await product.increment(
                    "stock",
                    {
                        by: item.quantity,
                        transaction
                    }
                );
            }
        }

        await order.update(
            {
                status: "cancelled"
            },
            {
                transaction
            }
        );

        await transaction.commit();

        return order;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const updateOrderStatus = async (
    orderId,
    status
) => {
    const validStatuses = [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled"
    ];

    if (!validStatuses.includes(status)) {
        const error = new Error(
            "Invalid order status"
        );
        error.statusCode = 400;
        throw error;
    }

    const order = await Order.findByPk(
        orderId
    );

    if (!order) {
        const error = new Error(
            "Order not found"
        );
        error.statusCode = 404;
        throw error;
    }

    await order.update({
        status
    });

    return order;
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    cancelOrder,
    updateOrderStatus
};