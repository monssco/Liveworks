import { MyContext } from "src/types";
import { Arg, Ctx, Mutation } from "type-graphql"
import { Shift } from "../../../entities/Shift/Shift";
import { UnInviteWorkerToShift } from "../ShiftInvite/unInviteWorkerToShift.resolver";

// Get the shift, send un-invite emails to all the workers :(
// mark as deactivated


/**
 * Responsible for creating a shift.
 * worker_ids and notes are optional.
 */
export class DeleteShiftResolver {
    @Mutation(()=> Shift, {description: "This endpoint is used to delete a shift."})
    async businessDeleteShift(
        @Arg("shift_id") shift_id: string,
        @Ctx() context: MyContext
    ): Promise<Shift> {

        const { user, em } = context

        let shift = await em.findOneOrFail(Shift, {id: shift_id}, ['day.creator'])

        if (shift.day.creator?.id !== user.id) {
            throw new Error("You can't delete a shift that isn't your own")
        }

        let invites = shift.shiftInvites

        for (const invite of invites) {
            // send them sorry email here :(
            await new UnInviteWorkerToShift().businessUnInviteWorkerToShift({shift_invite_id: shift.id, worker_id: invite.id}, context)
        }

        // Deactivate shift
        shift.deactivateShift()

        await em.persistAndFlush(shift)

        return shift
    }
}