import dotenv from 'dotenv'

dotenv.config()

const config = {
    port: process.env.PORT || 8080,
    env: process.env.NODE_ENV,
    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 3306
    },
    jwtSign: process.env.JWT_SIGN,
    mail_service: process.env.MAIL_SERVICE,
    mail_user: process.env.MAIL_USER,
    mail_pass: process.env.MAIL_PASS,
}


export default config

