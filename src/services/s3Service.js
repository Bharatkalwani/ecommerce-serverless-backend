const {
    S3Client,
    PutObjectCommand
} = require("@aws-sdk/client-s3");

const { aws } = require("../config/env");

const s3Client = new S3Client({
    region: aws.region
});

const uploadImage = async ({
    key,
    buffer,
    contentType
}) => {
    const command = new PutObjectCommand({
        Bucket: aws.bucketName,
        Key: key,
        Body: buffer,
        ContentType: contentType
    });

    await s3Client.send(command);

    return {
        bucket: aws.bucketName,
        key
    };
};

module.exports = {
    uploadImage
};