import fs from 'fs';
import handlebars from 'handlebars';
import Mail from 'nodemailer/lib/mailer';
import path from 'path';
import {sendEmail} from './sendEmail'

/**
 * Sends a welcome email to a new user.
 * @param to email address to send the email to.
 */
export const sendRegistrationEmail = async (to: string) => {

  const filePath = path.join(__dirname, './templates/welcome.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
  };

  const htmlToSend = template(replacements);

    const message: Mail.Options = {
        from: '"Liveworks" <no-reply@liveworks.app>',
        to,
        subject: "Welcome to Liveworks!",
        text: "Welcome to Liveworks!",
        html: htmlToSend
    };
    await sendEmail(message)
}