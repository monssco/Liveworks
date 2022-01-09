import * as path from 'path';
import { MikroORM } from '@mikro-orm/core';

export default {
    migrations: {
        path: path.join(__dirname, "./src/orm/migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files, need this for typescript extension files
    },
    entities: ['./src/entities/**/*.ts'],
    type: 'postgresql',
    dbName: 'postgres-test',
    clientUrl: 'http://localhost:2345',
    port: 2345,
    user: "test",
    password: "test",

} as Parameters<typeof MikroORM.init>[0];