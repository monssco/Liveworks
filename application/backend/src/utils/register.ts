import { EntityManager } from '@mikro-orm/core';
import express from 'express';
import { Business } from '../entities/Business/Business';
import { Worker } from '../entities/Worker/Worker';
import { USER_TYPE } from '../types';
import { sendRegistrationEmail } from './Email/sendRegistrationEmail';
const router = express.Router();

//For destructuring JSON
router.use(express.json())

/**
 * Responsible for registering users after they have been signed up (& confirmed)
 */
export class RegisterUserManager {
    
    private em: EntityManager;

    constructor(em: EntityManager){
        this.em = em
    }

    getRegisterRouter(): express.IRouter {
        return router.post('/', async (req, res) => {
            let {sub, email, type} = req.body
            console.log(sub)
            console.log(email)
            console.log(type)

            console.log("Body", req.body)

            if (!sub || !email || !type){
                res.status(400).json({
                    message: "sub, email or type not provided in post body",
                    result: 'error'
                })
                return
            }

            if (type === USER_TYPE.BUSINESS) {
                console.log("NEW BUSINESS ACCOUNT")

                const newUser = new Business(sub as string, email as string)

                try {
                    await this.em.persistAndFlush(newUser);
                } catch (e) {
                    // Exception can be thrown if a business already exists in the db.
                    console.log(`Error: ${e}`)
                    res.status(500).send(`Error: ${e}`)
                    return
                }

                console.log("SEND WELCOME EMAIL TO", newUser.email)
                sendRegistrationEmail(newUser.email)
                
                res.json(
                    {
                        result: 'success',
                        sub,
                        email,
                        type
                    }
                )
                
                return

            } else if (type === USER_TYPE.WORKER) {
                // WORKER ACCOUNT
                console.log("NEW WORKER ACCOUNT")

                // Grab their invite code from this request body
                let {invite_code} = req.body

                console.log(invite_code)
                
                // Lookup them up in the database.

                let worker = await this.em.findOne(Worker, {invitation_code: invite_code})

                try {
                    // If someone signs up with a business id, try to find their employer,
                    // otherwise sign them up without an employer
                    if (worker) {
                        console.log("Found the worker")
                        worker.id = sub
                        worker.confirmed = true
                        await this.em.persistAndFlush(worker);
                        console.log("SEND WELCOME EMAIL TO", worker.email)
                        sendRegistrationEmail(worker.email)
                    } else {
                        console.log("Didn't find any invitation code, sign them up regardless")
                        let worker = new Worker(email)
                        worker.id = sub
                        // Not invited by anyone, they joined on their own accord.
                        worker.invited = false
                        worker.confirmed = true
                        await this.em.persistAndFlush(worker);
                        console.log("SEND WELCOME EMAIL TO", worker.email)
                        sendRegistrationEmail(worker.email)
                    }
                } catch (e){
                    // Exception is thrown if a worker already exists in the db.
                    console.log(`Error: ${e}`)
                    res.status(500).send(`Error: ${e}`)
                    return
                }

                res.json(
                    {
                        result: 'success',
                        sub,
                        email,
                        type
                    })
                return
            } else {
                res.status(400).send("Unable to infer user type, please check your values and try again.")
                return
            }
        })
    }
}