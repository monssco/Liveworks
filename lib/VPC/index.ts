import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";

/**
 * 
 */
export class VPCStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id)
        
        const vpc = new ec2.Vpc(this, "VPC", {
            maxAzs: 3, // Default is all AZs in region
            cidr: '10.0.0.0/20', // Provides 4096 ip addresses
            subnetConfiguration: [
                {
                    name: 'public',
                    subnetType: ec2.SubnetType.PUBLIC
                },
                {
                    name: 'private',
                    subnetType: ec2.SubnetType.PRIVATE
                }
            ],
            
        });

        const publicSubnet = new ec2.PublicSubnet(this, 'PublicSubnet', {
            availabilityZone: '1',
            vpcId: vpc.vpcId,
            cidrBlock: '10.0.0.0/24', // This provides 256 ip addresses
        })

        const privateSubnet = new ec2.PrivateSubnet(this, 'PrivateSubnet', {
            availabilityZone: '1',
            vpcId: vpc.vpcId,
            cidrBlock: '10.0.0.0/24'
        })

    }
}