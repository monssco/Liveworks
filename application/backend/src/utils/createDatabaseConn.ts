import { MikroORM } from '@mikro-orm/core';
// import { seedDatabase } from './helpers';

import microConfig from '../../mikro-orm.config';

/**
 * Sets up the ORM connection and performs all necessary migrations.
 * @returns ORM
 */
async function setupDatabaseConnection() {


    /**
     * Initialize orm using the config file.
     */
    const orm = await MikroORM.init(microConfig);

    /**
     * Create migrations, if they are required and then also go up on them.
     */
    if (process.env.NODE_ENV !== "production") {
        await orm.getMigrator().createMigration();
        await orm.getMigrator().up();
    }


    /**
     * Seed the database with info that is required.
     */
    // await seedDatabase(orm.em);

    return orm
}

/**
 * 
 * @returns ORM client
 */
export const ormClient = () => setupDatabaseConnection();

/**
 * 
 * @returns ORM instance.
 */
export async function getOrm() {
    return await MikroORM.init(microConfig);
}