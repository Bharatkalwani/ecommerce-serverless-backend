const crypto = require("crypto");

const {
    uploadImage
} = require("../../services/s3Service");

const {
    successResponse,
    errorResponse
} = require("../../utils/response");

const uploadProductImage = async (event) => {
    try {
        if (!event.body) {
            return errorResponse(
                400,
                "Image data is required"
            );
        }

        const contentType =
            event.headers?.["content-type"] ||
            event.headers?.["Content-Type"] ||
            "application/octet-stream";

        const extensionMap = {
            "image/jpeg": "jpg",
            "image/png": "png",
            "image/webp": "webp"
        };

        const extension =
            extensionMap[contentType] || "bin";

        const fileName =
            `${crypto.randomUUID()}.${extension}`;

        const key = `products/${fileName}`;

        const fileBuffer = event.isBase64Encoded
            ? Buffer.from(event.body, "base64")
            : Buffer.from(event.body, "binary");

        const result = await uploadImage({
            key,
            buffer: fileBuffer,
            contentType
        });

        return successResponse(200, {
            message: "Image uploaded successfully",
            key: result,
            contentType
        });

    } catch (error) {
        console.error("S3 upload error:", error);

        return errorResponse(
            500,
            "Failed to upload image"
        );
    }
};

module.exports = {
    uploadProductImage
};