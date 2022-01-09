import {Field, ID, ObjectType} from 'type-graphql';
import {BigIntType, Entity, PrimaryKey, Property} from '@mikro-orm/core';
import {v4} from 'uuid';
import { getUnixTime } from 'date-fns';

/**
 * Business Type, a type of a business.
 * We create these on the backend and let the frontend display them as they please.
 */
@ObjectType()
@Entity()
export class BusinessType {

    constructor(name: string) {
        this.id = `bussType_${v4().slice(0, 16)}`
        this.name = name
    }


    @Field(() => ID)
    @PrimaryKey()
    id!: string;

    @Field()
    @Property()
    name!: string;

    @Field()
    @Property()
    active: boolean = true


    // Field decorator is emitted, this property will not be exposed via the api.
    @Property({type: BigIntType})
    created = getUnixTime(new Date());

    @Property({type: BigIntType, onUpdate: () => getUnixTime(new Date())})
    modified = getUnixTime(new Date())

    /**
     * Instead of deleting this position, quietly deactivate it.
     */
    deactivatePosition() {
        this.active = false
    }

}