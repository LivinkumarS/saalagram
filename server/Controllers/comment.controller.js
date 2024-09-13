import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body });

  try {
    const response = await newComment.save();
    res.status(200).json(response);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(errorHandler(400, "Comment Not Found"));
    }

    const userIndex = comment.likes.indexOf(req.user.id);

    if (userIndex === -1) {
      comment.likes.push(req.user.id);
      comment.numberOfLikes += 1;
    } else {
      comment.likes.splice(userIndex, 1);
      comment.numberOfLikes -= 1;
    }

    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const deleteComment = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(400, "You Can't Make This Action!"));
  }
  try {
    const curCom = await Comment.findById(req.params.commentId);

    if (curCom.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(400, "You Can't Make This Action!!"));
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: "Comment Deleted!" });
  } catch (error) {
    console.log(error);
    next(errorHandler(400, error.message));
  }
};

export const editComment = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(400, "You can't make this action...!"));
  }

  try {
    const curCom = await Comment.findById(req.params.commentId);
    if (curCom.userId !== req.params.userId) {
      return next(errorHandler(400, "You can't make this action!!"));
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { content: req.body.content },
      { new: true }
    );

    res.status(200).json(editedComment);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const getAllComments = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(400, "You are allowed to access all the comments...!")
    );
  }

  const limitValue = parseInt(req.query.limit) || 9;
  const startIndex = parseInt(req.query.startIndex) || 0;
  const sortDirection = req.query.sort === "asc" ? 1 : -1;

  try {
    const allComments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limitValue);

    const totalComm =await Comment.countDocuments();

    const lastMonth =await  Comment.countDocuments({
      createdAt: {
        $gte: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 1,
          new Date().getDate()
        ),
      },
    });

    res.status(200).json({
      comments: allComments,
      totalComments: totalComm,
      lastMonthComments: lastMonth,
    });
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

