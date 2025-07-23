import jwt from 'jsonwebtoken'
import config from '../config/config.js';
import bcrypt from 'bcryptjs';
import { fetchProductByID } from '../models/products.model.js';

// BCRYPT
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const validatePassword = (password, storedPassword) => {
    return bcrypt.compareSync(password, storedPassword)
}


// JWT 
export const generateToken = (user) => {
    return jwt.sign({ user }, config.jwtSign, { expiresIn: "24h" })
}

export const verifyToken = (token) =>{
    try {
        const tokenData = jwt.verify(token, config.jwtSign)
        return tokenData
    } catch (error) {
        console.error("Invalid token: ",error.message);
        return null
    }
}