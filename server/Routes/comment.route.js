import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
  likeComment,getAllComments
} from "../Controllers/comment.controller.js";
import { verifyUser } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create", verifyUser, createComment);
router.get("/getPostComments/:postId", getComments);
router.put("/likeComment/:commentId/", verifyUser, likeComment);
router.delete("/deletecomment/:userId/:commentId/", verifyUser, deleteComment);
router.put("/editcomment/:userId/:commentId/", verifyUser, editComment);
router.post("/getcomments", verifyUser, getAllComments);

export default router;