import jwt from 'jsonwebtoken'
import config from '../config/config.js';
import bcrypt from 'bcryptjs';

// BCRYPT
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const validatePassword = (password, storedPassword) => {
    return bcrypt.compareSync(password, storedPassword)
}


// JWT
const PRIVATE_KEY = config.jwtSign
export const generateToken = (user) => {
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" })
}

export const verifyToken = (token) =>{
    try {
        const tokenData = jwt.verify(token, PRIVATE_KEY)
        return tokenData
    } catch (error) {
        console.error("Invalid token: ",error.message);
        return null
    }
}