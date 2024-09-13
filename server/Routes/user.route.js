import express from "express";
import {
  deleteUser,
  test,
  updateUser,
  signoutUser,
  getusers,
  deleteaccount,
  getuser,
} from "../Controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyUser, updateUser);
router.delete("/delete/:userId", verifyUser, deleteUser);
router.post("/signout", signoutUser);
router.get("/getusers/:userId", verifyUser, getusers);
router.get("/:userId", getuser);
router.delete("/deleteaccount/:userId/:accId", verifyUser, deleteaccount);

export default router;
