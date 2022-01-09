import { EntityManager } from "@mikro-orm/core";
import { USER_TYPE } from "../types";
import { Business } from "../entities/Business/Business";
import {Worker } from "../entities/Worker/Worker"
import jwtDecode, { JwtPayload } from "jwt-decode";

interface Payload extends JwtPayload {
    'custom:type' : string,
    'cognito:username': string,
    email: string
}

/**
 * Given a jwt token, this function will look them up in the database and return them.
 * @param em Entity manager
 * @param jwt_header jwt header that contains the username and user type
 * @returns a user in our orm format
 */
export const retrieveUser = async (em: EntityManager, jwt_header: string) => {
    const decoded = jwtDecode<Payload>(jwt_header);

    console.log("decoded", decoded)

    let user_type = decoded["custom:type"] as USER_TYPE

    // Here a call to cognito could be made? How would we know its the right user? 
    // We can just trust amplify, and assume everything would be pushed into our database.
    // If these values don't exist, its unauthorized

    // Get user from database.
    // Check if business is making the call or a worker is.
    // const user = await client.em.findOneOrFail(Business, {id: decoded.sub})

    /**
     * 1. Check which type of user this is.
     * 2. Get the type of user that is making this call (either business or worker etc) from db
     * 3. Put that user in the context so they can be passed into each resolver.
     */

    let cognitoId = decoded["cognito:username"]

    switch (user_type){
        case USER_TYPE.BUSINESS:{
            console.log("This is a business")

            try {
                let user = await em.findOneOrFail(Business, {id: cognitoId})

                return user
                
            } catch (error) {
                console.log("Error", error)
                if (process.env.NODE_ENV === "development"){
                    console.log("Business doesn't exist, make it and return it")
                    let business = new Business(cognitoId, 'business@mail.com')
                    await em.persistAndFlush(business)
                    return business
                } else {
                    throw Error(`This user doesn't exist\n${error}`)
                }
            }
        }
        case USER_TYPE.WORKER: {
            console.log("This is a worker")

            try {
                let user = await em.findOneOrFail(Worker, {id: cognitoId});

                return user
            } catch (error) {
                console.log("Error", error)
                if (process.env.NODE_ENV === "development"){
                    console.log("Worker doesn't exist, make it and return it")
                    let worker = new Worker(cognitoId)
                    await em.persistAndFlush(worker)
                    return worker
                } else {
                    throw Error(`This user doesn't exist\n${error}`)
                }
            }
        }
        default: {
            throw Error("User type is unknown.")
        }
    }
}