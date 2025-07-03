import { getUserByEmailModel, registerUserModel } from "../models/users.model.js";
import { createHash, generateToken, validatePassword } from "../utils/utils.js";


export const registerUser = async (req, res) =>{
    try {
        const {email, password} = req.body
        const hashedPassword = createHash(password)
        await registerUserModel(email, hashedPassword)

        res.status(200).json({message: `Usuario ${email} registrado`})
    } catch (error) {
        console.error("Error en controlador registrando usuario:",error.message);  
        res.status(500).json({message: "Internal server error. Couldn't register user"})
    }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmailModel(email);
    
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const checkPassword = validatePassword(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = generateToken(user);
    res.cookie('jwt', token, { httpOnly: true, sameSite: 'Strict' });

    res.status(200).redirect('/admin/dashboard');
  } catch (error) {
    console.error('Error al loguearse:', error.message);
    res.status(500).json({ message: "Internal server error. Couldn't login" });
  }
};

export const logout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/login');
};