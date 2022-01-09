/**
 * Use this file to store functions related to seeding the initial db.
 * Things like adding cities, pre-reqs for different types of accounts or even users can sit here.
 * You can also use this to create dummy values and test dummy functionality for dev env
 */

import { EntityManager } from "@mikro-orm/core";
import { Business } from "../entities/Business/Business";
import { Worker } from "../entities/Worker/Worker";


import { WorkerPositionTypeArray } from "./Enums/WorkerPositionType.array";
import { WorkerPosition } from "../entities/WorkerPosition/WorkerPosition";
import { BusinessType } from "../entities/BusinessType/BusinessType";
import { BusinessTypeArray } from "./Enums/BusinessType.array";


// /**
//  * 
//  * Seeds the database with values that are needed for the
//  * app to function properly.
//  * 
//  * @param em Entity manager
//  */
// export async function seedDatabase(em: EntityManager) {

//     // const user = new Business("munibrhmn@gmail.com")
    
//     // try {
//     //     await em.findOneOrFail(Business, user);
//     // } catch(er) {

//     //     await em.persist(user);
//     //     await em.flush();
//     // }

// }

class SeedManager {
    private em: EntityManager

    private businessUser: Business
    private workerUser: Worker

    constructor(em: EntityManager) {
        this.em = em
    }

    async seedWorkerPositions() {


    //TODO: Make these check better.

        console.log("Seeding worker positions")
        let positions = await this.em.find(WorkerPosition, {})
        if (positions.length === 0) {
            for (const p of WorkerPositionTypeArray) {
                let position = new WorkerPosition(p.name, p.rank, p.color, true)
                console.log("Seeding this one")
                await this.em.persistAndFlush(position)
                // await this.em.commit()
                // await this.em.persistAndFlush(position)
            }
        }
        console.log("Done seeding worker positions")

        console.log("Seeding business types")
        let businessTypes = await this.em.find(BusinessType, {})

        if (businessTypes.length === 0) {
            for (const b of BusinessTypeArray) {
                let businessType = new BusinessType(b.name)
                console.log("Seeding business type")
                await this.em.persistAndFlush(businessType)
            }
        }
    }

    /**
     * Since its harder to debug and replicate cognito sub ids in dev envs
     * We will use dummy accounts.
     */
    async createDummyBusinessUser() {

        let uuid = '00000000-0000-0000-0000-000000000000'

        let user = await this.em.findOne(Business, {id: uuid})

        if (user) {
            console.log(`Business user has been created already`)
            this.businessUser = user
        } else {
            this.businessUser = new Business(uuid, 'business@mail.com')
            this.workerUser = new Worker('worker@mail.com', this.businessUser)

            console.log(`Business user doesn't exist.`)
            await this.em.persistAndFlush([this.businessUser, this.workerUser])
            
        }
        
    }

    getBusinessUser() {
        return this.businessUser
    }

    getWorkerUser() {
        return this.workerUser
    }
}

export default SeedManager