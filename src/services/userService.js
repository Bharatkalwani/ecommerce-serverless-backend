const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

const registerUser = async ({ name, email, password }) => {
    console.log("Registering user with email:", email);
    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {
        const error = new Error("Email already registered");
        error.statusCode = 409;
        throw error;
    }

    const user = await User.create({
        name,
        email,
        password
    });

    const token = generateToken({
        userId: user.id,
        email: user.email
    });

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token
    };
};


const loginUser = async ({ email, password }) => {

    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const validPassword = await user.validPassword(password);

    if (!validPassword) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken({
        userId: user.id,
        email: user.email
    });

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token
    };
};


const getProfile = async (userId) => {

    const user = await User.findByPk(userId, {
        attributes: ["id", "name", "email", "createdAt"]
    });

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
};


module.exports = {
    registerUser,
    loginUser,
    getProfile
};