import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  create,
  deletePost,
  getAllposts,
  likePost,
  updatepost,
  getpost,
} from "../Controllers/post.controller.js";
const router = express.Router();

router.post("/create", verifyUser, create);
router.get("/getposts", getAllposts);
router.delete("/deletepost/:postId/:userId", verifyUser, deletePost);
router.put("/updatepost/:postId/:userId", verifyUser, updatepost);
router.get("/getpost/:postId", getpost);
router.put("/likepost/:postId",verifyUser, likePost);

export default router;
