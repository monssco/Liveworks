import { Business } from '../../../entities/Business/Business';
import { MyContext } from 'src/types';
import {Ctx, Query, Resolver} from 'type-graphql';

@Resolver()
export class MeBusinessResolver {

    @Query(() => Business, {description: 'Retrieve the current user business'})
    async retrieveBusiness(
        @Ctx() {user}: MyContext
    ) {
        return user;
    }
}