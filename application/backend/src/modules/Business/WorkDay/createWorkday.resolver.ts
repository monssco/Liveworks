import { fromUnixTime, isDate, startOfDay, getUnixTime } from "date-fns";
import { Business } from "src/entities/Business/Business";
import { MyContext } from "src/types";
import { Arg, Ctx, Int, Mutation } from "type-graphql"
import { WorkDay } from "../../../entities/WorkDay/WorkDay";

// Get start of day in unix
// Check if start of day is already created
// If that day is already in db, return it
// otherwise create a new work day, save it in db and return that

export class CreateWorkDayResolver {
    @Mutation(()=> WorkDay, {description: "Use this endpoint to create a work day. If a workday exists already, it will be returned."})
    async businessCreateWorkDay(
        @Arg("for", () => Int, {description: 'Unix timestamp'}) date_input: number,
        @Ctx() { user, em }: MyContext
    ): Promise<WorkDay> {

        if (!isDate(fromUnixTime(date_input))) {
            throw new Error(`${date_input} is not a correct unix timestamp, please try again.`)
        }

        let dayStart = startOfDay(fromUnixTime(date_input))

        let startOfDayUnix = getUnixTime(dayStart)

        console.log(`Start of Day ${dayStart}`)

        let me = user as Business
        let workDay = await em.findOne(WorkDay, {creator: me, date: startOfDayUnix.toString()})

        console.log(`Me ${JSON.stringify(me)}`)

        if (workDay) {
            console.log(`Work day exists: ${JSON.stringify(workDay)}`)
        } else {
            console.log(`Work day doesn't exist`)
            workDay = new WorkDay(me, startOfDayUnix)
            em.clear()
            await em.persistAndFlush(workDay)
        }

        return workDay
    }
}