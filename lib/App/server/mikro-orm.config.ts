import * as path from 'path';
import { MikroORM } from '@mikro-orm/core';

export default {
    migrations: {
        path: path.join(__dirname, "./src/orm/migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files, need this for typescript extension files
    },
    entities: ['./src/entities/*.ts'],
    type: 'postgresql',
    dbName: process.env.DB_NAME || 'postgres',
    clientUrl: process.env.DB_HOST ||  'http://127.0.0.1',
    port: 5432,
    user: process.env.DB_USER || 'test',
    password: process.env.DB_PASS || 'test',

} as Parameters<typeof MikroORM.init>[0];