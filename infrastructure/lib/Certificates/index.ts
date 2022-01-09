/**
 * Create a wildcard certificate and pass it around, there is no need to seperate certificates in development, perhaps in production they can be scoped down.
 * 
 * In the future, we can pass in seperate requests for all types of certificates that we need and get them back in return to the requester.
 */

 import * as cdk from '@aws-cdk/core';
 import * as route53 from '@aws-cdk/aws-route53';
 import * as acm from '@aws-cdk/aws-certificatemanager';

interface CertificateProps {
    domain: string
    hostedZoneName: string
    hostedZoneId: string
}

export class CertificateStack extends cdk.Stack {


    public readonly wildCardCertificate: acm.DnsValidatedCertificate
    public readonly hostedZone: route53.IHostedZone

    constructor(scope: cdk.Construct, id: string, props: CertificateProps) {
        super(scope, id)

        const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
            hostedZoneId: props.hostedZoneId,
            zoneName: props.hostedZoneName
        })

        this.hostedZone = hostedZone

        /**
         * Wildcard certificate request so this stack won't need to come down everytime
         */
        const wildCardCertificate = new acm.DnsValidatedCertificate(this, 'SiteCertificate', {
            domainName: '*.' + props.domain,
            hostedZone,
            region: 'us-east-1', // Cloudfront only checks this region for certificates.
        });

        this.wildCardCertificate = wildCardCertificate
    }
}