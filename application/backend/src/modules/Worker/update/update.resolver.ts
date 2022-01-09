import { Worker } from "../../../entities/Worker/Worker";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation } from "type-graphql"

/**
 * Anything that is null in the inputs will just be discarded.
 */
@InputType()
class UpdateWorkerInput {

    @Field({nullable: true})
    email?: string;

    @Field({nullable: true})
    first_name?: string

    @Field({nullable: true})
    last_name?: string

    @Field({nullable: true})
    address?: string

    @Field({nullable: true})
    city?: string

    @Field({nullable: true})
    state?: string

    @Field({nullable: true})
    postal?: string

    @Field({nullable: true})
    country?: string
}


export class UpdateWorkerResolver {
    @Mutation(()=> Worker)
    async updateWorker(
        @Arg("worker") {email, first_name, last_name, address, city, state, postal, country}: UpdateWorkerInput,
        @Ctx() {em, user}: MyContext
    ) {
        const me = user as Worker

        if (email) {
            me.email = email
        }

        if (first_name) {
            me.first_name = first_name
        }

        if (last_name) {
            me.last_name = last_name
        }

        if (address) {
            me.address = address
        }

        if (city){
            me.city = city
        }

        if (state) {
            me.state = state
        }

        if (postal) {
            me.postal = postal
        }

        if (country) {
            me.country = country
        }

        await em.persistAndFlush(me);

        return me
    }
}