import * as cdk from '@aws-cdk/core';
import { CognitoStack } from '../lib/Authentication';
import { RDSStack } from '../lib/Database';
import { S3Stack } from '../lib/ObjectStorage';
import { APIStack } from '../lib/API/apollo/index'
import AppSyncStack from '../lib/API/appsync';

const app = new cdk.App();

// let authRole = cognito.authenticatedRole
// let unAuthRole = cognito.unauthenticatedRole

// const s3 = new S3Stack(app, 'S3Stack', {
//     authenticatedRole: authRole,
//     unauthenticatedRole: unAuthRole
// })

// const rds = new RDSStack(app, 'RDSStack')

let domain = 'liveworks.app'
let subDomain = 'api'

let hostedZoneId= 'Z075356326HYDU3BBX4VW'
let hostedZoneName = 'liveworks.app'

// const api = new APIStack(app, 'MyStack', {
//     domain,
//     subDomain,
//     hostedZoneName,
//     hostedZoneId
// })

const cognito = new CognitoStack(app, 'CognitoStack')

const appsync = new AppSyncStack(app, 'AppsyncStack', {
    userPool: cognito.userPool
})