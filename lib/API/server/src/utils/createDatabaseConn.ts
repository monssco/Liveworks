
// const dbClient = connectToDB()

// export default dbClient;

import { MikroORM } from '@mikro-orm/core';
import microConfig from '../../mikro-orm.config';

async function connectToDB() {

    /*
    Initialize orm using the config file.
    */
    const orm = await MikroORM.init(microConfig);

    /*
    Run Migrations on the database.
    */

    await orm.getMigrator().up();

    return orm
}

export const ormClient = () => connectToDB();