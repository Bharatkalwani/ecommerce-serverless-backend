const User = require("./User");
const Product = require("./Product");
const Category = require("./Category");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const Address = require("./Address");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// Category → Product
Category.hasMany(Product, {
    foreignKey: "categoryId"
});

Product.belongsTo(Category, {
    foreignKey: "categoryId"
});

// User → Cart
User.hasOne(Cart, {
    foreignKey: "userId"
});

Cart.belongsTo(User, {
    foreignKey: "userId"
});

// User → Addresses
User.hasMany(Address, {
    foreignKey: "userId",
    as: "addresses",
    onDelete: "CASCADE"
});

Address.belongsTo(User, {
    foreignKey: "userId"
});

// Cart → CartItems
Cart.hasMany(CartItem, {
    foreignKey: "cartId",
    as: "items",
    onDelete: "CASCADE"
});

CartItem.belongsTo(Cart, {
    foreignKey: "cartId"
});

// Product → CartItems
Product.hasMany(CartItem, {
    foreignKey: "productId"
});

CartItem.belongsTo(Product, {
    foreignKey: "productId"
});

User.hasMany(Order, {
    foreignKey: "userId",
    as: "orders"
});

Order.belongsTo(User, {
    foreignKey: "userId"
});

Address.hasMany(Order, {
    foreignKey: "shippingAddressId"
});

Order.belongsTo(Address, {
    foreignKey: "shippingAddressId"
});

Order.hasMany(OrderItem, {
    foreignKey: "orderId",
    as: "items",
    onDelete: "CASCADE"
});

OrderItem.belongsTo(Order, {
    foreignKey: "orderId"
});

Product.hasMany(OrderItem, {
    foreignKey: "productId"
});

OrderItem.belongsTo(Product, {
    foreignKey: "productId"
});


module.exports = {
    User,
    Product,
    Category,
    Cart,
    CartItem,
    Address,
    Order,
    OrderItem
};