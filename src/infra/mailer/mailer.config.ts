import nodemailer, { Transporter } from "nodemailer"


export type MailDTO = {
    to: string
    from: string
    subject: string
    text?: string
    html?: string
}

export class NodeMailer{
    private client!: Transporter
    constructor(){
        nodemailer.createTestAccount().then(acc => {
            const transporter = nodemailer.createTransport({
                host: process.env.MAILER_HOST,
                port: 587,
                auth: {
                    user: process.env.MAILER_AUTH_USER,
                    pass: process.env.MAILER_AUTH_PASS
                }
            });
            this.client = transporter
        }).catch(err => console.log(err))
    }


    async sendEmail(data: MailDTO){
        console.log(this.client)
        const resultMail = await this.client.sendMail({
            to: data.to,
            from: data.from,
            subject: data.subject,
            text: data.text,
            html: data.html
        })

        console.log("Message " + resultMail.messageId)
        console.log("Preview " + nodemailer.getTestMessageUrl(resultMail))
    }
}
