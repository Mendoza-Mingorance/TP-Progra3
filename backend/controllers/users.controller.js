import { connection } from "../database/db.js";
import { createHash, validatePassword } from "../utils/utils.js";


export const registerUser = async (req, res) =>{
    try {
        const {email, password} = req.body
        const hashedPassword = createHash(password)
        const values = [email, hashedPassword];
        const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';

        await connection.query(sql, values);

        res.status(200).json({message: `Usuario ${email} registrado`})
    } catch (error) {
        console.error("Error trayendo productos:",error.message);  
        res.status(500).json({message: "Internal server error. Couldn't register user"})
    }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await connection.query(sql, email);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Credenciales incorrectas' });
    }

    const user = rows[0];
    const checkPassword = validatePassword(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    res.status(200).json({ message: `Usuario ${email} logueado`, payload: user });
  } catch (error) {
    console.error('Error al loguearse:', error.message);
    res.status(500).json({ message: "Internal server error. Couldn't login" });
  }
};