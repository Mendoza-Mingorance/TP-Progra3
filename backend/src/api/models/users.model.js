import { connection } from "../database/db.js";


export const registerUserModel = async (email, name, surname, role, password) => {
    try {
        const values = [email, name, surname, role, password];
        const sql = "INSERT INTO users (email, name, surname, role, password) VALUES (?, ?, ?, ?, ?)";
        await connection.query(sql, values);
        return true;
    } catch (error) {
        console.error("Error en modelo registrando usuario:", error.message);
        throw new Error("Error registrando usuario en el modelo");
       
    }
};

export const getUserByEmailModel = async (email) => {
    try {
        const sql = "SELECT * FROM users WHERE email = ?";
        const [rows] = await connection.query(sql, [email]);
        return rows[0];
    } catch (error) {
        console.error("Error en modelo trayendo usuario por email:", error.message);
        throw new Error("Error trayendo usuario por email del modelo");
    }
};