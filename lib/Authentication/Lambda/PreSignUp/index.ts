import { PreSignUpTriggerEvent, PreSignUpTriggerHandler } from 'aws-lambda';
const AWS = require('aws-sdk');
var ses = new AWS.SES({region: 'us-east-1'});

const documentClient = new AWS.DynamoDB.DocumentClient();

const userType = {
	WORKER: "worker",
	VENUE: "venue"
};

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

 // There is some major fuckery going on in here. No need for half of this shit to be done. Remove it and clean it as you desire.

export const handler: PreSignUpTriggerHandler  = async (event, context, callback) => {
	// console.log( JSON.stringify(event, null, 0) );

	// if( validate(event, callback) ) {
	// 	await documentClient.put({
	// 		TableName: process.env.PreSignUpEventBuffer,
	// 		Item: {
	// 			'username': event.userName,
	// 			'event': event
	// 		}
	// 	}).promise();
	// 	await sendEmail(event.userName);

	// 	return event;
	// }else {
	// 	return null;
	// }

	return event;
}


// function generateParams (event: PreSignUpTriggerEvent) {
// 	// Values are verified in the PreSignup trigger
// 	// Thus values should be assumed to exit and be valid (depending on if its a worker vs. venue)
// 	const { userPoolId, userName, triggerSource } = event;
// 	const { clientId } = event.callerContext;
// 	const {phone_number, email} = event.request.userAttributes;
// 	const { given_name, family_name, birthdate} = event.request.validationData;
// 	const ipAddress = event.request.validationData["signup_ip_address"];

// 	const user_type = event.request.userAttributes["custom:user_type"];

// 	const signupDateTime = event.request.validationData["signup_date_time"];
// 	const venueName = event.request.validationData["venue_name"];

// 	//  Generate parameter for stripe account creation
// 	var stripeParams;

// 	if (user_type === 'worker') {
// 		var workerBD = new Date( birthdate );

// 		stripeParams = {
// 			type: 'custom',
// 			country: 'CA',
// 			email: email,
// 			business_type: 'individual',
// 			default_currency: 'CAD',
// 			individual : {
// 				dob: {
// 					day: workerBD.getDate(),
// 					month: workerBD.getMonth(),
// 					year: workerBD.getFullYear()
// 				},
// 				email: email,
// 				first_name: given_name,
// 				last_name: family_name,
// 				phone: phone_number
// 			},
// 			metadata: {
// 				userName: userName,
// 				triggerSource: triggerSource,
// 				userPoolId: userPoolId,
// 				clientId: clientId,
// 				userType: user_type,
// 				signUp: signupDateTime
// 			},
// 			tos_acceptance: {
// 				date: new Date(signupDateTime).getTime() / 1000,                  // Stripe API only accepts epoch time,
// 				ip: ipAddress,
// 				user_agent: clientId
// 			}
// 		};

// 	}else if (user_type === 'venue') {

// 		stripeParams = {
// 			description : `Customer account for ${venueName}`,
// 			email : email,
// 			name : venueName,
// 			phone : phone_number,
// 			metadata: {
// 				userName: userName,
// 				triggerSource: triggerSource,
// 				userPoolId: userPoolId,
// 				clientId: clientId,
// 				userType: user_type,
// 				repFirstName: given_name,
// 				repLastName: family_name,
// 				repBirthDate: birthdate,
// 				signUp: signupDateTime,
// 				ip: ipAddress,
// 				user_agent: clientId
// 			}
// 		};

// 	}

// 	return  {                                       //  Flatten all details
// 		userPoolId: userPoolId,
// 		user_name: userName,
// 		triggerSource: triggerSource,

// 		clientId: clientId,

// 		given_name: given_name,
// 		family_name: family_name,
// 		phone_number: phone_number,
// 		birthdate: birthdate,
// 		email: email,

// 		ipAddress: ipAddress,

// 		user_type: user_type,

// 		signupDateTime: signupDateTime,

// 		venueName: venueName,

// 		stripeParams: stripeParams
// 	};

// }


// function validate(event, callback) {
	/**
	 * ValidatorSet is a set of "validators"; each corresponding to an attributes (custom or standard) in the Cognito User Pool
	 * Use the validatorSet to validate all the attributes prior to making stateful changes (RDS, DynamoDB, etc)
	 * These attributes are explicity stated under the read only attributes of the App Client in the CF template
	 */
	// const validatorSet = generateValidatorSet();

	// // user_type exists and is a valid value
	// const user_type = event.request.userAttributes['custom:user_type'];
	// if( !user_type )
	// 	callback('user_type is missing');    
	// if( !userTypeAtomicValidator(user_type) )
	// 	callback(' user_type is not valid');

	// // apply validators against user attributes
	// return validatorSet.every( validator => {
	// 	// apply validator if applicable to this user_type
	// 	if( validator.attributeFor.includes(user_type) ){
	// 		const attributeName = validator.attributeName;
	// 		const attributeValue = event.request.validationData[attributeName];

	// 		// check for existance of attribute value
	// 		if( !attributeValue )
	// 			callback(attributeName + " is missing");

	// 		// Apply the atomicValidator against the attribute
	// 		if( !validator.atomicValidator(attributeValue) )
	// 			callback(attributeName + " is not valid")

	// 		return true;
	// 	}else { // skip if not applicable to this user_type
	// 		return true;
	// 	}
	// });
// }


// function firstAndLastNameAtomicValidator(value, userType) {
// 	if(
// 		// Only contains ASCII english alphabets
// 		// https://stackoverflow.com/questions/14313183/javascript-regex-how-do-i-check-if-the-string-is-ascii-only
// 		// https://stackoverflow.com/questions/23476532/check-if-string-contains-only-letters-in-javascript
// 		!/^[a-zA-Z]+$/.test(value)
// 		||
// 		// length of last name =< 255, https://stackoverflow.com/questions/20958/list-of-standard-lengths-for-database-fields
// 		255 < value.length
// 	) {
// 		return false;
// 	}

// 	return true; 
// }

// function birthdateAtomicValidator(dateString) {
// 	if( !/^(\d{4})-((0[1-9])|(1[0-2]))-(0[1-9]|[12][0-9]|3[01])$/.test(dateString) ) return false

// 	// https://stackoverflow.com/questions/18758772/how-do-i-validate-a-date-in-this-format-yyyy-mm-dd-using-jquery
// 	var regEx = /^\d{4}-\d{2}-\d{2}$/;
// 	if(!dateString.match(regEx)) return false;  // Invalid format
// 	var d = new Date(dateString);
// 	var dNum = d.getTime();
// 	if(!dNum && dNum !== 0) return false;       // NaN value, Invalid date


// 	// check to make sure they are over 18

// 	return true; 
// }

// function signupdatetimeAtomicValidator(dateString) {

// 	// check to make sure that the date is today

// 	return true; 
// }

// function emailAtomicValidator(email) {
// 	// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// 	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 	return re.test(email);
// }

// function phoneNumberAtomicValidator(phone_number) {
// 	// nothing as of yet
// 	// Assuming Cognito Checks the Phone number before sending it to PreSignup Trigger
// 	return true;
// }

// function signupIPAddressAtomicValidator(IPAddress) {
// 	return true;
// }

// function venueNameAtomicValidator(name) {
// 	return true;
// }

// function userTypeAtomicValidator(type) {
// 	if (
// 		type === userType.VENUE
// 		||
// 		type === userType.WORKER
// 	) {
// 		return true;
// 	}else {
// 		return false;
// 	}

// }

// function generateValidatorSet() {
// 	return [
// 		{
// 			attributeName: "given_name",
// 			dataType: "String",                     //  dataType -> String | Number | DateTime | Boolean; Possible Cognito Attribute datatypes see https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_SchemaAttributeType.html
// 			isCustom: false,                        //  indicates if attribute is a custom attribute
// 			attributeFor: [                         //  the attribute belongs to users of type worker and venue
// 				userType.WORKER,
// 				userType.VENUE
// 			],
// 			value: null,                            //  the value (of type dataType) associate with key (given_name)
// 			atomicValidator: firstAndLastNameAtomicValidator
// 		},
// 		{
// 			attributeName: "family_name",
// 			dataType: "String",
// 			isCustom: false,
// 			attributeFor: [
// 				userType.WORKER,
// 				userType.VENUE
// 			],
// 			value: null,
// 			atomicValidator: firstAndLastNameAtomicValidator
// 		},
// 		{
// 			attributeName: "birthdate",
// 			dataType: "String",                     // cognito only supports DateTime (YYYY-MM-DD hh:mm:ss)
// 			isCustom: false,
// 			attributeFor: [
// 				userType.WORKER,
// 				userType.VENUE
// 			],
// 			value: null,
// 			atomicValidator: birthdateAtomicValidator
// 		},
// 		{
// 			attributeName: "signup_date_time",
// 			dataType: "DateTime",
// 			isCustom: true,
// 			attributeFor: [
// 				userType.WORKER,
// 				userType.VENUE
// 			],
// 			value: null,
// 			atomicValidator: signupdatetimeAtomicValidator
// 		},
// 		{
// 			attributeName: "signup_ip_address",
// 			dataType: "String", 
// 			isCustom: true,
// 			attributeFor: [
// 				userType.WORKER,
// 				userType.VENUE
// 			],
// 			value: null,
// 			atomicValidator: signupIPAddressAtomicValidator
// 		},
// 		{
// 			attributeName: "venue_name",
// 			dataType: "String", 
// 			isCustom: true, 
// 			attributeFor: [
// 				userType.VENUE
// 			],
// 			value: null,
// 			atomicValidator: venueNameAtomicValidator
// 		},
// 		// {
// 		//     attributeName: "user_type",
// 		//     dataType: "String", 
// 		//     isCustom: true, 
// 		//     attributeFor: [
// 		//         userType.WORKER,
// 		//         userType.VENUE
// 		//     ],
// 		//     value: null,
// 		//     atomicValidator: userTypeAtomicValidator
// 		// }
// 	];
// }

// function sendEmail(userName: string) {
// 	var params = {
// 		Destination: {
// 			ToAddresses: [
// 				process.env.ToAddressEmailAddress
// 			]
// 		},
// 		Message: {
// 			Body: {
// 				Text: {
// 					Data: "The user name is: " + userName
// 				}
// 			},
// 			Subject: {
// 				Data: "Added user: " + userName
// 			}
// 		},
// 		Source: process.env.SourceEmailAddress
// 	};
// 	return ses.sendEmail(params).promise();
// }
