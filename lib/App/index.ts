import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import path = require('path');
import { Duration } from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53'
import * as acm from '@aws-cdk/aws-certificatemanager'
import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import { ICertificate } from '@aws-cdk/aws-certificatemanager';
import { ListenerAction, ListenerCondition } from '@aws-cdk/aws-elasticloadbalancingv2';
import { UserPool, UserPoolClient, UserPoolDomain } from '@aws-cdk/aws-cognito';

/**
 * Small problem, there is some kind of misconfiguration with the target group and the health check listener (done, we have a health-check endpoint now)
 * This causes issues with the container as it get shut down almost immidietly
 * Don't use their higher level Application Load Balancer, 
 * switch to the FargateService instead
 * Look at this code repo: https://github.com/markusl/cdk-fargate-docker-starter/blob/master/lib/fargate-docker-stack.ts
 *  
 */

    interface APIStackProps {
        certificate: acm.DnsValidatedCertificate
        hostedZone: route53.IHostedZone
        domain: string
        subDomain: string
        user?: {
            Pool: UserPool
            Client: UserPoolClient
            Domain: UserPoolDomain
        }
    }

export class APIStack extends cdk.Stack {

    public readonly domainName: string

    constructor(scope: cdk.Construct, id: string, props: APIStackProps) {
        super(scope, id)

        let domain = props.domain
        let subDomain = props.subDomain

        const domainName = subDomain + '.' + domain

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
                domainZone: props.hostedZone,
                certificate: props.certificate,
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

        new elbv2.CfnListenerRule(this, 'LoadBalancertestAPIDispatchRule', {
            priority: 30,
            listenerArn: alb.listener.listenerArn,
            conditions: [
                {
                    field: 'path-pattern',
                    values: ['/secret']
                }
            ],
            actions: [
                {
                    type:'authenticate-cognito',
                    order: 100,
                    authenticateCognitoConfig: {
                        userPoolArn: props.user!.Pool.userPoolArn,
                        userPoolClientId: props.user!.Client.userPoolClientId,
                        userPoolDomain: props.user!.Domain.domainName,
                        onUnauthenticatedRequest: 'deny'
                    }
                }, {
                    type: 'forward',
                    order: 200,
                    targetGroupArn: alb.targetGroup.targetGroupArn
                }
            ]
        })

        new elbv2.CfnListenerRule(this, 'LoadBalancerAPIDispatchRule', {
            priority: 20,
            listenerArn: alb.listener.listenerArn,
            conditions: [
                {
                    field: 'path-pattern',
                    values: ['/graphql', '/graphql/*']
                }
            ],
            actions: [
                {
                    type:'authenticate-cognito',
                    order: 100,
                    authenticateCognitoConfig: {
                        userPoolArn: props.user!.Pool.userPoolArn,
                        userPoolClientId: props.user!.Client.userPoolClientId,
                        userPoolDomain: props.user!.Domain.domainName,
                        onUnauthenticatedRequest: 'deny'
                    }
                }, {
                    type: 'forward',
                    order: 200,
                    targetGroupArn: alb.targetGroup.targetGroupArn
                }
            ]
        })

        new elbv2.CfnListenerRule(this, 'LoadBalancerLoginDispatchRule', {
            priority: 10,
            listenerArn: alb.listener.listenerArn,
            conditions: [
                {
                    field: 'path-pattern',
                    values: ['/login']
                }
            ],
            actions: [
                {
                    type:'authenticate-cognito',
                    order: 100,
                    authenticateCognitoConfig: {
                        userPoolArn: props.user!.Pool.userPoolArn,
                        userPoolClientId: props.user!.Client.userPoolClientId,
                        userPoolDomain: props.user!.Domain.domainName,
                        onUnauthenticatedRequest: 'authenticate'
                    }
                }, {
                    type: 'forward',
                    order: 200,
                    targetGroupArn: alb.targetGroup.targetGroupArn
                }
            ]
        })

        // const apiDispatchRule = new elbv2.ApplicationListenerRule(this, 'apiRule', {
        //     listener: alb.listener,
        //     priority: 20,
        //     conditions: [
        //         ListenerCondition.pathPatterns(['/graphql/*']),
        //     ],
        //     action: ListenerAction.authenticateOidc({
        //         authorizationEndpoint: "https://auth.liveworks.app",
        //         clientId: '',
        //         clientSecret: '',
        //         issuer: '',
        //         next: ,
                
        //     })
        // })

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