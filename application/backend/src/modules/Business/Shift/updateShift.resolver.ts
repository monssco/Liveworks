import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Int, Mutation } from "type-graphql"
import { Shift } from "../../../entities/Shift/Shift";
import { CreateWorkDayResolver } from "../WorkDay/createWorkday.resolver";
import { Business } from "../../../entities/Business/Business";
import { UnInviteWorkerToShift } from "../ShiftInvite/unInviteWorkerToShift.resolver";
import { InviteWorkerToShift } from "../ShiftInvite/inviteWorkerToShift.resolver";

// Get all the updates needed from input
// Apply them one by one, at the end send an email to the people once those changes have been registered in the db

@InputType()
class UpdateShiftInput {

    @Field()
    shift_id!: string

    @Field(()=> Int, {nullable: true, description: 'unix timestamp'})
    start_time?: number;

    @Field(()=> Int, {nullable: true, description: 'unix timestamp'})
    end_time?: number;

    @Field(() => Int, {nullable: true})
    rate?: number;

    @Field({nullable: true, description: `Notes that the workers should know about.`})
    notes?: string;

    @Field({nullable: true})
    address?: string

    @Field(() => [String], {description: "String that contains the ids of all the workers, if they are omitted, that means that they have been uninvited from the shift."})
    worker_ids!: string[]

}


export class UpdateShiftResolver {
    @Mutation(()=> Shift, {description: "Updates a shift, send all workers regardless."})
    async businessUpdateShift(
        @Arg("input") input: UpdateShiftInput,
        @Ctx() context: MyContext
    ): Promise<Shift> {

        var isShiftMutated = false

        const {em, user} = context

        let me = user as Business

        let shift = await em.findOneOrFail(Shift, {id: input.shift_id}, {
            populate: ['day.creator', 'shiftInvites']
        })

        if (shift.day.hasPassed()) {
            throw new Error(`This day has already passed.`)
        }

        if (me.id !== shift.day.creator.id) {
            console.log(`You can't edit someone else's shifts.`)
        }

        // If start time is passed in, make sure its not the same as before.
        // Otherwise update it.
        if (input.start_time) {
            if (input.start_time !== parseInt(shift.start_time)) {
                console.log("Start time for this shift is different.")
                console.log(`Old start time: ${shift.start_time}`)
                console.log(`New start time: ${input.start_time}`)
                shift.day = await new CreateWorkDayResolver().businessCreateWorkDay(input.start_time, context)
                shift.start_time = input.start_time.toString()
                isShiftMutated = true
            }
        }

        if (input.end_time) {
            if (input.end_time !== parseInt(shift.end_time)) {
                console.log("End time is different for this shift, updating it.")
                console.log(`Old end time: ${shift.end_time}`)
                console.log(`New end time: ${input.end_time}`)
                shift.end_time = input.end_time.toString()
                isShiftMutated = true
            }
        }

        if (input.rate) {
            if (input.rate !== shift.rate) {
                console.log("Rate is different, update it.")
                shift.rate = input.rate
                isShiftMutated = true
            }
        }

        if (input.notes) {
            if (input.notes !== shift.notes) {
                console.log("Notes are updated.")
                shift.notes = input.notes
                isShiftMutated = true
            }
        }

        if (input.address) {
            if (input.address !== shift.address) {
                console.log("Shift is updated.")
                shift.address = input.address
                isShiftMutated = true
            }
        }

        // Workers will come as an array of strings.
        // You can treat them as a set of workers.
        // Then, you can fetch the current workers that have been already scheduled for this shift and see
        // what the differences are. 
        // If someone is missing, you send them a cancellation email.
        // If someone is new, you send them a welcome email.
            
        let shiftInvites = shift.shiftInvites.getItems()

        console.log(`shift invites: ${JSON.stringify(shiftInvites)}`)
        
        // Make an array for keeping track of the shift invite id. (not the cleanest approach)
        let currentWorkersObj: {[key: string]: string} = {}
        
        let workerIds = shiftInvites.map(shiftInvite => {

            currentWorkersObj[shiftInvite.worker.id] = shiftInvite.id
            
            return shiftInvite.worker.id
        })

        console.log(`current worker ids: ${JSON.stringify(workerIds)}`)

        console.log(`input worker ids: ${JSON.stringify(input.worker_ids)}`)
        
        // need to find out the difference in workers.
        // set A = {a, b, c, d}
        // Take all the invites, and turn them into a string of arrays.
        // Then wrap them in a set.
        // Make a set of current workers. 
        let currentWorkers = new Set(workerIds)

        console.log(`Current workers:`)
        currentWorkers.forEach(workerId => {
            console.log(`-- worker id: ${workerId}`)
        })

        // set B = {a, c, d, f}
        let inputWorkers = new Set(input.worker_ids)
        console.log(`Input workers (we got from user):`)
        inputWorkers.forEach(workerId => {
            console.log(`-- worker id: ${workerId}`)
        })

        // B - A = { b }
        // These are the workers whom have been cancelled from this shift.
        let cancelledWorkers = new Set([...currentWorkers].filter(x => !inputWorkers.has(x)));

        console.log(`Cancelled workers (not included in the user request):`)
        cancelledWorkers.forEach(workerId => {
            console.log(`-- worker id: ${workerId}`)
        })

        for (const worker of cancelledWorkers) {
            console.log(`Uninviting worker: ${worker}`)
            try {
                await new UnInviteWorkerToShift().businessUnInviteWorkerToShift({shift_invite_id: currentWorkersObj[worker], worker_id: worker}, context)
                console.log('Successfully uninvited worker.')
            } catch (error) {
                console.log(`Error uninviting worker: ${error}`)
            }
            
        }
        
        // A - B = { f }
        // These are workers we have not seen before, so invite them.
        let newWorkers = new Set([...inputWorkers].filter(x => !currentWorkers.has(x)));

        console.log(`New workers (not seen before, but now we need to invite them):`)
        newWorkers.forEach(workerId => {
            console.log(`-- worker id: ${workerId}`)
        })

        for (const worker of newWorkers) {
            console.log(`Invite worker: ${worker}`)
            try {
                await new InviteWorkerToShift().businessInviteWorkerToShift({shift_id: shift.id, worker_id: worker}, context)
            } catch (error) {
                console.log(`Error inviting worker: ${worker}`)
            }
        }

        // // currentWorkers - cancelledWorkers
        // // Find the shift invite that this workers is attached to.
        // let oldWorkers = new Set([...currentWorkers].filter(x => !cancelledWorkers.has(x)))
        // console.log(`Old workers: ${JSON.stringify(oldWorkers)}`)
        // oldWorkers.forEach(async worker => {
        //     console.log(`Send cancellation email to ${worker}`)
        //     let shiftInviteId = currentWorkersObj[worker]
        //     await new UnInviteWorkerToShift().businessUnInviteWorkerToShift({shift_invite_id: shiftInviteId, worker_id: worker}, context)
        // })

        // console.log(`oldWorkers: ${JSON.stringify(oldWorkers)}`)


        if (isShiftMutated) {
            console.log("Shift is mutated.")
            // Here you can send all of the workers an email with the updated shift details.
            // A and B = {a, c, d}
            // tbe = to be emailed
            let tbeWorkers  = new Set([...currentWorkers].filter(x => inputWorkers.has(x)))
            for (const worker of tbeWorkers) {
                console.log(`Send update email to ${worker}`)
                // let shiftInviteId = currentWorkersObj[worker]
                // await new SendShiftUpdateEmail().businessSendShiftUpdateEmail({shift_invite_id: shiftInviteId, worker_id: worker}, context)
            }
        }

        await em.persistAndFlush(shift)

        return shift
    }
}