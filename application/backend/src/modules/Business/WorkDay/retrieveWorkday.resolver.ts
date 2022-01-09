import { fromUnixTime, isDate, startOfDay, getUnixTime } from "date-fns";
import { Business } from "src/entities/Business/Business";
import { MyContext } from "src/types";
import { Arg, Ctx, Int, Query } from "type-graphql"
import { WorkDay } from "../../../entities/WorkDay/WorkDay";

// Get start of day in unix
// Find start of day in db for this user
// If it exists return it, otherwise don't

export class RetrieveWorkDayResolver {
    @Query(()=> WorkDay, { nullable: true,description: "Use this endpoint to retrieve a work day that overlaps with the given unix timestamp. If no workday exists, the return value will be null"})
    async businessRetrieveWorkDay(
        @Arg("for", () => Int, {description: 'Unix timestamp'}) date_input: number,
        @Ctx() { user, em }: MyContext
    ): Promise<WorkDay | null> {

        if (!isDate(fromUnixTime(date_input))) {
            throw new Error(`${date_input} is not a correct unix timestamp, please try again.`)
        }

        let dayStart = startOfDay(fromUnixTime(date_input))

        let startOfDayUnix = getUnixTime(dayStart)

        let me = user as Business
        
        let workDay = await em.findOne(WorkDay, {creator: me, date: startOfDayUnix.toString()})

        return workDay
    }
}