import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import path = require('path');
import { Duration } from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53'
import * as acm from '@aws-cdk/aws-certificatemanager'
import { ICertificate } from '@aws-cdk/aws-certificatemanager';

/**
 * Issue with health checks has been solved
 * Don't use their higher level Application Load Balancer, 
 * switch to the FargateService instead
 * Look at this code repo: https://github.com/markusl/cdk-fargate-docker-starter/blob/master/lib/fargate-docker-stack.ts
 *  
 */

    interface APIStackProps {
        domain: string
        subDomain: string
        hostedZoneId: string
        hostedZoneName: string
    }

export class APIStack extends cdk.Stack {

    public readonly certificate: ICertificate
    public readonly domainName: string
    public readonly hostedZone: route53.IHostedZone

    constructor(scope: cdk.Construct, id: string, props: APIStackProps) {
        super(scope, id)

        let domain = props.domain
        let subDomain = props.subDomain

        let hostedZoneId= props.hostedZoneId
        let zoneName = props.hostedZoneName


        /**
         * Route 53 zone from lookup
         * is not working, so must pass in these hard coded values instead for now
         * https://github.com/aws-samples/aws-cdk-examples/issues/238
         * https://github.com/aws/aws-cdk/issues/5547
         */
        const zone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
            hostedZoneId,
            zoneName
        })

        this.hostedZone = zone

        const domainName = subDomain + '.' + domain

        /**
         * This is where you can come to implement things like ssl 
         * pinning in iOS or Android app.
         */
        const certificate = new acm.DnsValidatedCertificate(this, 'SiteCertificate', {
            domainName,
            subjectAlternativeNames: [domain],
            hostedZone: zone,
            region: 'us-east-1', // Cloudfront only checks this region for certificates.
        });

        this.certificate = certificate
        this.domainName = domainName

        const vpc = new ec2.Vpc(this, "MyVpc", {
            maxAzs: 2, // Default is all AZs in region
            cidr: '10.0.0.0/16',
            subnetConfiguration: [
                {
                    name: 'public',
                    subnetType: ec2.SubnetType.PUBLIC
                }
            ]
        });


        const cluster = new ecs.Cluster(this, "APICluster", {
            vpc: vpc
        });

        // const taskDef = new ecs.TaskDefinition(this, 'TaskDefinition', {
        //     compatibility: ecs.Compatibility.EC2,
        //     cpu: '256',
            
        // })

        // new ecs.ContainerDefinition(this, 'ContainerDefinition', {
        //     image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, "server")),
        //     taskDefinition: taskDef,
            
        // })


        // Create a load-balanced Fargate service and make it public
        const alb = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "GraphQLAPI", {
                cluster: cluster, // Required
                cpu: 256, // Default is 256
                desiredCount: 1, // Default is 1
                taskImageOptions: {
                    // This is where you can pass in environment variables to the container.
                    image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, "server")),
                    containerPort: 80,
                    environment: {
                        DB_HOST: 'http://68.145.64.93:5432' // This is the port on my laptop, in production it should be replaced with an rds instance or something else.
                    }
                },
                memoryLimitMiB: 512, // Default is 512
                publicLoadBalancer: true, // Default is false
                assignPublicIp: true,
                domainName,
                domainZone: zone,
                certificate,
        });

        /**
         * Health checks are used by target groups to ensure that the containers haven't crashed etc.
         */
        alb.targetGroup.configureHealthCheck({
            path: '/health-check',
            port: '80',
            healthyHttpCodes: '200,304', // both success and non modified
            enabled: true,
            healthyThresholdCount: 5,
            interval: Duration.seconds(60),
            timeout: Duration.seconds(59)
        })

        const lbSecurityGroup = alb.loadBalancer.connections.securityGroups[0]

        lbSecurityGroup.addEgressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'Outbound HTTPS traffic to get to cognito')

        alb.targetGroup.setAttribute('deregistration_delay.timeout_seconds', '10') 

        // const clientSecret = cdk.SecretValue.secretsManager('clientSecret', {})

        // const action = elbv2.ListenerAction.authenticateOidc({
        //     authorizationEndpoint: 'https://www.liveworks.app/login',
        //     clientId: 'random',
        //     clientSecret: clientSecret,
        //     issuer: 'someone',
        //     next: elbv2.ListenerAction.forward([alb.targetGroup]),
        //     tokenEndpoint: '',
        //     userInfoEndpoint: '',
        // })

        // const conditions = [
        //     elbv2.ListenerCondition.hostHeaders(['https://www.liveworks.app'])
        // ]

        // new elbv2.ApplicationListenerRule(this, 'ALBListener', {
        //     listener: alb.listener,
        //     priority: 1000,
        //     action,
        //     conditions

        // })


    }
}