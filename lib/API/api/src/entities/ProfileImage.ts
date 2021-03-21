import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class ProfileImage {

    // One user can only have one profile image
    @OneToOne(() => User, (user) => user.profile_image)
    user!: User;

    @Field()
    @PrimaryKey()
    original_key!: string;

    @Field({nullable: true})
    @Property()
    resized_medium?: string;

    @Field({nullable: true})
    @Property()
    resized_small?: string;

    @Field({nullable: true})
    @Property()
    resized_large?: string;

}