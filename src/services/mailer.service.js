import mailer from 'nodemailer'
import { logger } from '../utils/logger.js'
import config from '../config/config.js'


export default class MailService {
    constructor() {
        this.client = mailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: config.mailer.SMTP_USER,
                pass: config.mailer.SMTP_PASSWORD
            }

        })
    }
    sendSimpleMail = async ({ from, to, subject }) => {
        try {
            let result = await this.client.sendMail({
                from,
                to,
                subject,
            })
            return result
        } catch (error) {
            logger.error(error)
        }
    }

}