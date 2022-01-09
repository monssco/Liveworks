import Auth from "@aws-amplify/auth"
import { registerBusinessInBackend, registerWorkerInBackend } from "../graphql/client"
import { CognitoUserAttributes, USER_TYPE } from "./types"

/**
 * Signs up a business user by calling the cognito user pool. (This call talks to AWS directly)
 * @param email email
 * @param password password
 * @returns result of signing up a user
 * Will throw an exception 
 * if email/password are already used, 
 * email is incorrect, 
 * password doesn't satisfy cognito user pool requirements
 * and / or other issues occur during signing up.
 */
export const signUpBusiness = async (email: string, password: string) => {
    try {
        const result = await Auth.signUp({
            username: email,
            password: password,
            attributes: {
                'custom:type': USER_TYPE.BUSINESS,
            }
        })

        return result
    } catch (e) {
        console.log('error signing up:', JSON.stringify(e));
        throw e
    }
}

/**
 * Signs up a worker user by calling the cognito user pool. (This call talks to AWS directly)
 * @param email email
 * @param password password
 * @param invite_code the user id of the business that referred this worker (looks like a cognito sub: ex: `485d3909-064e-43a7-be38-02461ee0c541`)
 * @returns result of signing up a user
 * Will throw an exception 
 * if email/password are already used, 
 * email is incorrect, 
 * password doesn't satisfy cognito user pool requirements
 * and / or other issues occur during signing up.
 */
export const signUpWorker = async (email: string, password: string, invite_code: string) => {
    try {
        const result = await Auth.signUp({
            username: email,
            password: password,
            attributes: {
            'custom:type': USER_TYPE.WORKER,
            'custom:invite_code': invite_code
            }
        })
        return result
    } catch (e) {
        console.log('error signing up:', JSON.stringify(e));
        throw e
    }
}

/**
   * Confirms a user by calling the cognito user pool.
   * After confirmation of signup, it will call our own backed to register this user.
   * 1. Signs out everyone (if they are signed in)
   * 2. Tries to confirm using the  provided code
   * 3. Signs this user in with their email, pass
   * 4. Retrieves their information and makes call to backend to register them.
   * 
   * Throws an exception if something goes wrong.
   */
export const confirmUser = async (email: string, password: string, code: string) => {
    try {
        // sign all mfs off first
        await Auth.signOut()
        // Call amplify to confirm this user, a successful confirmation just returns us a success string (lame)
        await Auth.confirmSignUp(email, code)

        let user = await Auth.signIn(email, password)
        let attributes = user.attributes as CognitoUserAttributes
        console.log('attributes', attributes)

        // Get user type from the return json
        let userType = attributes["custom:type"]

        // Based on which type of user this is, we register them in the db.
        // THIS IS A VERY CRITICAL CALL, AND IT CANNOT FAIL. WE NEED TO MAKE SURE IT DOESN'T FAIL UNDER NORMAL
        // CIRCUMSTANCES
        if (userType === USER_TYPE.BUSINESS){
            console.log("Confirming business account")
            await registerBusinessInBackend(attributes.sub, attributes.email)
        } else if (userType === USER_TYPE.WORKER) {
            // this is a worker
            console.log("Confirming worker account")
            await registerWorkerInBackend(attributes.sub, attributes.email, attributes["custom:invite_code"])
        } else {
            // can't be possible, throw an error and tell them to contact us or something..
            console.log("Unable to infer user type")
            throw new Error("We can't tell if you are a business or worker - please contact us")
        }
    } catch (e){
        console.log(`ERROR: ${JSON.stringify(e)}`)
        throw e
    }
}

/**
 * Re-sends a confirmation code to the user's delivery medium.
 * Will resend it to the same medium it was sent to upon signup.
 * @param email email to send code to
 * @returns A promise resolves code delivery details if successful
 */
export const resendConfirmationCode = async (email: string) => {
    try {
        return await Auth.resendSignUp(email)
    } catch (e){
        console.log(`Error resending confirmation code ${JSON.stringify(e)}`)
        throw e
    }
}

/**
 * Self explanatory
 * @returns void
 */
export const signOut = async () => {
    try {
        return await Auth.signOut()
    } catch (e) {
        console.log(`Error signing out ${JSON.stringify(e)}`)
        throw e
    }
}

/**
 * Sends a forgot password request to a given email, in the form of a code.
 * @param email email to send the code to
 */
export const resetPassword = async (email: string) => {
    try {
        await Auth.forgotPassword(email)
    } catch (e) {
        console.log(`Error sending forgot pass request ${JSON.stringify(e)}`)
        throw e
    }
}

/**
 * Confirms a resend password code.
 * @param email email of the user
 * @param code forgot password code that the user reiceved from aws cognito
 * @param newPassword the new password that they would like to set it as
 */
export const confirmResetPassword = async (email: string, code: string, newPassword: string) => {
    try {
        await Auth.forgotPasswordSubmit(email, code, newPassword)
    } catch (e) {
        console.log(`Error confirming forgot password request ${JSON.stringify(e)}`)
        throw e
    }
}

/**
 * This function is responsible for logging in a user into AWS cognito.
 * @param email the email that user is going to be using to login
 * @param password their respective password
 * @returns void if successful, throws an error otherwise
 */
export const loginUser = async (email: string, password: string) => {
    try {
        let response = await Auth.signIn(email, password)
        return response
    } catch (e) {
        console.log(`Error confirming forgot password request ${JSON.stringify(e)}`)
        throw e
    }
}