import { verifyToken } from "../utils/utils.js";

export const auth = (roles) =>{
  return  (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      const userData = verifyToken(token);
      const user = userData.user;

      if (!user) return res.redirect('/');

      const userRole = user.role;
      if (!roles.includes(userRole)) {
        return res.status(403).send("Acceso denegado");
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error de autenticación:", error.message);
      return res.redirect('/');
    }
}

}
