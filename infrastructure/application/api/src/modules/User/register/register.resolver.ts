import { User } from "../../../entities/User/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, ID, InputType, Mutation, Resolver } from "type-graphql";

@InputType()
export class RegisterUserInput implements Partial<User> {
    @Field(()=> ID, {nullable: false})
    id: string;

    @Field({nullable: false})
    email: string;
    
}

@Resolver()
export class RegisterResolver {
    @Mutation(()=> User, {nullable: false})
    async registerUser(
        @Arg("user", {nullable: false}) user: RegisterUserInput,
        @Ctx() {em}: MyContext) {
        const newUser = new User(user.id, user.email)
        await em.persistAndFlush(newUser);
        
        // TODO: Send them a welcome email
        console.log("SEND EMAIL TO", newUser.email)
        
        return newUser
    }
}