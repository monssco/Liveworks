import {Field, ID, Int, ObjectType} from 'type-graphql';
import {BigIntType, Entity, ManyToOne, PrimaryKey, Property} from '@mikro-orm/core';
import {v4} from 'uuid';
import { Business } from '../Business/Business';
import { getUnixTime } from 'date-fns';

/**
 * Worker Position Table
 */
@ObjectType()
@Entity()
export class WorkerPosition {

    constructor(name: string, rank: number, color: string, isPublic: boolean, creator?: Business ) {
        this.id = `pos_${v4().slice(0, 16)}`
        this.name = name
        this.rank = rank
        this.color = color
        this.creator = creator
        this.public = isPublic
    }


    @Field(() => ID)
    @PrimaryKey()
    id!: string;

    @Field()
    @Property()
    name!: string

    @Field(()=> Int)
    @Property()
    rank!: number

    @Field()
    @Property()
    color!: string

    // public shift
    @Field()
    @Property()
    public: boolean = true

    @Field()
    @Property()
    active: boolean = true

    // if it isn't public, there will be a creator here
    @Field(()=> Business, {nullable: true})
    @ManyToOne(()=>Business, {nullable: true})
    creator?: Business

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