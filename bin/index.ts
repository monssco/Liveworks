#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';


import { CognitoStack } from '../lib/Authentication';
import { APIStack } from '../lib/API/index';
import { CertificateStack } from '../lib/Certificates';

const app = new cdk.App();

console.log("Node env", process.env.DB_HOST);

/**
 * Dev and Pros have different hosted zones.
 * Might be a good idea to also have different sub domains for prod and dev.
 */

// let domain = (process.env.NODE_ENV as string) === 'production' ? 'liveworks.app' : 'dev.liveworks.app'
// let hostedZoneId= (process.env.NODE_ENV as string) === 'production' ? 'Z075356326HYDU3BBX4VW' :'Z09276711TGY8X8UFUXOZ'
// let hostedZoneName = domain


// const certificate = new CertificateStack(app, 'CertificateStack', {
//     domain,
//     hostedZoneId,
//     hostedZoneName
// })

/**
 * ex: auth.website.com
 */

// const cognito = new CognitoStack(app, 'CognitoStack', {
//     domain,
//     subDomain: 'auth',
//     authCertificate: certificate.wildCardCertificate,
//     hostedZone: certificate.hostedZone
// })

// const api = new APIStack(app, 'APIStack', {
//     domain,
//     subDomain: 'api',
//     hostedZone: certificate.hostedZone,
//     certificate: certificate.wildCardCertificate,
//     user: {
//         Pool: cognito.userPool!,
//         Client: cognito.userPoolClient!,
//         Domain: cognito.userPoolDomain!
//     }
// })


// let authRole = cognito.authenticatedRole
// let unAuthRole = cognito.unauthenticatedRole

// const s3 = new S3Stack(app, 'S3Stack', {
//     authenticatedRole: authRole,
//     unauthenticatedRole: unAuthRole
// })

// const rds = new RDSStack(app, 'RDSStack')