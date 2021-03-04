import { PostConfirmationTriggerHandler } from 'aws-lambda';
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
let sqs = new AWS.SQS();


/**
 * https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-post-confirmation.html
 * Amazon Cognito invokes this trigger after a new user is confirmed, allowing
 * you to send custom messages or to add custom logic. For example, you could
 * use this trigger to gather new user data and populate your database with it.
 *The request contains the current attributes for the confirmed user.
 */

export const handler:PostConfirmationTriggerHandler  = async (event, context, callback) => {
	console.log(JSON.stringify(event, null));

	try{
		// read event from dynamodb
		var presignupEvent = ( await documentClient.get({
			TableName : process.env.PreSignUpEventBuffer,
			Key: {
				username: event.userName
			}
		}).promise() ) ['Item']['event'];

		// put that event onto the SQS Queue.

		var params = {
            MessageBody: JSON.stringify(presignupEvent), /* required */
            QueueUrl: process.env.EventQueueURL /* required */
        };

		await sqs.sendMessage(params).promise();

		return event;
	}catch(error){
		console.log('error', error);
		return null;
	}
};