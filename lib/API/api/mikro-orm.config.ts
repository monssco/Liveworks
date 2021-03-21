import * as path from 'path';
import { MikroORM } from '@mikro-orm/core';

export default {
    migrations: {
        path: path.join(__dirname, "./src/orm/migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files, need this for typescript extension files
    },
    entities: ['./src/entities/*.ts'],
    type: 'postgresql',
    dbName: process.env.DB_NAME,
    clientUrl: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,

} as Parameters<typeof MikroORM.init>[0];