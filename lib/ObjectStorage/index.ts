import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';

// TODO: Here is where the ability for users to access buckets should live.
// All required buckets for users to use should be listed here.

interface S3Props {
    authenticatedRole: iam.Role,
    unauthenticatedRole: iam.Role
}

export class S3Stack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: S3Props) {
        super(scope, id)

        

        const bucket = new s3.Bucket(this, "S3Bucket", {
            versioned: true,
            encryption: s3.BucketEncryption.KMS
        })

        bucket.grantDelete(props?.authenticatedRole!, 'protected/${cognito-identity.amazonaws.com:sub}/*')

        bucket.grantRead(props?.authenticatedRole!, 'protected/*')


    }
}