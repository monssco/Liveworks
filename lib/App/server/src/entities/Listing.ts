import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, PrimaryKey, Property} from '@mikro-orm/core';

@ObjectType()
@Entity()
export class Listing {
    @Field(() => ID)
    @PrimaryKey()
    id: string;

    @Field()
    @Property()
    email: string;

    @Field({nullable: true})
    @Property()
    first_name?: string;

    @Field({nullable: true})
    @Property()
    last_name?: string;

    @Field({nullable: true})
    @Property()
    city?: string;

    @Field({nullable: true})
    @Property()
    jake?: string;

    @Field({nullable: true})
    @Property()
    country?: string

    @Field({nullable: true})
    @Property()
    stripe_customer?: string

    @Field({nullable: true})
    @Property()
    stripe_account?: string

    constructor(id: string, email: string ) {
        this.id = id
        this.email = email
    }
}