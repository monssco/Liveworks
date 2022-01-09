import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Int, Mutation } from "type-graphql"
import { WorkerPosition } from "../../../entities/WorkerPosition/WorkerPosition";
import { Shift } from "../../../entities/Shift/Shift";
import { RetrieveWorkDayResolver } from "../WorkDay/retrieveWorkday.resolver";
import { CreateWorkDayResolver } from "../WorkDay/createWorkday.resolver";
import { InviteWorkerToShift } from "../ShiftInvite/inviteWorkerToShift.resolver";

/**
 * Creates or pulls out a workday from the database, creates a shift, invites workers and stores everything in the db.
 */

@InputType()
class CreateShiftInput {

    @Field()
    position_id!: string

    @Field(()=> Int, {description: 'unix timestamp'})
    start_time!: number;

    @Field(()=> Int, {description: 'unix timestamp'})
    end_time!: number;

    @Field(() => Int)
    rate!: number;

    @Field({nullable: true, description: `Notes that the workers should know about.`})
    notes?: string;

    @Field(()=> [String],{nullable: true, description: 'An array of worker ids ex: [uui2u30-dsdsd, ioi93io34-sdsodi9]'})
    worker_ids?: string[]

    @Field({nullable: true})
    address?: string

}

/**
 * Responsible for creating a shift.
 * worker_ids and notes are optional.
 */
export class CreateShiftResolver {
    @Mutation(()=> Shift, {description: "Use this endpoint to create a shift."})
    async businessCreateShift(
        @Arg("input") input: CreateShiftInput,
        @Ctx() context: MyContext
    ): Promise<Shift> {

        const {em, user} = context
        
        if (input.end_time < input.start_time) {
            throw new Error('End time cannot be before start time.')
        }

        // Find the position first
        let position = await em.findOneOrFail(WorkerPosition, {id: input.position_id})

        // Get work day
        let workDay = await new RetrieveWorkDayResolver().businessRetrieveWorkDay(input.start_time, context)

        // If you don't find a workday, make it.
        if (!workDay) {
            console.log(`Workday doesn't exist, so create it.`)
            workDay = await new CreateWorkDayResolver().businessCreateWorkDay(input.start_time, context)
        }

        // Check that the workday hasn't passed.
        if (workDay.hasPassed()) {
            throw new Error(`Can't create shifts on days that have passed.`)
        }

        // Create shift
        console.log("Creating shift")
        let shift = new Shift(workDay, position, input.rate, input.start_time, input.end_time)
        
        if (input.notes) {
            shift.notes = input.notes
        }

        // If the user has a location, use that instead.
        shift.address = user.address

        if (input.address) {
            shift.address = input.address
        }

        await em.persistAndFlush(shift)

        // send invites to workers
        if (input.worker_ids) {
            for (const worker_id of input.worker_ids) {
                await new InviteWorkerToShift().businessInviteWorkerToShift({shift_id: shift.id, worker_id: worker_id}, context)
            }
        }

        return shift
    }
}