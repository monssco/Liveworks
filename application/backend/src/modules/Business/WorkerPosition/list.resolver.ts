import { Business } from "src/entities/Business/Business";
import { MyContext } from "src/types";
import { Ctx, Query } from "type-graphql"
import { WorkerPosition } from "../../../entities/WorkerPosition/WorkerPosition";


/**
 * Fetches all the available worker position for a business.
 * TODO: Fetch public and private positions here?
 */
export class ListWorkerPositions {
    @Query(()=> [WorkerPosition], {description: "Get all available positions that can be assigned to a worker."})
    async businessListWorkerPositions(
        @Ctx() { em, user }: MyContext
    ) {
        let me = user as Business
        let myPositions = await em.find(WorkerPosition, {creator: me, active: true})

        let publicPositions = await em.find(WorkerPosition, {public: true, active: true})

        

        return myPositions.concat(publicPositions)
    }
}