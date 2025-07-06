import nodemailer from "nodemailer"
import config from "./config.js"

export default class Mail {
    constructor(){
        this.transport = nodemailer.createTransport({
            service: config.mail_service,
            auth:{
                user: config.mail_user,
                pass: config.mail_pass
            }
    })}

    sendAdminMail = async (email, name) => {
        const options = {
            from: config.mail_user,
            to: email,
            subject: "MyM - New Admin Account",
            html:`
            <h1>Hi ${name}!</h1>
            <br>
            <p>Your admin account has been created.</p>
            <br>
            `
          }
      
          const result = await this.transport.sendMail(options)
      
          return result
    }

    sendTicketMail = async (email, ticket) => {
        const options = {
            from: config.mail_user,
            to: email,
            subject: "MyM - Purchase Ticket",
            html: `<h1>Your purchase has been successful!</h1>
                    <br>
                    <br>
                    <h3>Purchase Ticket: ${ticket}</h3>
                    <br>
                    <br>
                    <p>Thanks for choosing us!</p>
                    `
        }

        const result = await this.transport.sendMail(options)

        return result
    }
}
