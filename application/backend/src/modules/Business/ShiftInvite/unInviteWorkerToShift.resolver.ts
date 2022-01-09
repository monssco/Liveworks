import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation } from "type-graphql"
import { Business } from "../../../entities/Business/Business";
import { ShiftInvite } from "../../../entities/ShiftInvite/ShiftInvite";
// import { sendUnInviteEmail } from "../../../utils/Email/unInviteWorker/sendUnInviteEmail";

/**
 * Creates or pulls out a workday from the database, creates a shift, invites workers and stores everything in the db.
 */

@InputType()
class UnInviteWorkerToShiftInput {

    @Field()
    shift_invite_id!: string

    @Field()
    worker_id!: string

}

/**
 * Responsible for creating a shift.
 * worker_ids and notes are optional.
 */
export class UnInviteWorkerToShift {
    @Mutation(()=> ShiftInvite, {description: "Use this endpoint to un-invite a worker."})
    async businessUnInviteWorkerToShift(
        @Arg("input") input: UnInviteWorkerToShiftInput,
        @Ctx() context: MyContext
    ): Promise<ShiftInvite> {

        const {user, em} = context
        let me = user as Business

        let shiftInvite = await em.findOneOrFail(ShiftInvite, {id: input.shift_invite_id, worker: {id: input.worker_id}})

        if (shiftInvite.shift.day.creator.id != me.id) {
            throw new Error(`Can't un-invite users from a shift that doesn't belong to you.`)
        }

        console.log(`Found shift invite: ${JSON.stringify(shiftInvite)}`)

        // send a worker an invitation email.
        // sendUnInviteEmail(shiftInvite.worker, me, shiftInvite)

        // TODO: Later on you can deactivate the shift invite instead.
        // shiftInvite.deactivateInvite()
        // await em.persistAndFlush(shiftInvite)

        await em.removeAndFlush(shiftInvite)


        return shiftInvite
    }
}