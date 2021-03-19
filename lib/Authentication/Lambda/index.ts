import * as lambda from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'
import * as path from 'path';

const PRE_SIGN_UP = 'PreSignUp'
const CUSTOM_MESSAGE = 'CustomMessage'
const POST_CONFIRMATION = 'PostConfirmation'
const POPULATE_USERS = 'PopulateUsers'

export class CognitoLambda extends cdk.NestedStack {

    public readonly CustomMessage: lambda.IFunction;
    public readonly PostConfirmation: lambda.IFunction;
    public readonly PreSignUp: lambda.IFunction;
    public readonly PopulateUsers: lambda.IFunction;


    constructor(scope: cdk.Construct, id: string, props?: cdk.NestedStack) {
        super(scope, id)


        const preSignUp = new lambda.Function(this, PRE_SIGN_UP, {
            code: lambda.Code.fromAsset(path.join(__dirname, PRE_SIGN_UP)),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_14_X,
            description: 'PreSignUp Lambda for Cognito',
        });

        this.PreSignUp = preSignUp;

        const customMessage = new lambda.Function(this, CUSTOM_MESSAGE, {
            code: lambda.Code.fromAsset(path.join(__dirname, CUSTOM_MESSAGE)),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_14_X,
            description: 'Custom Message Lambda for Cognito',
        });

        this.CustomMessage = customMessage;


        const postConfirmation = new lambda.Function(this, POST_CONFIRMATION, {
            code: lambda.Code.fromAsset(path.join(__dirname, POST_CONFIRMATION)),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_14_X,
            description: 'Post Confirmation Lambda for Cognito',
        });

        this.PostConfirmation = postConfirmation;

        // Is this really needed? I think in the post confirmation lambda we can put that event in some kind of sqs queue, this might not be necessary.
        // This was used in the original stack to put users into ES.
        const populateUsers = new lambda.Function(this, POPULATE_USERS, {
            code: lambda.Code.fromAsset(path.join(__dirname, POPULATE_USERS)),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_14_X,
            description: 'Populate User Lambda for Cognito',
        });

        this.PopulateUsers = populateUsers;
    }
}