const successResponse = (statusCode, data) => {
    return {
        statusCode,
        body: JSON.stringify({
            success: true,
            data
        })
    };
};

const errorResponse = (statusCode, message) => {
    return {
        statusCode,
        body: JSON.stringify({
            success: false,
            message
        })
    };
};

module.exports = {
    successResponse,
    errorResponse
};