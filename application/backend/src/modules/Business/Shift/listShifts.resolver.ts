import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Query } from "type-graphql"
import { Shift } from "../../../entities/Shift/Shift";
import { WorkDay } from "../../../entities/WorkDay/WorkDay";

@InputType()
class ListShiftsInput {

    @Field()
    work_day_id!: string

    @Field()
    limit!: number

    @Field()
    offset!: number

    @Field({nullable: true, description:"Provide a position id if you want shifts for a given position."})
    position_id?: string
}

export class ListShifts {
    @Query(()=> [Shift], { description: "Lists all of the shifts on a given workday."})
    async businessListShifts(
        @Arg ("input") input: ListShiftsInput,
        @Ctx() { em, user }: MyContext
    ): Promise<Shift[]> {

        let workDay = await em.findOneOrFail(WorkDay, {id: input.work_day_id})
        let shifts = await em.find(Shift, {day: workDay, active: true}, {limit: input.limit, offset: input.offset})

        if (workDay.creator.id != user.id) {
            throw new Error(`You can't retrieve another user's shifts.`)
        }

        return shifts
    }
}