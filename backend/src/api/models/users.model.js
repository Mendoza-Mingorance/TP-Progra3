import { connection } from '../database/db.js';

export const registerUserModel = async (email, name, surname, role, password) => {
    try {
        const values = [email, name, surname, role, password];
        const sql =
            'INSERT INTO users (email, name, surname, role, password) VALUES (?, ?, ?, ?, ?)';
        await connection.query(sql, values);
        return true;
    } catch (error) {
        console.error('Error en modelo registrando usuario:', error.message);
        throw new Error('Error registrando usuario en el modelo');
    }
};

export const getUserByEmailModel = async email => {
    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await connection.query(sql, [email]);
        return rows[0];
    } catch (error) {
        console.error('Error en modelo trayendo usuario por email:', error.message);
        throw new Error('Error trayendo usuario por email del modelo');
    }
};

export const fetchUsersModel = async () => {
    try {
        let sql = `SELECT u.id, u.email, u.name, u.role FROM users u`;

        const [rows] = await connection.query(sql);

        return rows;
    } catch (error) {
        console.error('Error en modelo, trayendo usuarios:', error.message);
        throw new Error('Error trayendo usuarios del modelo');
    }
};
