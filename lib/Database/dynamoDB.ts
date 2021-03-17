import * as cdk from '@aws-cdk/core';
import * as dynamoDB from '@aws-cdk/aws-dynamodb';

export interface DynamoStackProps extends cdk.StackProps {

}

export default class DynamoDBStack extends cdk.Stack {
    
    public readonly userTable: dynamoDB.ITable

    constructor(scope: cdk.Construct, id: string, props?: DynamoStackProps) {
        super(scope, id, props);
        
        /**
         * This table keeps track of all user related information.
         */
        const userTable = new dynamoDB.Table(this, 'UserTable', {
            partitionKey: {
                name: 'id',
                type: dynamoDB.AttributeType.STRING
            },
            billingMode: dynamoDB.BillingMode.PAY_PER_REQUEST
        });

        this.userTable = userTable
    }
}