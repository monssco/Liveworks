import { WorkerPosition } from "../../../entities/WorkerPosition/WorkerPosition";
import { MyContext } from "src/types";
import { Arg, Ctx, Mutation } from "type-graphql"
import { Business } from "../../../entities/Business/Business";

// Deletes a given WorkerPosition
export class DeletePositionResolver {
    @Mutation(()=> WorkerPosition, {description: "Use this endpoint to delete a given worker position."})
    async businessDeletePosition (
        @Arg("position_id") position_id: string,
        @Ctx() context: MyContext
    ): Promise<WorkerPosition> {

        const { user, em } = context;
        
        let me = user as Business;

        let position = await em.findOneOrFail(WorkerPosition, {id: position_id, creator: me.id, public: false});

        // Don't delete the position, just deactivate it
        position.deactivatePosition();

        await em.persistAndFlush(position)

        return position
    }
}