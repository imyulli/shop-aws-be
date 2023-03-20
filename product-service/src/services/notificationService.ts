import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const sns = new SNSClient({region: process.env.REGION});

export const sendSNSNotification = async (product) => {
    try {
        const params = {
            Subject: 'New product created',
            Message: `Product ${JSON.stringify(product)} is created.`,
            TopicArn: process.env.SNS_ARN,
            MessageAttributes: {
                title: {
                DataType: 'String',
                StringValue: product.title
                },
                price: {
                DataType: 'Number',
                StringValue: product.price
                }
            }
        };
    
        const data = await sns.send(new PublishCommand(params));
        console.log("SNS Success. ",  data);
    } catch (err) {
        console.log("ERROR while trying to send SNS message", err);
    }
}