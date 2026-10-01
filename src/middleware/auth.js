const { verifyToken } = require("../utils/jwt");

const authenticate = (event) => {
    const authorization =
        event.headers?.Authorization ||
        event.headers?.authorization;

    if (!authorization) {
        throw new Error("Authorization token is required");
    }

    const token = authorization.startsWith("Bearer ")
        ? authorization.substring(7)
        : authorization;

    try {
        return verifyToken(token);
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};

module.exports = {
    authenticate
};