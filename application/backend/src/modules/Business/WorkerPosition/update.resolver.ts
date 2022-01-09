import { WorkerPosition } from "../../../entities/WorkerPosition/WorkerPosition";
import { MyContext } from "../../../types";
import { Arg, Ctx, Field, InputType, Mutation } from "type-graphql";

@InputType()
class UpdatePositionInput {

    @Field()
    position_id!: string

    @Field({nullable: true})
    position_name?: string

    @Field({nullable: true})
    color?: string;

}

// create a resolver for editing WorkerPosition
export class UpdatePositionResolver {
    @Mutation(()=> WorkerPosition, { description: "Use this endpoint to update a given worker position."})
    async businessUpdatePosition (
        @Arg("input") input: UpdatePositionInput,
        @Ctx() context: MyContext
    ): Promise<WorkerPosition> {

        let {user, em} = context;

        let position = await em.findOneOrFail(WorkerPosition, {id: input.position_id, creator:user.id, public:false, active:true});

        if (input.color){
            position.color = input.color;
        }

        if (input.position_name){
            position.name = input.position_name
        }

        await em.persistAndFlush(position)

        return position
    }
}