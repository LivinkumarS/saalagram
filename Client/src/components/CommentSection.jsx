import { Alert, Button, Textarea } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`https://saalagram-1.onrender.com/api/comment/getPostComments/${postId}`, {
          method: "GET",
        });

        const data = await res.json();
        if (res.ok) {
          setComments(data);
          setCommentError(null);
        } else {
          setCommentError(data.message);
        }
      } catch (err) {
        setCommentError(err.message);
      }
    };

    fetchComments();
  }, [postId]);

  async function handleCommentSubmit() {
    if (comment.length == 0 || comment.length > 200 || !comment) {
      return setCommentError("Type Anything To Add Comment");
    }

    try {
      const res = await fetch(`https://saalagram-1.onrender.com/api/comment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      } else {
        setCommentError(data.message);
      }
    } catch (err) {
      setCommentError(err.message);
    }
  }

  async function handleLike(comId) {
    if (!currentUser) {
      return navigate("/");
    }

    try {
      const res = await fetch(`https://saalagram-1.onrender.com/api/comment/likeComment/${comId}`, {
        method: "PUT",
      });

      const data = await res.json();

      if (res.ok) {
        setComments((prev) => {
          return prev.map((com) => {
            return com._id === comId
              ? { ...com, likes: data.likes, numberOfLikes: data.numberOfLikes }
              : com;
          });
        });
        setCommentError(null);
      } else {
        setCommentError(data.message);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  }

  async function handleDelete(comId) {
    try {
      const res = await fetch(
        `https://saalagram-1.onrender.com/api/comment/deletecomment/${currentUser._id}/${comId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setComments((prev) => prev.filter((com) => com._id !== comId));
        setCommentError(null);
      } else {
        setCommentError(data.message);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  }

  async function handleEditComment(comId, editComment) {
    try {
      const res = await fetch(
        `https://saalagram-1.onrender.com/api/comment/editcomment/${currentUser._id}/${comId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: editComment }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        setComments((prev) =>
          prev.map((com) => {
            return com._id === comId ? { ...com, content: editComment } : com;
          })
        );
      } else {
        setCommentError(data.message);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  }

  return (
    <div className="w-full mx-auto p-0">
      {currentUser ? (
        <div>
          <div className="flex flex-row gap-2 text-xs text-gray-500 font-semibold items-center justify-start">
            <p>SignedIn as: </p>
            <img
              src={currentUser.profilePhoto}
              alt=""
              className="w-5 h-5 rounded-full self-center"
            />
            <Link
              to={"/dashboard?tab=profile"}
              className="text-blue-600 hover:underline"
            >
              <p>@{currentUser.username}</p>
            </Link>
          </div>
          <div className="w-full flex flex-col gap-4 p-4 sm:p-8 items-center justify-center">
            <form className="flex-1 max-w-xl w-full flex flex-col gap-4 rounded-lg p-4 sm:p-8 border-2 border-gray-600">
              <Textarea
                row="3"
                placeholder="Add Comment...!"
                maxLength={"200"}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                value={comment}
              />
              <div className="w-full flex-1 flex flex-row justify-between items-center">
                <p className="text-gray-700 text-xs sm:text-sm">
                  {comment ? 200 - comment.length : 200} Charecters Remaining
                </p>
                <Button
                  gradientDuoTone={"purpleToBlue"}
                  size={"sm"}
                  className="sm:px-4"
                  onClick={handleCommentSubmit}
                >
                  Post
                </Button>
              </div>
            </form>
          </div>
          {comments && comments.length > 0 ? (
            <>
              <div className="w-full flex flex-row items-center  gap-2 text-gray-600 font-semibold text-sm sm:text-lg">
                <p>Comments</p>
                <p className="text-black dark:text-white border px-2 border-gray-600">
                  {comments.length}
                </p>
              </div>
              {comments.map((com) => {
                return (
                  <>
                    <Comment
                      key={com._id}
                      comment={com}
                      onLike={handleLike}
                      onDelete={handleDelete}
                      onEditSubmit={handleEditComment}
                    />
                    <hr className="border border-gray-500"/>
                  </>
                );
              })}
              {commentError && <Alert color={"red"}>{commentError}</Alert>}
            </>
          ) : (
            <p className="w-full text-center font-semibold">No Comments..!</p>
          )}
        </div>
      ) : (
        <div className="flex flex-row gap-2 text-xs text-red-600 font-semibold items-center justify-start">
          You Must Sign In To access Comment section!!!
          <Link
            to={"/sign-in"}
            className="self-center text-blue-600 hover:underline"
          >
            SignIn
          </Link>
        </div>
      )}
    </div>
  );
}
