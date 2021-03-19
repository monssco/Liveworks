import { PostConfirmationTriggerHandler } from 'aws-lambda';
const AWS = require('aws-sdk');


/**
 * https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-post-confirmation.html
 * Amazon Cognito invokes this trigger after a new user is confirmed, allowing
 * you to send custom messages or to add custom logic. For example, you could
 * use this trigger to gather new user data and populate your database with it.
 *The request contains the current attributes for the confirmed user.
 */

export const handler:PostConfirmationTriggerHandler  = async (event, context, callback) => {
	console.log(JSON.stringify(event, null));

	// Here, you can do things like inserting user into tables or sending onboarding messages etc.

	return event;
};