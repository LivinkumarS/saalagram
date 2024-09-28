import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyUser = async (req, res, next) => {

  if(!process.env.AUTH_SECRET){
    return next(400,"Here itself!")
  }

  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "User Not Verified (Try Sign In Again...!)..!"));
  }
  
  jwt.verify(token, process.env.AUTH_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(400, "User Not Verified (Try Sign In Again...!)..!"));
    }
    req.user = user;
    next();
  });
};
