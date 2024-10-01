import { Alert, Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { TbThumbUp } from "react-icons/tb";
import { useSelector } from "react-redux";

export default function Comment({ comment, onLike, onDelete, onEditSubmit }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setEditing] = useState(false);
  const [editComment, setEditComment] = useState(comment.content);

  useEffect(() => {
    const findUser = async () => {
      try {
        const res = await fetch(`https://saalagram-1.onrender.com/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
          setError(null);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    findUser();
  }, [comment]);

  async function handleEditComment() {
    setEditing((prev) => !prev);
  }

  async function handleEditSubmit() {
    setEditing(false);

    if (editComment === "" || editComment === comment.content) {
      return setError("change something to update...!");
    }
    if (user._id !== currentUser._id)
      return setError("You Are Not Allowed To Change The Content!");

    onEditSubmit(comment._id,editComment);
  }

  return (
    <div>
      {user && (
        <div className="w-full p-3 sm:p-8 flex flex-row gap-2 sm:gap-6">
          <img
            src={user.profilePhoto}
            alt=""
            className="h-10 rounded-full w-fit"
          />
          <div className="flex-grow flex flex-col items-start">
            <div className="">
              <p className="font-bold text-xs sm:text-sm text-gray-600">
                @{user.username}
                <span className="text-xs">
                  {" "}
                  {moment(comment.createdAt).fromNow()}
                </span>
              </p>
              {isEditing ? (
                <div className="w-full flex flex-col sm:flex-row flex-wrap justify-between gap-2 sm:gap-4 p-2 sm:p-6 items-center">
                  <Textarea
                    value={editComment}
                    row="2"
                    maxLength="200"
                    onChange={(e) => setEditComment(e.target.value)}
                    className="flex-1"
                  />
                  <Button gradientDuoTone={"greenToBlue"} onClick={handleEditSubmit}size={'xs'}>Update</Button>
                </div>
              ) : (
                <p className="font-semibold text-sm sm:text-lg">
                  {comment.content}
                </p>
              )}
            </div>
            <div className="mt-2 sm:mt-4 flex flex-row items-center gap-2 font-bold text-sm sm:text-sm text-gray-600">
              <div className="flex items-center">
              <button
                type="button"
                className="text-gray-400 hover:text-blue-600"
                onClick={() => onLike(comment._id)}
              >
                <TbThumbUp
                  fill={
                    currentUser && comment.likes.includes(currentUser._id)
                      ? "blue"
                      : "none"
                  }
                  className="text-lg sm:text-xl"
                />
              </button>
              {comment.numberOfLikes > 0 ? (
                <p className="text-xs font-semibold sm:font-bold">
                  {comment.numberOfLikes === 1
                    ? "1 Like"
                    : comment.numberOfLikes + " Likes"}
                </p>
              ) : null}
              </div>
              {comment.userId === currentUser._id ? (
                <button type="button" onClick={handleEditComment}>
                  {isEditing ? "cancel" : "edit"}
                </button>
              ) : null}
              {comment.userId === currentUser._id || currentUser.isAdmin ? (
                <button
                  type="button"
                  className="text-red-600"
                  onClick={() => {
                    onDelete(comment._id);
                  }}
                >
                  detete
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {error && <Alert color="red">{error}</Alert>}
    </div>
  );
}
