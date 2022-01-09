import { EntityManager } from "@mikro-orm/core";
import { User } from "../entities/User/User";

/**
 * 
 * Seeds the database with values that are needed for the
 * app to function properly.
 * 
 * @param em Entity manager
 */
export async function seedDatabase(em: EntityManager) {

    const user = new User("3f1f8783-8e27-473d-852e-90c94c4f270b", 
    "munibrhmn@gmail.com")
    
    try {
        await em.findOneOrFail(User, user);
    } catch(er) {

        await em.persist(user);
        await em.flush();
    }

}
