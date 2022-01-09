import fs from 'fs';
import handlebars from 'handlebars';
import Mail from 'nodemailer/lib/mailer';
import path from 'path';
import { Worker } from '../../entities/Worker/Worker';
import { Business } from '../../entities/Business/Business';
import {sendEmail} from './sendEmail'
import { Shift } from '../../entities/Shift/Shift';

/**
 * TODO: This is not yet finished, will need a template from Jose and I need to generate a unique link.
 * 
 * Sends an invitation email to a worker for a shift
 * @param to email address to send the email to.
 * @param from the business that's doing the sending
 */
export const sendShiftInviteEmail = async (to: Worker, from: Business, shift: Shift) => {

    const filePath = path.join(__dirname, './templates/invite_worker.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
    };

    //TODO: Put their unique code in the signup email link.
    //
    console.log("Invitation code", to.invitation_code)
    console.log("Invite for position ", to.position)

    console.log('Shift', shift)

    const htmlToSend = template(replacements);

    let subject = 'You have been invited to join Liveworks!'

    if (from.name){
        subject = `${from.name} invited you to join Liveworks!`
    }

    // let domain = process.env.HOST ? process.env.HOST : 'localhost:3000'

    const message: Mail.Options = {
        from: '"Liveworks" <no-reply@liveworks.app>',
        to: to.email,
        subject,
        text: "Welcome to Liveworks!",
        html: htmlToSend
    };
    await sendEmail(message)
}