#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';


import { CognitoStack } from '../lib/Authentication';
import { APIStack } from '../lib/App/index';
import { CertificateStack } from '../lib/Certificates';

const app = new cdk.App();


let domain = 'liveworks.app'
let hostedZoneId= 'Z075356326HYDU3BBX4VW'
let hostedZoneName = 'liveworks.app'

const certificate = new CertificateStack(app, 'CertificateStack', {
    domain,
    hostedZoneId,
    hostedZoneName
})

/**
 * ex: auth.website.com
 */

const cognito = new CognitoStack(app, 'CognitoStack', {
    domain,
    subDomain: 'auth',
    authCertificate: certificate.wildCardCertificate,
    hostedZone: certificate.hostedZone
})

const api = new APIStack(app, 'APIStack', {
    domain,
    subDomain: 'api',
    hostedZone: certificate.hostedZone,
    certificate: certificate.wildCardCertificate,
    user: {
        Pool: cognito.userPool!,
        Client: cognito.userPoolClient!,
        Domain: cognito.userPoolDomain!
    }
})


// let authRole = cognito.authenticatedRole
// let unAuthRole = cognito.unauthenticatedRole

// const s3 = new S3Stack(app, 'S3Stack', {
//     authenticatedRole: authRole,
//     unauthenticatedRole: unAuthRole
// })

// const rds = new RDSStack(app, 'RDSStack')