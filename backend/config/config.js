import dotenv from 'dotenv'

dotenv.config()

const config = {
    port: process.env.PORT || 8080,
    env: process.env.NODE_ENV,
    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}


export default config

