const {
    SESClient,
    SendEmailCommand
} = require("@aws-sdk/client-ses");

const { aws } = require("../config/env");

const sesClient = new SESClient({
    region: aws.region
});

const sendOrderConfirmationEmail = async ({
    toEmail,
    customerName,
    orderId,
    totalAmount
}) => {

    const subject = `Order #${orderId} Placed Successfully`;

    const textBody = `
Hello ${customerName},

Your order has been placed successfully.

Order ID: #${orderId}
Total Amount: ₹${totalAmount}

Thank you for shopping with us.

Regards,
Ecommerce Team
`;

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Order Confirmation</title>
</head>

<body>

    <h2>Order Placed Successfully 🎉</h2>

    <p>Hello ${customerName},</p>

    <p>
        Your order has been placed successfully.
    </p>

    <h3>Order Details</h3>

    <p>
        <strong>Order ID:</strong> #${orderId}
    </p>

    <p>
        <strong>Total Amount:</strong> ₹${totalAmount}
    </p>

    <p>
        Thank you for shopping with us.
    </p>

    <br />

    <p>
        Regards,<br />
        Ecommerce Team
    </p>

</body>
</html>
`;

    const command = new SendEmailCommand({
        Source: aws.sesFromEmail,

        Destination: {
            ToAddresses: [toEmail]
        },

        Message: {
            Subject: {
                Charset: "UTF-8",
                Data: subject
            },

            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: textBody
                },

                Html: {
                    Charset: "UTF-8",
                    Data: htmlBody
                }
            }
        }
    });

    const response = await sesClient.send(command);

    return response;
};

module.exports = {
    sendOrderConfirmationEmail
};