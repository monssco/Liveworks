
export const resolver = {
    Query: {
        getListing: async (_: any, args:any, context: any) => {
            return []
        },
    },
    Mutation: {
        addListing: async(_:any, args: any) => {
            return "success"
        },
        // addUser: async (_: any, args: any) => {
        //     const { id, email, signup, active } = args;

        //     // return true;
        //     // try {

        //         console.log(args)

        //         const text = 'INSERT INTO public.user(id, email, first_name, last_name, signup, city, province, country, active, stripe_customer, stripe_account) VALUES($1, $2, NULL, NULL, $3, NULL, NULL, NULL, $4, NULL, NULL) RETURNING *'
        //         const values = [id ,email, signup, active]

                
                
        //         const result = await dbClient.query(text, values)

        //         console.log(result);

        //         return result.rows[0];
        //     // } catch (error) {
        //     //     console.log(error);
        //     //     return false;
        //     // }
        // }
    }
}