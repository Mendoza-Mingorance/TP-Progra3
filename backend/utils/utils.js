import bcrypt from 'bcryptjs';

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const validatePassword = (password, storedPassword) => {
    return bcrypt.compareSync(password, storedPassword)
}
