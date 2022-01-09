import {Field, ID, Int, ObjectType} from 'type-graphql';
import {BigIntType, Collection, Entity, ManyToOne, OneToMany, Property} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { WorkDay } from '../WorkDay/WorkDay';
import { WorkerPosition } from '../WorkerPosition/WorkerPosition';
import { ShiftInvite } from '../ShiftInvite/ShiftInvite';
import { getUnixTime } from 'date-fns';

// The primary and foreign keys here could use work.
// I think that they are ok for now, but in the future could pose issues.
// I am not 100% sure if this is the right way but it works for now.

/**
 * A shift entity
 */
@ObjectType()
@Entity()
export class Shift {

    /**
     * 
     * @param day The workday on which this given shift is supposed to be made.
     * @param position The position for which this shift belongs to.
     * @param start_time The shift's start time in UNIX timestamp.
     * @param end_time The end time of this shift, also stored as a UNIX timestamp.
     */
    constructor(day: WorkDay, position: WorkerPosition, rate: number, start_time: number, end_time: number ) {
        let generatedCode = v4().slice(0, 16)
        this.id = `shift_${generatedCode}`
        this.day = day
        this.position = position

        this.rate = rate
        this.start_time = start_time.toString()
        this.end_time = end_time.toString()
    }

    /**
     * Id of the shift
     */
    @Field(() => ID)
    @Property({primary: true})
    id!: string;

    /**
     * Each shift is related to a work day. Shifts can't exist without work days.
     * This is a foreign key, you can't have many 
     */
    @Field(() => WorkDay)
    @ManyToOne(() => WorkDay, {primary: true})
    day!: WorkDay;

    /**
     * Each shift is attached to a position.
     * This is a foreign key constraint, you can't have the same positions repeated for the same day.
     */
    @Field(() => WorkerPosition)
    @ManyToOne(() => WorkerPosition, {primary: true})
    position!: WorkerPosition

    /**
    * Start time, stored as UNIX time.
    */
    @Field(() => Int,{description: 'Unix timestamp'})
    @Property({type: BigIntType, primary: true})
    start_time!: string;

    /**
     * End time, stored as UNIX time.
     */
    @Field(() => Int, {description: 'Unix timestamp.'})
    @Property({type: BigIntType, primary: true})
    end_time!: string;

    /**
     * Each shift has allocated workers.
     */
    @Field(() => [ShiftInvite], {nullable: true})
    @OneToMany(() => ShiftInvite, invite => invite.shift, { orphanRemoval: true, nullable: true })
    shiftInvites = new Collection<ShiftInvite>(this);

    @Field({nullable: true})
    @Property({nullable: true, length: 600})
    notes?: string;

    /**
     * Rate passed in as an int
     */
    @Field()
    @Property()
    rate!: number

    @Field({nullable: true})
    @Property({nullable: true})
    address?: string

    
    // Field decorator is emitted, this property will not be exposed via the api.
    @Property({type: BigIntType})
    created:string = getUnixTime(new Date()).toString()

    @Property({type: BigIntType, onUpdate: () => getUnixTime(new Date())})
    modified: string = getUnixTime(new Date()).toString()

}