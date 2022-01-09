import { BusinessType } from "../../../entities/BusinessType/BusinessType";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation } from "type-graphql"
import { Business } from "../../../entities/Business/Business";

/**
 * Anything that is null in the inputs will just be discarded.
 */
@InputType()
class UpdateBusinessInput {

    @Field({nullable: true})
    email?: string;

    @Field({nullable: true})
    name?: string

    /**
     * Location related fields
     */
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

    @Field({nullable: true, description: "id of the business type"})
    type_id?: string
}


export class UpdateBusinessResolver {
    @Mutation(()=> Business, {description: "Update your business information"})
    async updateBusiness(
        @Arg("business",) {email, name, address, city, state, postal, country, type_id}: UpdateBusinessInput,
        @Ctx() {em, user}: MyContext
    ) {
        const me = user as Business

        if (email) {
            me.email = email
        }

        if (name) {
            me.name = name
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

        if (type_id) {
            try {
                let busType = await em.findOneOrFail(BusinessType, {id: type_id})
                me.type = busType
            } catch (error) {
                console.log(`Unable to find business type.`)
                console.log(error)
            }
        }

        await em.persistAndFlush(me);

        return me
    }
}