import { User } from '../../entities/User';
import { MyContext } from 'src/types';
import {Arg, Ctx, Field, InputType, Mutation, Query, Resolver} from 'type-graphql';
import { ID } from 'type-graphql';

/*
Problem: So when you attach listings to a user, and that user's information is made public, how should it be handled? We can't return a user type, it will also expose the stripe ids and more stuff, need a way to only expose stuff that can be exposed, nothing sensitive.
*/

@InputType()
class RegisterUserInput implements Partial<User> {
    @Field(()=> ID)
    id: string;

    @Field()
    email: string;

    @Field({nullable: true})
    first_name: string;

    @Field({nullable: true})
    last_name: string;

    @Field({nullable: true})
    date_of_birth: Date;
}

@InputType()
class UpdateUserInput implements Partial<User> {
    @Field(()=> ID)
    id: string;

    @Field({nullable: true})
    first_name?: string;

    @Field({nullable: true})
    last_name?: string;

    @Field( {nullable: true})
    date_of_birth?: Date;
}

@Resolver()
export class MeResolver {

    @Query(() => User)
    async me(
        @Arg("id") id: string,
        @Ctx() {em}: MyContext
    ) {
        const me = await em.findOneOrFail(User, {id})
        return me;
    }

    @Mutation(()=> User)
    async registerUser(
        @Arg("user") user: RegisterUserInput,
        @Ctx() {em}: MyContext) {
        const newUser = new User(user.id, user.email)
        newUser.first_name = user.first_name
        newUser.last_name = user.last_name
        newUser.date_of_birth = user.date_of_birth
        await em.persistAndFlush(newUser);
        return newUser
    }

    @Mutation(()=> User)
    async updateUser(
        @Arg("user") {id, date_of_birth, first_name, last_name}: UpdateUserInput,
        @Ctx() {em}: MyContext
    ) {
        const me = await em.findOne(User, {id})

        if (!me) {
            throw Error("User not found")
        }

        if (first_name) {
            me.first_name = first_name
        }

        if (last_name) {
            me.last_name = last_name
        }

        if (date_of_birth) {
            me.date_of_birth = date_of_birth
        }
        await em.persistAndFlush(me);

        return me
    }
}
