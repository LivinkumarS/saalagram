import { Alert, Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "flowbite-react";
import { PiExclamationMarkBold } from "react-icons/pi";
import { BiError } from "react-icons/bi";

export default function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [totalPosts, setTotalPosts] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (userPosts.length === totalPosts) {
      setShowMore(false);
    }
  }, [totalPosts, userPosts]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          setTotalPosts(data.totalPosts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  async function handleShowMore() {
    const startIndex = userPosts.length;

    try {
      const res = await fetch(
        `api/post/getposts/?userId=${currentUser._id}&&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        setTotalPosts(data.totalPosts);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletePost() {
    setShowModel(false);
    setErrorMessage(null);

    try {
      const res = await fetch(
        `api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const response = await res.json();
      if (res.ok) {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );

        setPostIdToDelete(null);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="table-auto lg:overflow-hidden md:mx-auto overflow-x-scroll scrollbar p-3 scrollbar-track-slate-300 scrollbar-thumb-slate-700 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-400">
      {currentUser.isAdmin && userPosts.length > 0? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Of Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>

            {userPosts.map((post) => {
              return (
                <Table.Body className="divide-y">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-24 h-12 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-black dark:text-gray-400">
                    {post.title}
                  </Table.Cell>
                  <Table.Cell className="text-gray-600">
                    {post.category}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setPostIdToDelete(post._id);
                        setShowModel(true);
                      }}
                      className="text-red-600 hover:underline cursor-pointer
                    "
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${post._id}`}>
                      <span className="text-teal-400 hover:underline">
                        Edit
                      </span>
                    </Link>
                  </Table.Cell>
                </Table.Body>
              );
            })}
          </Table>
          {showMore && (
            <Button
              color={"transparent"}
              onClick={handleShowMore}
              className="text-blue-500 mx-auto p-0 mt-4 text-sm font-bold "
            >
              Show More
            </Button>
          )}
        </>
      ):<Alert color="red">No Post Has been made Yet...!</Alert>}
      {showModel && (
        <Modal
          popup
          show={showModel}
          size={"md"}
          onClose={() => {
            setShowModel(false);
          }}
        >
          <Modal.Header />
          <Modal.Body>
            <h1 className="w-10 h-10 text-3xl font-bold rounded-full flex justify-center items-center mx-auto mb-4 border-2 border-black">
              <PiExclamationMarkBold />
            </h1>
            <h1 className="text-3xl font-bold text-black w-fit mx-auto mb-6 text-center">
              Are You Sure..?
            </h1>
            <div className="w-fit mx-auto flex gap-4">
              <Button
                onClick={handleDeletePost}
                color={"red"}
                className="font-bold text-2xl bg-red-600 text-black"
              >
                Yes, Delete
              </Button>
              <Button
                onClick={() => {
                  setShowModel(false);
                }}
                color={"transparent"}
                className="font-bold text-2xl border-2 border-black"
              >
                No, Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {errorMessage && (
        <Alert color="red" icon={BiError}>
          {errorMessage}
        </Alert>
      )}
    </div>
  );
}
