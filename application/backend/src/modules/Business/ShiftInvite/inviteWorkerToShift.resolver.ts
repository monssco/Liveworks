import { MyContext } from "src/types";
// import { sendShiftInviteEmail } from "../../../utils/Email/inviteWorkerToShift/sendShiftInvite";
import { Arg, Ctx, Field, InputType, Mutation } from "type-graphql"
import { Business } from "../../../entities/Business/Business";
import { Worker } from "../../../entities/Worker/Worker";
import { ShiftInvite } from "../../../entities/ShiftInvite/ShiftInvite";
import { Shift } from "../../../entities/Shift/Shift";

/**
 * Creates or pulls out a workday from the database, creates a shift, invites workers and stores everything in the db.
 */

@InputType()
class InviteWorkerToShiftInput {

    @Field()
    shift_id!: string

    @Field()
    worker_id!: string

}

/**
 * Responsible for creating a shift.
 * worker_ids and notes are optional.
 */
export class InviteWorkerToShift {
    @Mutation(()=> ShiftInvite, {description: "Use this endpoint to invite a worker to a shift."})
    async businessInviteWorkerToShift(
        @Arg("input") input: InviteWorkerToShiftInput,
        @Ctx() context: MyContext
    ): Promise<ShiftInvite> {

        const {user, em} = context
        let me = user as Business

        let shift = await em.findOneOrFail(Shift, {id: input.shift_id}, ['day.creator'])

        if (shift.day.creator.id != me.id) {
            throw new Error(`Can't invite users to a shift that doesn't belong to you.`)
        }

        let worker = await em.findOneOrFail(Worker, input.worker_id)
        let shiftInvite = new ShiftInvite(shift, worker)

        shiftInvite.invited = true

        //TODO: Only invite a worker to a shift if they are not already invited.


        // send a worker an invitation email.
        // sendShiftInviteEmail(worker, me, shift)

        await em.persistAndFlush(shiftInvite)

        return shiftInvite
    }
}