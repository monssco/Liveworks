import {Field, ID, ObjectType} from 'type-graphql';
import {Entity, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import { ProfileImage } from './ProfileImage';

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

    /*
    https://mikro-orm.io/docs/relationships#onetoone
    */
    @Field(()=> ProfileImage, {nullable: true})
    @OneToOne(()=> ProfileImage, (image)=> image.user, {owner: true})
    profile_image?: ProfileImage;

    @Field({nullable: true})
    @Property({nullable: true})
    first_name?: string;

    @Field({nullable: true})
    @Property({nullable: true})
    last_name?: string;

    @Field({nullable: true})
    @Property({columnType: "date", nullable: true})
    date_of_birth?: Date;

    // Good idea to have them separate or all together?
    @Field({nullable: true})
    @Property({nullable: true})
    city?: string;

    @Field({nullable: true})
    @Property({nullable: true})
    province?: string;

    @Field({nullable: true})
    @Property({nullable: true})
    country?: string

    // Stripe related ids
    @Field({nullable: true})
    @Property({nullable: true})
    stripe_customer_id?: string

    @Field({nullable: true})
    @Property({nullable: true})
    stripe_account_id?: string

    // Field decorator is emitted, this property will not be exposed via the api
    // timestampz = time with timezone in postgresql lingo
    @Property({columnType: "timestamptz", nullable: false})
    created = new Date();


    @Property({columnType: "timestamptz", onUpdate: () => new Date().toISOString() })
    modified = new Date();

    @Property({columnType: "boolean"})
    status = true

}
