const {
    sendOrderConfirmationEmail
} = require("../../utils/ses");

const sendOrderEmail = async (event) => {

    console.log("SQS Event:", JSON.stringify(event));

    for (const record of event.Records) {

        try {

            const message = JSON.parse(record.body);

            console.log("Order email message:", message);

            const {
                orderId,
                email,
                customerName,
                totalAmount
            } = message;

            await sendOrderConfirmationEmail({
                toEmail: email,
                customerName,
                orderId,
                totalAmount
            });

            console.log(
                `Order confirmation email sent for order ${orderId}`
            );

        } catch (error) {

            console.error(
                "Failed to send order email:",
                error
            );

            throw error;
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            success: true
        })
    };
};

module.exports = {
    sendOrderEmail
};