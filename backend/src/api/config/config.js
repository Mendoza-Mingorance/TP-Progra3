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

if (config.env === 'development') {
    config.panelAdmin_url = process.env.DEV_URL;
} else {
    config.panelAdmin_url = process.env.PROD_URL;
    config.db.host = process.env.DB_PROD_HOST;
    config.db.user = process.env.DB_PROD_USER;
    config.db.password = process.env.DB_PROD_PASSWORD;
    config.db.name = process.env.DB_PROD_NAME;
    config.db.port = process.env.DB_PROD_PORT;
}


export default config

