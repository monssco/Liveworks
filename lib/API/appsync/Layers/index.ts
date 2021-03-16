import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';

export interface LayerStackProps extends cdk.NestedStackProps {

}

/**
 * TODO:
 * Do something that will automatically run `npm i` as soon
 * as you deploy the package.
 * 
 * Put it in the package.json or make a bash command for this?
 */

export class LayerStack extends cdk.NestedStack {

    public readonly awsSdkLayer?: lambda.ILayerVersion


    constructor(scope: cdk.Construct, id: string, props?: LayerStackProps) {
        super(scope, id, props);

        /**
         * This is a waste of lambda layers, lambda functions have aws-sdk by
         * default.
         * 
         * What this serves as instead is a good example to follow when adding
         * other npm packages to lambda layers.
         * 
         * This folder structure must be followed closely or otherwise
         * the layer code will not be uploaded.
         */

        const awsSdk = new lambda.LayerVersion(this, 'AWSLayer', {
            code: lambda.Code.fromAsset(path.join(__dirname + '/nodejs14.x/aws-sdk')),
            compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
            description: 'Layer for managing the core aws node sdk',
            removalPolicy: cdk.RemovalPolicy.DESTROY
        })

        this.awsSdkLayer = awsSdk
        
    }
}