import { AppSyncResolverEvent } from 'aws-lambda';
import * as aws from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
const doClient = new aws.DynamoDB.DocumentClient();

interface TestEntity {
    id: string;
    name: string;
    check: boolean;
}

export const handler = async (event: AppSyncResolverEvent<TestEntity>) : Promise<TestEntity> => {
  console.log('event', event);

  var params: DocumentClient.PutItemInput = {
    TableName: process.env.TABLE_NAME!,
    Item: {
      id: event.arguments.id,
      price: 100.0,
      inStock: true,
      name: 'Yeezys',
      sizes: [8, 8.5, 9, 10, 11, 12, 13],
    },
    ReturnValues: 'ALL_OLD'
  }

  const res = await doClient.put(params).promise();

  console.log('res', JSON.stringify(res))

  console.log('')

  const obj = {
    id: event.arguments.id,
    name: 'test',
    check: true
  }

	return obj;
}