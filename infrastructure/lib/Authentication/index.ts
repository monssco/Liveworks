import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as iam from '@aws-cdk/aws-iam'
import * as route53 from '@aws-cdk/aws-route53';
import * as acm from '@aws-cdk/aws-certificatemanager';

import { OAuthScope, StringAttribute } from '@aws-cdk/aws-cognito';
import { CognitoIdentityServiceProvider } from 'aws-sdk';



// Most of stack copied from: https://stackoverflow.com/questions/55784746/how-to-create-cognito-identitypool-with-cognito-userpool-as-one-of-the-authentic


const USER_POOL_NAME = `USER_POOL` + process.env.NODE_ENV

/**
 * Used if we are using a custom domain for the user pools
 */
interface CognitoStackProps {
    authCertificate: acm.DnsValidatedCertificate
    hostedZone: route53.IHostedZone
    domain: string
    subDomain: string
}

export class CognitoStack extends cdk.Stack {

    // These roles will be used across the app for accessing various resources.
    public readonly unauthenticatedRole: iam.Role
    public readonly authenticatedRole: iam.Role
    public readonly userPool?: cognito.UserPool
    public readonly userPoolClient?: cognito.UserPoolClient
    public readonly userPoolDomain?: cognito.UserPoolDomain

    constructor(scope: cdk.Construct, id: string, props?: CognitoStackProps) {
        super(scope, id);

        // The code that defines your stack goes here
        let userPool = new cognito.UserPool(this, USER_POOL_NAME, {
            // If stack gets destroyed, user pool gets deleted
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            userPoolName: USER_POOL_NAME + this.toString(),
            customAttributes: {
                type: new StringAttribute({minLen: 1, maxLen: 255, }), // this is the account type attribute
                invite_code: new StringAttribute({minLen: 1, maxLen: 255, }), // Unique invite code that was assigned to them by the backend.
            },
            passwordPolicy: {
                minLength: 6,
                requireLowercase: false,
                requireDigits: false,
                requireSymbols: false,
                requireUppercase: false
            },
            signInAliases: {
                email: true,
                phone: false,
                username: false,
                preferredUsername: false,
            },
            accountRecovery: cognito.AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA,
            signInCaseSensitive: false,
            selfSignUpEnabled: true
        });

        this.userPool = userPool

        const userPoolClient = new cognito.UserPoolClient(this, 'MyUserPoolClient'+process.env.NODE_ENV, {
            generateSecret: false,
            userPool: userPool,
            userPoolClientName: 'WebClient' + this.toString(),
            refreshTokenValidity: cdk.Duration.days(7),
            supportedIdentityProviders: [cognito.UserPoolClientIdentityProvider.COGNITO],
            disableOAuth: true,
        });

        this.userPoolClient = userPoolClient

        // Create outputs for connecting
        new cdk.CfnOutput(this, 'User Pool region', { value: this.region });
        new cdk.CfnOutput(this, 'User Pool id', { value: userPool.userPoolId });
        new cdk.CfnOutput(this, 'User Pool client id', { value: userPoolClient.userPoolClientId })
    }
}