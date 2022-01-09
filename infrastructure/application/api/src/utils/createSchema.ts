import { buildSchema } from "type-graphql"

/**
 * Constructs a graphql schema using glob paths and resolvers defined
 * under the `modules` folder.
 * @returns graphQL schema
 */
export const createSchema = () => {
    return buildSchema({
        resolvers: [
            __dirname + "/../modules/**/*.resolver.ts"
        ],
        emitSchemaFile: {
            path: __dirname + '/../../schema.graphql',
            commentDescriptions: true,
            sortedSchema: false
        },
        nullableByDefault: false
    })
}