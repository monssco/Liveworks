// Create a resolver for the WorkerPosition entity

import { WorkerPosition } from "../../../entities/WorkerPosition/WorkerPosition";
import { MyContext } from "../../../types";
import { Arg, Ctx, Query } from "type-graphql";


export class RetrievePositionResolver {

    @Query(() => WorkerPosition, {description: "Retrieve a WorkerPosition by id"})
    async businessRetrievePosition(
        @Arg("id", {description: "The id of the WorkerPosition to retrieve"}) id: string,
        @Ctx() context: MyContext,
    ): Promise<WorkerPosition> {
        
        let position = await context.em.findOneOrFail(WorkerPosition, {id, creator: context.user.id, active: true, public: false});

        return position
    }

}