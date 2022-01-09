import { User } from '../../../entities/User/User';
import { MyContext } from 'src/types';
import {Ctx, Query, Resolver} from 'type-graphql';

@Resolver()
export class MeResolver {

    @Query(() => User, {nullable: true})
    async me(
        @Ctx() {user}: MyContext
    ) {

        return user;
    }
}
