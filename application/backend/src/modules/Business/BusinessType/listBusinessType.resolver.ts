import { MyContext } from "../../../types";
import {Ctx, Query } from "type-graphql";
import { BusinessType } from "../../../entities/BusinessType/BusinessType";

// Resolver for listing all business types
export class ListBusinessTypeResolver {
    @Query(() => [BusinessType], {description: "List all business types"})
    async listBusinessType(
        @Ctx() {em}: MyContext
    ): Promise<BusinessType[]> {
        return await em.find(BusinessType, {});
    }
}