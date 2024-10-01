import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
 
export const verifyUser = async (req, res, next) => {
  const token = req.body.token;
  if (!token || token === "") {
    return next(
      errorHandler(401, `User Not Verified (Try Sign In Again...!)..!,${token}`)
    );
  }

  jwt.verify(token, process.env.AUTH_SECRET, (err, user) => {
    if (err) {
      return next(
        errorHandler(400, "User Not Verified (Try Sign In Again...!)..!")
      );
    }
    req.user = user;
    next();
  });
};
