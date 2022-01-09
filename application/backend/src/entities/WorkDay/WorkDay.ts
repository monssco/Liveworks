import {Field, ID, Int, ObjectType} from 'type-graphql';
import { BigIntType, Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Business } from '../Business/Business';
import { Shift } from '../Shift/Shift';
import { getUnixTime, startOfDay } from 'date-fns';


/**
 * A workday for a business consists of a 24 hour period starting from 0:00 local time to 12:00 UTC time.
 */
@ObjectType()
@Entity()
export class WorkDay {

    /**
     * Constructor for a workday.
     * @param creator The business that created this workday.
     * @param date Date of the workday in UNIX timestamp.
     */
    constructor(creator: Business, date: number ) {
        let generatedCode = v4().slice(0, 16)
        this.id = `day_${generatedCode}`
        this.creator = creator
        this.date = date.toString()
    }

    @Field(() => ID)
    @PrimaryKey()
    id!: string;

    /**
     * Each work day is created by a business.
     */
    @Field(() => Business)
    @ManyToOne(() => Business)
    creator: Business;

    /**
     * This date is stored in unix time and is always stored as the start of the given day.
     * Maybe this could be make into a pk along with creator id? Think on it.
     */
    @Field(() => Int, {description:'Represented as a unix timestamp'})
    @Property({type: BigIntType})
    date: string;

    /**
     * A given workday can have multiple shifts attached to it.
     */
    @Field(() => [Shift], {nullable: true})
    @OneToMany(() => Shift, shift => shift.day, { cascade: [Cascade.ALL], nullable: true })
    shifts = new Collection<Shift>(this);
    
    // Field decorator is emitted, this property will not be exposed via the api.
    @Property({type: BigIntType})
    created = getUnixTime(new Date());

    @Property({type: BigIntType, onUpdate: () => getUnixTime(new Date())})
    modified = getUnixTime(new Date())

    hasPassed(): boolean {

        let now = new Date()
        let start_of_today = getUnixTime(startOfDay(now))
        
        if(parseInt(this.date) < start_of_today) {
            return true
        }

        return false
    }
}