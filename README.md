# Base CDK Application Infrastructure

## Status: Paused

- Might come back just to use subscriptions from appsync, or use it just as a messaging API down the road.

I decided not to purse this route for a number of reasons.

- Lambda resolvers will add unnecessary latency
- cdk-appsync is experimental, might cause issues down the road
- No support for ORM in lambda functions (Lambda layers will not help us with sharing connections to DB)
- Eventually I will need to use VTL at one point or another
- Schema first approach means I will be repeating code
- Business logic will need to be squeezed into lambda logic
- Lambdas have concurrency limits
- Need to pay for a cache

## Reasoning
Why am I switching back to AppSync? It seems that AppSync has evolved a lot since the cf days (although not quite there yet).

I want to figure out if its worth switching over and using it for our project, since most of the schema and what not has already been created for us.

Goal is to move all resolvers (business logic) into lambda functions.

Change RDS with DynamoDB Database. (NOT a priority. Stick with RDS for now until everything is moved over.)

Create a completely server-less environment where we don't even have a database running.

## High level image

    FRONTEND                        BACKEND
User -> Rect App ->  AppSync -> Database

  |                       |-> Stripe

 Cognito

## Roadmap

Goal is to get a skeleton running locally and over the cloud so that I can test quickly and then upload the prod version to the cloud.
Get api running locally
Push onto cloud and run it using ECR, Fargate etc etc
Authenticate it using Cognito (Figure out login, lougout, authenticated routes etc, just a basic app nothing crazy)
Figure out how to mock cognito locally, so that local development doesn't get hindered.


## Requirements
Application requirements are documented elsewhere (Notion / OneNote).

This repo will only worry about technical requirements. For example, what kind of tools are we using and why?

My goal is to have as much of the repo be serverless as needed, but things like the api and orm must be contanerized so that they can be uploaded onto
something like Fargate (which I don't know too much about right now. But ill figure it out.)


API: GraphQL
ORM: TypeORM

Infrastructure: CDK

Auth: Cognito
Database: RDS running postgres



## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
