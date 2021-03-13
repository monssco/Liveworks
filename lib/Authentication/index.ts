import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as iam from '@aws-cdk/aws-iam'

import {CognitoLambda} from './Lambda/index'
import { ICertificate } from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';


// Most of stack copied from: https://stackoverflow.com/questions/55784746/how-to-create-cognito-identitypool-with-cognito-userpool-as-one-of-the-authentic


const USER_POOL_NAME = `USER_POOL`

/**
 * Used if we are using a custom domain for the user pools
 */
interface CognitoStackProps {
    certificate?: ICertificate
    domainName?: string
    hostedZone?: route53.IHostedZone
}

export class CognitoStack extends cdk.Stack {

    // These roles will be used across the app for accessing various resources.
    public readonly unauthenticatedRole: iam.Role
    public readonly authenticatedRole: iam.Role

    public readonly userPool: cognito.IUserPool

    constructor(scope: cdk.Construct, id: string, props?: CognitoStackProps) {
        super(scope, id);

        // Nested stack that creates all the lambda functions.
        const lambdas = new CognitoLambda(this, 'CognitoLambdaStack')

        // The code that defines your stack goes here
        let userPool = new cognito.UserPool(this, USER_POOL_NAME, {
            userPoolName: USER_POOL_NAME,
            standardAttributes: {
                // email: {
                //     required: true,
                //     mutable: false
                // },
                // givenName: {
                //     required: true,
                //     mutable: true
                // },
                // familyName: {
                //     required: true,
                //     mutable: true
                // }
            },
            passwordPolicy: {
                minLength: 6,
                requireLowercase: false,
                requireDigits: false,
                requireSymbols: false,
                requireUppercase: false
            },
            enableSmsRole: true,
            lambdaTriggers: {
                customMessage:lambdas.CustomMessage,
                preSignUp: lambdas.PreSignUp,
                postConfirmation: lambdas.PostConfirmation
            },
            signInAliases: {
                email: true,
                phone: true,
                username: false,
                preferredUsername: false,
            },
            accountRecovery: cognito.AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA,
            signInCaseSensitive: true,
            selfSignUpEnabled: true,
            
            // userVerification: {                              
                
            // }
            // emailSettings: {
            //     from: 'info@monss.co',
            //     replyTo: 'info@monss.co'
            // }
        });

        this.userPool = userPool

        /**
         * If were given certificate and domain name, then add it to the user pool.
         */
        if (props?.certificate && props?.domainName && props?.hostedZone) {
            const userPoolDomain = new cognito.UserPoolDomain(this, 'UserPoolDomain', {
                userPool,
                customDomain: {
                    certificate: props.certificate,
                    domainName: props.domainName 
                }
            })

            // new route53.ARecord(this, 'UserPoolCloudFrontAliasRecord', {
            //     zone: props.hostedZone,
            //     recordName: props.domainName,
            //     target: route53.RecordTarget.fromAlias(new route53_targets.UserPoolDomainTarget(userPoolDomain)),
            // });

        }

        const cfnUserPool = userPool.node.defaultChild as cognito.CfnUserPool;

        // cfnUserPool.policies = {
        //     passwordPolicy: {
        //         minimumLength: 8,
        //         requireLowercase: false,
        //         requireNumbers: false,
        //         requireUppercase: false,
        //         requireSymbols: false
        //     }
        // };
        const userPoolClient = new cognito.UserPoolClient(this, 'MyUserPoolClient', {
            generateSecret: true,
            userPool: userPool,
            userPoolClientName: 'MyUserPoolClientName'
        });
        const identityPool = new cognito.CfnIdentityPool(this, 'MyCognitoIdentityPool', {
            allowUnauthenticatedIdentities: false,
            cognitoIdentityProviders: [{
                clientId: userPoolClient.userPoolClientId,
                providerName: userPool.userPoolProviderName,
            }]
        });

        this.unauthenticatedRole = new iam.Role(this, 'CognitoDefaultUnauthenticatedRole', {
            assumedBy: new iam.FederatedPrincipal('cognito-identity.amazonaws.com', {
                "StringEquals": { "cognito-identity.amazonaws.com:aud": identityPool.ref },
                "ForAnyValue:StringLike": { "cognito-identity.amazonaws.com:amr": "unauthenticated" },
            }, "sts:AssumeRoleWithWebIdentity"),
        });
        
        this.unauthenticatedRole.addToPolicy(new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
                "mobileanalytics:PutEvents",
                "cognito-sync:*"
            ],
            resources: ["*"],
        }));


        this.authenticatedRole = new iam.Role(this, 'CognitoDefaultAuthenticatedRole', {
            assumedBy: new iam.FederatedPrincipal('cognito-identity.amazonaws.com', {
                "StringEquals": { "cognito-identity.amazonaws.com:aud": identityPool.ref },
                "ForAnyValue:StringLike": { "cognito-identity.amazonaws.com:amr": "authenticated" },
            }, "sts:AssumeRoleWithWebIdentity"),
        });

        this.authenticatedRole.addToPolicy(new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
                "mobileanalytics:PutEvents",
                "cognito-sync:*",
                "cognito-identity:*"
            ],
            resources: ["*"],
        }));


        const defaultPolicy = new cognito.CfnIdentityPoolRoleAttachment(this, 'DefaultValid', {
            identityPoolId: identityPool.ref,
            roles: {
                'unauthenticated': this.unauthenticatedRole.roleArn,
                'authenticated': this.authenticatedRole.roleArn
            }
        });

        
        
    }
}