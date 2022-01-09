import { MyContext } from 'src/types';
import {Ctx, Query, Resolver} from 'type-graphql';
import { Worker } from '../../../entities/Worker/Worker';

@Resolver()
export class MeWorkerResolver {

    @Query(() => Worker, {nullable: true})
    async worker(
        @Ctx() {user}: MyContext
    ) {
        return user;
    }
}