import * as appsync from '@aws-cdk/aws-appsync';
import * as dynamoDB from '@aws-cdk/aws-dynamodb';
import { IUserPool } from '@aws-cdk/aws-cognito';
import * as cdk from '@aws-cdk/core';
import { join } from 'path';
import * as lambda from '@aws-cdk/aws-lambda';
import path = require('path');

interface AppsyncStackProps {
    userPool: IUserPool
    userTable?: dynamoDB.ITable
}

export default class AppSyncStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: AppsyncStackProps) {
        super(scope, id)

        const api = new appsync.GraphqlApi(this, 'API', {
            name: 'AppsyncAPI',
            schema: appsync.Schema.fromAsset(join(__dirname, 'schema.graphql')),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: appsync.AuthorizationType.API_KEY
                },
                additionalAuthorizationModes: [
                    {
                        authorizationType: appsync.AuthorizationType.USER_POOL,
                        userPoolConfig: {
                            userPool: props!.userPool
                        }
                    }
                ]
            },
            xrayEnabled: true
        })

        if (!props?.userTable) {
            throw new Error('No User Table specified.')
        }

        createLambdaResolver({
            appsync:{
                api: api,
                typeName: 'Query',
                fieldName: 'callLambda'
            },
            function: {
                description: 'Function for updating user values',
                handler: 'index.handler',
                location: 'Lambda',
                name: 'GetUserData'
            },
            datasource: {
                table: props.userTable,
                description: 'Datasource handling user retrieval.',
                name: 'lamdaDS'
            },
            stack: this
            })
        }
}

interface LDRS {
    stack: cdk.Stack
    function: {
        name: string
        description: string
        handler: string
        location: string
    }
    datasource: {
        table: dynamoDB.ITable
        description: string
        name: string
    }
    appsync: {
        api: appsync.IGraphqlApi
        typeName: string
        fieldName: string
    }
}


function createLambdaResolver(props: LDRS) {
    const lambdaFunction = new lambda.Function(props.stack, props.function.name, {
        functionName: props.function.name,
        code: lambda.Code.fromAsset(path.join(__dirname, props.function.location)),
        handler: props.function.handler,
        runtime: lambda.Runtime.NODEJS_14_X,
        description: props.function.description,
        environment : {
            TABLE_NAME: props.datasource.table.tableName
        },
    });

    const lambdaDS = props.appsync.api.addLambdaDataSource(props.datasource.description, lambdaFunction, {
        description: props.datasource.description,
        name: props.datasource.name
    })

    lambdaDS.createResolver({
        typeName: props.appsync.typeName,
        fieldName: props.appsync.fieldName
    })

    props.datasource.table.grantReadWriteData(lambdaFunction);
}