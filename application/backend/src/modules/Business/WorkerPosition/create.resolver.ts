import { WorkerPosition } from "../../../entities/WorkerPosition/WorkerPosition";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation } from "type-graphql"
import { Business } from "../../../entities/Business/Business";


@InputType()
class CreatePositionInput {

    @Field()
    position_name!: string

    @Field()
    color!: string;

}

// Creates a custom worker position just for this user.
export class CreatePositionResolver {
    @Mutation(()=> WorkerPosition, {description: "Use this endpoint to create a new worker position."})
    async businessCreatePosition(
        @Arg("input") input: CreatePositionInput,
        @Ctx() context: MyContext
    ): Promise<WorkerPosition> {

        let me = context.user as Business

        let position = new WorkerPosition(input.position_name, 1, input.color, false, me)
        
        await context.em.persistAndFlush(position)

        return position;

    }
}