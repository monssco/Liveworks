import { Worker } from "../../../entities/Worker/Worker";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Query } from "type-graphql"
import { Business } from "../../../entities/Business/Business";
import { WorkerPosition } from "../../../entities/WorkerPosition/WorkerPosition";

@InputType()
class ListWorkersInput {
    @Field()
    limit: number

    @Field()
    offset: number

    @Field({nullable: true})
    position_id?: string
}

/**
 * Fetches all workers.
 */
export class ListWorkers {
    @Query(()=> [Worker], {description: "Fetches all workers, use position id to filter by position. Supports pagination via limit and offset."})
    async businessListWorkers(
        @Arg ("input") input: ListWorkersInput,
        @Ctx() { em, user }: MyContext
    ) {
        let me = user as Business

        if (input.position_id) {
            let position = await em.findOneOrFail(WorkerPosition, {id: input.position_id})
            let workers = await em.find(Worker, {employer: me, position}, {limit: input.limit, offset: input.offset})
            return workers
        }
        
        let workers = await em.find(Worker, {employer: me}, {limit: input.limit, offset: input.offset})
        await em.populate(workers, ['position'])
        return workers
    }
}