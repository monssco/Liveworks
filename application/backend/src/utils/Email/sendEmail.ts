import * as nodemailer from 'nodemailer'
import * as aws from '@aws-sdk/client-ses'
import Mail from 'nodemailer/lib/mailer';

// TODO: Put this as env vars.
const ses = new aws.SES({
    apiVersion: "2010-12-01",
    region: "us-east-1",
});

export const sendEmail = async (
    data: Mail.Options
) => {

    try {
        // In production, emails will be sent by aws ses
        if (process.env.NODE_ENV === "production") {
            // send prod email
            let transporter = nodemailer.createTransport({
                    SES: ses
            })

            // send mail with defined transport object
            let info = await transporter.sendMail(data);

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        } else {
            
            // Copied from: https://nodemailer.com/about/#example
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail(data);

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
    } catch (e) {
        console.error("ERROR sending email", process.env.NODE_ENV)
        console.log(e)
    }    
};