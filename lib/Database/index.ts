import * as cdk from '@aws-cdk/core'
import * as rds from '@aws-cdk/aws-rds'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as secretsmanager from '@aws-cdk/aws-secretsmanager'

// https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.DBInstanceClass.html

export class RDSStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id)

        // const secret = new secretsmanager.Secret(this, 'Secret', {
        //     description: 'Secret for RDS'
        // })

        


        

        // const vpc = new ec2.Vpc(this, 'VPCForRDS')

        // const subnet = new ec2.Subnet(this, 'MySubnet', {
        //     availabilityZone: 'us-east-1',
        //     vpcId: vpc.vpcId,
        //     cidrBlock: '8',
        // })

        // const securityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
        //     vpc,
        //     allowAllOutbound: false,
        //     description: 'something',
        //     securityGroupName: 'something else'
        // })



        // const clusterParam =  new rds.ParameterGroup(this, 'ParameterGroup', {
        //     engine: rds.DatabaseClusterEngine.auroraPostgres({version: rds.AuroraPostgresEngineVersion.VER_10_11})
        // })

        // const serverless = new rds.ServerlessCluster(this, "AuroraServerless", {
        //     engine: rds.DatabaseClusterEngine.AURORA_POSTGRESQL,
        //     vpc,
        //     defaultDatabaseName: 'postgres',
            
        // })

        // This is for when we go to production and see heavy loads, otherwise aurora serverless is more than enough for our needs.
        // const cluster = new rds.DatabaseCluster(this, "RDSCluster", {
        //     engine: rds.DatabaseClusterEngine.AURORA_POSTGRESQL,
        //     parameterGroup: clusterParam,
        //     instanceProps: {
        //         instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM),
        //         vpc,
        //         securityGroups: [
        //             securityGroup
        //         ]
        //     },
        //     defaultDatabaseName: 'postgres',
        //     credentials: rds.Credentials.fromSecret(secret),
        //     port: 5432,
        //     preferredMaintenanceWindow: 'sat:07:00-sat:07:30'
        // })
        
    }
}