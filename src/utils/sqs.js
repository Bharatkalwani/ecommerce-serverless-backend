const {
    SQSClient,
    SendMessageCommand
} = require("@aws-sdk/client-sqs");

const { aws } = require("../config/env");

const sqsClient = new SQSClient({
    region: aws.region
});

const sendOrderEmailMessage = async (message) => {
    console.log("SQS Queue URL:", aws.sqsQueueUrl);
    console.log("SQS Queue URL type:", typeof aws.sqsQueueUrl);
   
    const command = new SendMessageCommand({
        QueueUrl: process.env.SQS_ORDER_EMAIL_QUEUE_URL,
        MessageBody: JSON.stringify(message)
    });

    const response = await sqsClient.send(command);

    return response;
};

module.exports = {
    sendOrderEmailMessage
};