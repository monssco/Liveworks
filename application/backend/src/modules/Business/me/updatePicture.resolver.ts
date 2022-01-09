import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { MyContext } from 'src/types';

@Resolver()
export class BusinessUpdatePicture {
    @Mutation(() => Boolean)
    async businessUpdateProfilePicture(
        @Arg('file', () => GraphQLUpload) file: FileUpload,
        @Ctx() {user, em}: MyContext
        ): Promise<boolean> {

            console.log("Got file")
            console.log(file)
        
            const { createReadStream} = await file;

            // images is name of the volume (folder name in our case)
            const dir = `/images/${user.id}`

            // Check to see if directory exists or not
            !existsSync(dir) && mkdirSync(dir);

            const path = `${dir}/profile.png`

            const writableStream = createWriteStream(
                `${dir}/profile.png`,
                { autoClose: true }
            );

            await new Promise((res, rej) => {
                createReadStream()
                    .pipe(writableStream)
                    .on("finish", () => {
                        console.log("file upload success")
                        res(true)
                    })
                    .on("error", (error) => {
                        console.log("error uploading file", error)
                        rej(false)
                    });
            });

            // This is served by the nginx container and if the nginx container switches things it should
            // be updated accordingly.
            if (process.env.NGINX_HOST){
                user.profile_picture = `${process.env.NGINX_HOST}${path}`

                console.log(user.profile_picture)

                await em.persistAndFlush(user)
            } else {
                throw Error("Nginx env vars are not defined")
            }

            return true
    }
}