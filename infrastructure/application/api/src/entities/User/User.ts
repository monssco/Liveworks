import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, PrimaryKey, Property} from '@mikro-orm/core';

@ObjectType()
@Entity()
export class User {

    constructor(id: string, email: string ) {
        this.id = id
        this.email = email
    }

    @Field(() => ID)
    @PrimaryKey()
    id!: string;

    /*
    A user is not allowed to update their email after sign up.
    */
    @Field()
    @Property()
    email!: string;

}
