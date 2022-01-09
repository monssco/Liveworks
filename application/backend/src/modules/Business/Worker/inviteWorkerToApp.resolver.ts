import { MyContext } from "src/types";
import { sendInviteEmail } from "../../../utils/Email/sendInviteEmail";
import { Arg, Ctx, Field, InputType, Mutation } from "type-graphql"
import { Business } from "../../../entities/Business/Business";
import { WorkerPosition } from "../../../entities/WorkerPosition/WorkerPosition";
import { Worker } from "../../../entities/Worker/Worker";

@InputType()
class InviteWorkerInput {

    @Field()
    email!: string;

    @Field()
    first_name!: string;


    @Field()
    last_name!: string;

    @Field()
    position_id!: string
}

/**
 * Responsible for inviting a worker to the platform.
 * A venue can invite a worker, it will just email them a pre-made link.
 * They can use that to sign up with their creds.
 */
export class InviteWorkerToAppResolver {
    @Mutation(()=> Worker, {description: "A business can use this endpoint to invite workers to the platform. It will send them a url with a unique invite code that can be used to sign up for the platform."})
    async businessInviteWorkerToApp(
        @Arg("input") input: InviteWorkerInput,
        @Ctx() { user, em }: MyContext
    ) {
        const me = user as Business

        try {
            let position = await em.findOneOrFail(WorkerPosition, {id: input.position_id})
            let worker = new Worker(input.email, me)
            worker.first_name = input.first_name
            worker.last_name = input.last_name
            worker.position = position
            worker.invited = true

            await em.persistAndFlush(worker)
            await sendInviteEmail(worker, me)

            return worker
        } catch (e) {
            console.log('Error inviting worker to app', e)
            throw e
        }
    }
}