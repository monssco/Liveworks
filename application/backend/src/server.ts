import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ormClient } from "./utils/createDatabaseConn";
import { MyContext } from "./types";
import { createSchema } from "./utils/createSchema";

import { graphqlUploadExpress } from 'graphql-upload';
import { RegisterUserManager } from "./utils/register";
import { retrieveUser } from "./utils/helpers";

import cors from 'cors'
import SeedManager from "./utils/SeedManager";

const PORT = 4000


const startServer = async () => {

    const app = express();
    app.use(cors())

    const client = await ormClient();

    let sManager = new SeedManager(client.em)

    

    /**
     * Including resolvers using glob patterns.
     * https://typegraphql.com/docs/bootstrap.html#create-typedefs-and-resolvers-map
     */
    const schema = await createSchema();
    /* You can also pass in the redis cache in context here too.
    https://github.com/benawad/lireddit/blob/18_change-password/server/src/index.ts
    */
    const server = new ApolloServer({
        // uploads: false, // disable apollo upload property for graphql-upload - removed in v3
        // playground: true, // removed in v3, using a plugin below
        introspection: true,
        schema,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground() // to re-enable old playground like apollo v2
        ],
        context: async ({req, res}) : Promise<MyContext> => {

            // console.log(`Headers ${JSON.stringify(req.headers)}`)

            let user: any
            if (process.env.NODE_ENV === "production"){
                // Take the jwt token coming with headers and decode it.
                let jwt_header = req.headers.authorization as string

                // We retrieve the user to pass around in our context here.
                user = await retrieveUser(client.em, jwt_header)
            } else {
                // Need to figure out in dev, if a request calls for worker or business....
                // We are in development but there is a header incoming, so unwrap it.
                if (req.headers.authorization) {
                    // console.log(`Headers ${JSON.stringify(req.headers)}`)
                    console.log("Fetching user from the db.")
                    let jwt_header = req.headers.authorization as string
                    // We retrieve the user to pass around in our context here.
                    // could be worker or business
                    user = await retrieveUser(client.em, jwt_header)
                } else {
                    // We are in development and there is no header, so we just create a dummy user.
                    console.log('Dummy user.')
                    user = sManager.getBusinessUser()
                    
                }
            }

            // https://github.com/mikro-orm/mikro-orm/issues/696
            // If you don't fork the EM you will run into error.
            return {
                em: client.em.fork(),
                req,
                res,
                user
            }
        }
    })

    await server.start();

    // https://github.com/MichalLytek/type-graphql/issues/37
    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

    /**
     * This health check for target group when uploading to ecs (aws).
     * It makes sure that our container hasn't encountered any errors and
     * hasn't died.
     */
    app.get('/health-check', (_, res) => {
        res.sendStatus(200)
    })

    // For registering users, we apply this route
    let registerUser = new RegisterUserManager(client.em)

    app.use('/register', registerUser.getRegisterRouter())

    server.applyMiddleware({app, path: '/graphql'})



    app.listen({ port: PORT }, () =>
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );

    /**
     * Seed it with required values, for some reason if this function is called before the listen part,
     * it just skips over the seed operation. 
     */
    await sManager.seedWorkerPositions()
    // seeding dummy values.
    if (process.env.NODE_ENV === "development"){
        await sManager.createDummyBusinessUser()
    }
};

startServer();