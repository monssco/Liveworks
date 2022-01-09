import { MyContext } from "src/types";
import { Arg, Ctx, Query } from "type-graphql"
import { Shift } from "../../../entities/Shift/Shift";

export class RetrieveShift {
    @Query(()=> Shift, { description: "Lists all of the shifts on a given workday."})
    async businessRetrieveShift(
        @Arg ("id") shift_id: string,
        @Ctx() { em, user }: MyContext
    ): Promise<Shift> {


        // Find the shift, and populate with creators and position.
        let shift = await em.findOneOrFail(Shift, {id: shift_id}, {
            populate: ['day.creator', 'position', 'shiftInvites']
        })

        console.log("shift", JSON.stringify(shift))

        if (shift.day.creator.id != user.id) {
            throw new Error(`You can't retrieve another user's shift.`)
        }

        return shift
    }
}