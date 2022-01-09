import { MyContext } from "src/types";
import { Arg, Ctx, Query } from "type-graphql"
import { Business } from "../../../entities/Business/Business";


export class CheckInviteCodeResolver {
    @Query(()=> Business, {description: "Given an invite code, it will retrieve the business information that is related to it. If no such business is found, it will respond with an error."})
    async checkInviteCode(
        @Arg("code", ) code: string,
        @Ctx() {em}: MyContext
    ) {
        try {
            let business = await em.findOneOrFail(Business, {invite_code: code})
            return business
        } catch (e) {
            console.log(`Error finding business from invite code\n ${JSON.stringify(e)}`)
            throw e
        }
    }
}