import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";

export function test(req, res) {
  res.json({ message: "Success...!" });
}

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(401, "You Are Not Allowed To Update This User...!")
    );
  }
  if (req.body.password) {
    if (req.body.password.length < 7) {
      return next(
        errorHandler(400, "Password Must Have More Than 7 Characters..!")
      );
    }
    req.body.password = await bcrypt.hashSync(req.body.password, 10);
  }
  if (req.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username lenth should be in 7 to 20 characters...!")
      );
    }
    if (
      req.body.username.includes(" ") ||
      req.body.username !== req.body.username.toLowerCase()
    ) {
      return next(
        errorHandler(
          400,
          "Username should not include spaces or uppercase values..!"
        )
      );
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(
          400,
          "Username Should Not Contain Any Special Characters...!"
        )
      );
    }
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePhoto: req.body.profilePhoto,
        },
      },
      { new: true }
    );
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (err) {
    next(errorHandler(401, err.message));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(400, "User Not Verified...!"));
  }
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: "user has been deleted...!" });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const signoutUser = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Signedout Success!" });
  } catch (error) {
    next(error);
  }
};

export const getusers = async (req, res, next) => {
  if (!req.user.isAdmin || req.params.userId !== req.user.id) {
    return next(errorHandler(400, "You are Not Allowed To Handle Users...!"));
  }

  const startIndex = req.query.startIndex || 0;
  const sortDirection = req.query.order === "asc" ? 1 : -1;
  const limit = req.query.limit || 9;

  try {
    const users = await User.find()
      .limit(limit)
      .skip(startIndex)
      .sort({ updatedAt: sortDirection });
    const lastMonthDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      new Date().getDate()
    );

    const totalUsers = await User.countDocuments();
    const lastMonthUsers = await User.countDocuments({
      updatedAt: { $gte: lastMonthDate },
    });

    const usersWithoutPassword= users.map((user) => {
      const { password, ...rest } = user._doc;
      return {...rest};
    });

    

    res.status(200).json({ usersWithoutPassword, totalUsers, lastMonthUsers });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const deleteaccount = async (req, res, next) => {
  if (!req.user.isAdmin || req.params.userId !== req.user.id) {
    return next(400, "You Cannot Delete This Account");
  }

  try {
    const delUser = await User.findById(req.params.accId);
    if (delUser._doc.isAdmin) {
      return next(errorHandler(400, "You cannot Delete an Admin Account..!"));
    }
    await User.findByIdAndDelete(req.params.accId);
    res.status(200).json({ message: "Successfully Deleted..!" });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const getuser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const { password, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};
