import {Field, ID, ObjectType} from 'type-graphql';
import { BigIntType, Entity, ManyToOne, Property} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Worker } from '../Worker/Worker';
import { Shift } from '../Shift/Shift';
import { getUnixTime } from 'date-fns';

/**
 * A shift invite type, each worker is attached to one shift invite.
 * 
 * Later on, when workers are invited for specific shift separately, they will get their own start and end time.
 */
@ObjectType()
@Entity()
export class ShiftInvite {

    constructor(shift: Shift, worker: Worker) {
        let generatedCode = v4().slice(0, 16)
        this.id = `shift_invite_${generatedCode}`
        this.shift = shift
        this.worker = worker
    }

    /**
     * Each shift invite has a unique id.
     */
    @Field(() => ID)
    @Property()
    id!: string;

    /**
     * One shift can have multiple shift invites, or many shift invites can belong to one shift.
     */
    @Field(() => Shift)
    @ManyToOne(() => Shift, {primary: true})
    shift!: Shift;

    /**
     * Each shift has a worker.
     */
    @Field(() => Worker)
    @ManyToOne(() => Worker, {primary: true})
    worker!: Worker

    /**
     * If a worker gets invited via email, this boolean will be true.
     */
    @Field({nullable: true})
    @Property({nullable: true})
    invited?: boolean
    
    // Field decorator is emitted, this property will not be exposed via the api.
    @Property({type: BigIntType})
    created = getUnixTime(new Date());

    @Property({type: BigIntType, onUpdate: () => getUnixTime(new Date())})
    modified = getUnixTime(new Date())

}