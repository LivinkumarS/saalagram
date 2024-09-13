import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function signup(req, res, next) {
  const { username, email, password } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    return next(errorHandler(400, "All Fields are Required!"));
  }

  const hashedPass = await bcryptjs.hashSync(password, 10);

  const createdUser = { username, email, password: hashedPass };

  const newUser = new User(createdUser);

  try {
    await newUser.save();
    res.status(200).json({ message: "Signed Up Successfully!" });
  } catch (err) {
    return next(errorHandler(400, err.message));
  }
}

export async function signin(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All Fields Are Required...!"));
  }
  try {
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return next(
        errorHandler(400, "No Such User Registered..! Try Sign Up..!")
      );
    }
    const validPass = await bcryptjs.compareSync(password, userDB.password);
    if (!validPass) {
      return next(errorHandler(400, "Wrong Password...!"));
    }

    const token = jwt.sign(
      {
        id: userDB._id,
        isAdmin: userDB.isAdmin,
      },
      process.env.AUTH_SECRET,
      { expiresIn: "24h" }
    );

    const { password: pass, ...rest } = userDB._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOlny: true })
      .json(rest);
  } catch (err) {
    next(err);
  }
}

export async function google(req, res, next) {
  const { username, profilePhoto, email } = req.body;
  try {
    const googleUser = await User.findOne({ email });
    if (googleUser) {
      const token = jwt.sign(
        { id: googleUser._id, isAdmin: googleUser.isAdmin },
        process.env.AUTH_SECRET,
        { expiresIn: "24h" }
      );
      const { password, ...rest } = googleUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOlny: true })
        .json(rest);
    } else {
      const pass =
        "google" +
        email +
        profilePhoto +
        "ANU_SAALA" +
        username +
        Math.random();
      const hashedPass = await bcryptjs.hashSync(pass, 10);
      try {
        const newUser = new User({
          username:
            username.trim() +
            Math.floor(Math.random() * 10) +
            Math.floor(Math.random() * 10) +
            Math.floor(Math.random() * 10),
          email,
          password: hashedPass,
          profilePhoto,
        });
        await newUser.save();
        const { password, ...rest } = newUser._doc;
        const token = jwt.sign(
          { id: newUser._id, isAdmin: newUser.isAdmin },
          process.env.AUTH_SECRET
        );
        res
          .status(200)
          .cookie("access_token", token, { httpOlny: true })
          .json(rest);
      } catch (err) {
        next(errorHandler(400, err.message));
      }
    }
  } catch (err) {
    next(err);
  }
}
