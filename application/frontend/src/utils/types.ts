export enum USER_TYPE  {
    BUSINESS = 'BUSINESS',
    WORKER = 'WORKER'
}

/**
 * Type of response you get back from calling Auth.currentUserInfo() on amplify
 */
export interface AmplifyCurrentUser {
    id: string | null,
    username: string,
    attributes: {
        'custom:type': USER_TYPE,
        'custom:invite_code': string,
        sub: string,
        email_verified: boolean,
        email: string
    }
}

/**
 * Type of attributes that you get from a CognitoUser
 */
export interface CognitoUserAttributes {
    'custom:type': USER_TYPE,
    'custom:invite_code': string,
    sub: string,
    email_verified: boolean,
    email: string
}