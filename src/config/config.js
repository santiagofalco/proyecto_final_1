import dotenv from 'dotenv'

dotenv.config()

export default {
    app: {
        PORT: process.env.PORT
    },
    mongo: {
        MONGO_URL: process.env.MONGO_URL
    },
    persistance: {
        PERSISTANCE: process.env.PERSISTANCE
    },
    mailer: {
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD
    }
}