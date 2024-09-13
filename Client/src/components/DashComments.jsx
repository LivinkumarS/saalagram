import { Alert, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments);
          setErrorMessage(null);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchComments();
  }, [currentUser._id]);

  async function handleDeleteComment(comId) {
    if (!currentUser || !currentUser.isAdmin) {
      return setErrorMessage("You Are Not Allowed To Do This Action...!");
    }

    console.log(comId);

    try {
      const res = await fetch(
        `/api/comment/deletecomment/${currentUser._id}/${comId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => {
          return prev.filter((comm) => comm._id !== comId);
        });
        setErrorMessage(null);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="table-auto md:mx-auto overflow-x-scroll scrollbar p-3 scrollbar-track-slate-300 scrollbar-thumb-slate-700 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-400">
      <Table hoverable className="shadow-md">
        <Table.Head>
          <Table.HeadCell>Date Of Updated</Table.HeadCell>
          <Table.HeadCell>UserId</Table.HeadCell>
          <Table.HeadCell>PostId</Table.HeadCell>
          <Table.HeadCell>Number Of Likes</Table.HeadCell>
          <Table.HeadCell>Content</Table.HeadCell>
          <Table.HeadCell>Detete</Table.HeadCell>
        </Table.Head>
        {comments &&
          comments.length > 0 &&
          comments.map((comm) => {
            return (
              <Table.Body className="divide-y">
                <Table.Cell className="text-xs sm:text-sm">
                  {new Date(comm.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell className="text-xs sm:text-sm ">
                  {comm.userId}
                </Table.Cell>
                <Table.Cell className="text-xs sm:text-sm ">
                  {comm.postId}
                </Table.Cell>
                <Table.Cell className="text-xs sm:text-sm ">
                  {comm.numberOfLikes}
                </Table.Cell>
                <Table.Cell className="text-xs sm:text-sm ">
                  {comm.content}
                </Table.Cell>
                <Table.Cell className="text-xs sm:text-sm ">
                  <span
                    className="text-red-600 hover:underline cursor-pointer"
                    onClick={() => handleDeleteComment(comm._id)}
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Body>
            );
          })}
      </Table>
      {errorMessage && <Alert color="red">{errorMessage}</Alert>}
    </div>
  );
}
