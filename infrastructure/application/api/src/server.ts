import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ormClient } from "./utils/createDatabaseConn";
import { MyContext } from "./types";
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { User } from "./entities/User/User";
import { createSchema } from "./utils/createSchema";

/**
 * Header provided by the ALB when its being guarded by cognito.
 */
const JWT_HEADER_NAME = "x-amzn-oidc-data"

const startServer = async () => {

    
    const client = await ormClient();


    /**
     * Including resolvers using glob patterns.
     * https://typegraphql.com/docs/bootstrap.html#create-typedefs-and-resolvers-map
     */
    const schema = await createSchema();
    /* You can also pass in the redis cache in context here too.
    https://github.com/benawad/lireddit/blob/18_change-password/server/src/index.ts
    */
    const server = new ApolloServer({
        playground: true,
        introspection: true,
        schema,
        context: async ({req, res}) : Promise<MyContext> => {


        /**
         * This is kind of shitty. So, I just need this as I am building
         * quickly but for a prod env this shouldn't be here.
         * 
         * I am only interested in the payload for cognito. 
         * Which looks like this.
         * 
         * {
            "sub": "3f1f8783-8e27-473d-852e-90c94c4f270b",
            "username": "mborgmeier@tecracer.de",
            "exp": 1583586780,
            "iss": "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_1KilRrCtV"
            }
            */

        const jwt_header: string = req.headers[JWT_HEADER_NAME] as string || "eyJ0eXAiOiJKV1QiLCJraWQiOiI2OWVmNGNhZS0wYWJmLTRjNTItYWIyNS03NGI2NDA3MGJlMGUiLCJhbGciOiJFUzI1NiIsImlzcyI6Imh0dHBzOi8vY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb20vZXUtY2VudHJhbC0xXzFLaWxSckN0ViIsImNsaWVudCI6InIzdmwxcXE5ZHFuNXJqYTNjdTBvZTZzZ2UiLCJzaWduZXIiOiJhcm46YXdzOmVsYXN0aWNsb2FkYmFsYW5jaW5nOmV1LWNlbnRyYWwtMTo2ODk2ODAwODQwMzU6bG9hZGJhbGFuY2VyL2FwcC9jb2duaS1GYXJnYS0xMkZMQUEwVkRHQ1dXLzgzZDQxNTBkNmFmM2RiOTYiLCJleHAiOjE1ODM1ODY3ODB9.eyJzdWIiOiIzZjFmODc4My04ZTI3LTQ3M2QtODUyZS05MGM5NGM0ZjI3MGIiLCJ1c2VybmFtZSI6Im1ib3JnbWVpZXJAdGVjcmFjZXIuZGUiLCJleHAiOjE1ODM1ODY3ODAsImlzcyI6Imh0dHBzOi8vY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb20vZXUtY2VudHJhbC0xXzFLaWxSckN0ViJ9.nXCE9-LtOfxeRGYia4THH8U4xhKv15Sr3H-lzCLAnJ9p8kJ3kkZie6gfd-Yen3SzonB45Ycu0uSrS5X7JUyo2A"

        const decoded = jwtDecode<JwtPayload>(jwt_header);

        // If these values don't exist, its unauthorized
        if (!decoded.sub || !decoded.exp || !decoded.iss) {
            throw Error('Unauthorized')
        }

        // Get user from database.
        const user = await client.em.findOneOrFail(User, {id: decoded.sub})

        return {
            em: client.em,
            req,
            res,
            user
        }}
    })

    const app = express();

    /**
     * This health check for target group when uploading to ecs (aws).
     * It makes sure that our container hasn't encountered any errors and
     * hasn't died.
     */
    app.get('/health-check', (_, res) => {
        res.sendStatus(200)
    })

    server.applyMiddleware({app, path: '/graphql'})

    let port = 4000

    app.listen({ port: port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
};

startServer();