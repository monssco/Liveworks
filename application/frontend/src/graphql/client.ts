import Auth from '@aws-amplify/auth';
import axios from 'axios';
import { USER_TYPE } from '../utils/types';

import { setContext } from "@apollo/client/link/context";

import {
    ApolloClient,
    InMemoryCache,
    from,
    // HttpLink,
} from "@apollo/client";

import {createUploadLink} from 'apollo-upload-client';

// TODO: Session should be passed in here, when you're making a call to the backend.
// This way we can authenticate each separate call to the b.end.
// https://www.npmjs.com/package/graphql-request#authentication-via-http-header
// I think the Header is "x-amzn-oidc-data" but can check later once its up in prod.

const BASE_API = `http://localhost:4000`
export const apolloClient = () => {

    // const httpLink = new HttpLink({ uri: `${BASE_API}/graphql` });

    const uploadLink = createUploadLink({ uri: `${BASE_API}/graphql` })

    const authMiddleware = setContext(async (_, {headers}) => {
        try {
            const token = (await Auth.currentSession()).getIdToken().getJwtToken()

            return {
                headers: {
                    ...headers,
                    Authorization: token
                }
            }
        } catch (e) {
            console.log(`Error: Amplify gave us no token, most likely user is not signed in: ${e}.`)
            throw e
        }
    })

    const client = new ApolloClient({
        uri: BASE_API,
        cache: new InMemoryCache(),
        link: from([authMiddleware, uploadLink])
    })

    return client
}

const REGISTER_ENDPOINT = `${BASE_API}/register`

/**
 * This endpoint is to be called when registering a business with the backend database.
 * @param sub id that you get from cognito when a user has signed up with user pools
 * @param email email that they used to sign up with cognito
 */
export const registerBusinessInBackend = async (sub: string, email: string)=> {
    
    try{
        let result = await axios.post(REGISTER_ENDPOINT, {
            sub: sub,
            email: email,
            type: USER_TYPE.BUSINESS
        })
        return result.status
    } catch (e){
        console.log(`Error registering worker at the b.end ${JSON.stringify(e)}`)
        throw e
    }
}

/**
 * This endpoint is to be called when registering a worker with the backend database.
 * @param sub id that you get from cognito when a user has signed up with user pools
 * @param email email that they used to sign up with cognito
 * @param invite_code The invite code that worker got when they were signing up. 
 */
export const registerWorkerInBackend = async (sub: string, email: string, invite_code: string)=> {

    try {
        let result = await axios.post(REGISTER_ENDPOINT, {
            sub: sub,
            email: email,
            invite_code,
            type: USER_TYPE.WORKER
        })
        return result.status
    } catch (e){
        console.log(`Error registering worker at the b.end ${JSON.stringify(e)}`)
        throw e
    }
}