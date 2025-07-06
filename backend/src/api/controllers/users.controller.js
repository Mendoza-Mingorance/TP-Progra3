import { getUserByEmailModel } from "../models/users.model.js";
import { generateToken, validatePassword } from "../utils/utils.js";


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmailModel(email);
    
    if (!user || !validatePassword(password, user.password)) {
      return res.status(401).redirect('/');
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
  res.redirect('/');
};