import * as appsync from '@aws-cdk/aws-appsync';
import * as dynamo from '@aws-cdk/aws-dynamodb';
import { IUserPool } from '@aws-cdk/aws-cognito';
import * as cdk from '@aws-cdk/core';
import { join } from 'path';
import * as lambda from '@aws-cdk/aws-lambda';
import path = require('path');
import { LayerStack } from './Layers';

interface AppsyncStackProps {
    userPool: IUserPool
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


        /**
         * Temporary
         */
        const demoTable = new dynamo.Table(this, 'DemoTable', {
            partitionKey: {
                name: 'id',
                type: dynamo.AttributeType.STRING,
            },
        });

        const demoDS = api.addDynamoDbDataSource('TabledataSource', demoTable);

        demoDS.createResolver({
            typeName: 'Query',
            fieldName: 'getDemos',
            requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
            responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
        });

        demoDS.createResolver({
            typeName: 'Mutation',
            fieldName: 'addDemo',
            requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
                appsync.PrimaryKey.partition('id').auto(),
                appsync.Values.projecting('input')
            ),
            responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
        })

        const testLambda = new lambda.Function(this, 'test', {
            functionName: 'TEST',
            code: lambda.Code.fromAsset(path.join(__dirname, 'Lambda')),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_14_X,
            description: 'Test lambda for appsync',
            environment : {
                TABLE_NAME: demoTable.tableName
            }
        });

        const lambdaDS = api.addLambdaDataSource('LambdadataSource', testLambda,
        {
            description: 'testinglambda',
            name: 'mydatasource'
        })

        lambdaDS.createResolver({
            typeName: 'Query',
            fieldName: 'callLambda'
        })

        demoTable.grantReadWriteData(testLambda);
    }
}