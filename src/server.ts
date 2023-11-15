import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import { nodeMailer } from "./infra/mailer"


const app = express()

app.use(express.json())
app.use(cors())

app.post("/send-email", async (req,res)=> {
    const data = req.body
    await nodeMailer.sendEmail({
        to: data.to,
        from: data.from,
        subject: data.subject,
        html: data.html
    })
})

app.listen(8080, () => {
    console.log("Server is running 8080")
})