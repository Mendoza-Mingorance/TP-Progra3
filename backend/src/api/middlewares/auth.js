import { verifyToken } from "../utils/utils.js";

export const auth = (req, res, next) => {
  const token = req.cookies.jwt
  const userData = verifyToken(token);

  if (!userData) return res.redirect('/admin');

  req.user = userData.user;
  next();
}
