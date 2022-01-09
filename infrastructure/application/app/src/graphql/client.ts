import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../graphql/generated/graphql'; // THIS FILE IS THE GENERATED FILE

// TODO: Session should be passed in here, when you're making a call to the backend.
// This way we can authenticate each separate call to the b.end.
// https://www.npmjs.com/package/graphql-request#authentication-via-http-header
// I think the Header is "x-amzn-oidc-data" but can check later once its up in prod.
export const graphqlSDK = () => {
    const client = new GraphQLClient('http://localhost:4000/graphql');
    let sdk = getSdk(client);
    return sdk
}