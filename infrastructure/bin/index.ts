#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';


import { CognitoStack } from '../lib/Authentication';
// import { APIStack } from '../lib/API/index';
import { CertificateStack } from '../lib/Certificates';
import { ComputeStack } from '../lib/Compute';

import {HostedZone} from '@aws-cdk/aws-route53'

const app = new cdk.App();


/**
 * Dev and Pros have different hosted zones.
 * Might be a good idea to also have different sub domains for prod and dev.
 * 
 * These values are created manually via the console.
 */

let domain = (process.env.NODE_ENV as string) === 'production' ? 'console.liveworks.app' : 'staging.liveworks.app'
let hostedZoneId = (process.env.NODE_ENV as string) === 'production' ? 'Z02071773CFSNKRSOXC06' :'Z0205955UI4J3WWT8NQM'
let hostedZoneName = domain

// const prodZone = HostedZone.fromHostedZoneAttributes(app, 'Production Zone', {
//     zoneName: 'console.liveworks.app',
//     hostedZoneId: 'Z02071773CFSNKRSOXC06',
// });

const cognito = new CognitoStack(app, 'CognitoStack' + process.env.NODE_ENV, 
// {
//     domain,
//     subDomain: 'auth',
//     authCertificate: certificate.wildCardCertificate,
//     hostedZone: certificate.hostedZone
// }
)

const compute = new ComputeStack(app, 'ComputeStack' + process.env.NODE_ENV)


// const certificate = new CertificateStack(app, 'CertificateStack', {
//     domain,
//     hostedZoneId,
//     hostedZoneName
// })

/**
 * ex: auth.website.com
 */