import { Alert } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BiCommentAdd, BiUserCircle } from "react-icons/bi";
import { BsPostcard } from "react-icons/bs";
import { HiArrowNarrowUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Table, Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashComp() {
  const { currentUser } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [totalusers, setTotalUsers] = useState(0);
  const [lastMonthusers, setLastMonthUsers] = useState(0);
  const [posts, setPosts] = useState([]);
  const [totalposts, setTotalPosts] = useState(0);
  const [lastMonthposts, setLastMonthPosts] = useState(0);
  const [comments, setComments] = useState([]);
  const [totalcomments, setTotalComments] = useState(0);
  const [lastMonthcomments, setLastMonthComments] = useState(0);

  console.log(comments);
  console.log(totalcomments);
  console.log(lastMonthcomments);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.usersWithoutPassword);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchUsers();
    fetchPosts();
    fetchComments();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {totalusers !== 0 && (
        <div className="w-full flex flex-wrap items-center justify-around gap-4 p-4 sm:p-6">
          <div className=" p-4 sm:p-6 flex-grow flex flex-col gap-6 rounded-lg items-center justify-center shadow-lg dark:shadow-white">
            <div className="w-full flex flex-row gap-6 items-center justify-between">
              <p className="text-xl font-extrabold sm:text-2xl">
                Total Users: <span className="text-teal-500">{totalusers}</span>
              </p>
              <BiUserCircle fill="teal" className="text-4xl" />
            </div>
            <div className="w-full flex flex-row items-center text-lg sm:text-xl font-semibold">
              <p className="text-lg sm:text-xl font-semibold">last month: </p>
              <HiArrowNarrowUp className="text-teal-400 " />
              <span className=" text-teal-500">{lastMonthusers}</span>
            </div>
          </div>
          {
            <div className="p-4 sm:p-6 flex-grow flex flex-col gap-6 rounded-lg items-center justify-center shadow-lg dark:shadow-white">
              <div className="w-full flex flex-row gap-6 items-center justify-between">
                <p className="text-xl font-extrabold sm:text-2xl">
                  Total Posts:{" "}
                  <span className="text-teal-500">{totalposts}</span>
                </p>
                <BsPostcard fill="teal" className="text-4xl" />
              </div>
              <div className="w-full flex flex-row items-center text-lg sm:text-xl font-semibold">
                <p className="text-lg sm:text-xl font-semibold">last month: </p>
                <HiArrowNarrowUp className="text-teal-400 " />
                <span className=" text-teal-500">{lastMonthposts}</span>
              </div>
            </div>
          }
          {
            <div className="p-4 sm:p-6 flex-grow flex flex-col gap-6 rounded-lg items-center justify-center shadow-lg dark:shadow-white">
              <div className="w-full flex flex-row gap-6 items-center justify-between">
                <p className="text-xl font-extrabold sm:text-2xl">
                  Comments:{" "}
                  <span className="text-teal-500">{totalcomments}</span>
                </p>
                <BiCommentAdd fill="teal" className="text-4xl" />
              </div>
              <div className="w-full flex flex-row items-center text-lg sm:text-xl font-semibold">
                <p className="text-lg sm:text-xl font-semibold">last month: </p>
                <HiArrowNarrowUp className="text-teal-400 " />
                <span className=" text-teal-500">{lastMonthcomments}</span>
              </div>
            </div>
          }
        </div>
      )}

      <div className="flex flex-wrap items-start justify-center content-center gap-4 p-3 sm:p-6">
        {users.length !== 0 ? (
          <div className="flex-grow lg:overflow-hidden md:mx-auto overflow-x-scroll scrollbar p-3 scrollbar-track-slate-300 scrollbar-thumb-slate-700 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-400">
            <Table hoverable className="shadow-md ">
              <Table.Head>
                <div className="text-xl font-bold mx-auto">Users</div>
              </Table.Head>
              <Table.Head>
                <Table.HeadCell>Profile</Table.HeadCell>
                <Table.HeadCell>UserName</Table.HeadCell>
              </Table.Head>
              {users.map((user) => {
                return (
                  <Table.Body key={user._id}>
                    <Table.Cell>
                      <img
                        className="w-10 h-10 rounded-3xl"
                        src={user.profilePhoto}
                        alt="DP"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Body>
                );
              })}
            </Table>
            <Link to={`/dashboard?tab=users`}>
              <Button
                color="transparent"
                className="mx-auto text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                show more
              </Button>
            </Link>
          </div>
        ) : (
          <div className="font-bold text-xl">No Users</div>
        )}
        {comments.length !== 0 ? (
          <div className="flex-grow lg:overflow-hidden md:mx-auto overflow-x-scroll scrollbar p-3 scrollbar-track-slate-300 scrollbar-thumb-slate-700 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-400yy">
            <Table hoverable className="shadow-md ">
              <Table.Head>
                <div className="text-xl font-bold mx-auto">Recent Comments</div>
              </Table.Head>
              <Table.Head>
                <Table.HeadCell>Post id</Table.HeadCell>
                <Table.HeadCell>Content</Table.HeadCell>
                <Table.HeadCell>Likes</Table.HeadCell>
              </Table.Head>
              {comments.map((comm) => {
                return (
                  <Table.Body key={comm._id}>
                    <Table.Cell className="hover:underline cursor-pointer">
                      {comm.postId}
                    </Table.Cell>
                    <Table.Cell>{comm.content}</Table.Cell>
                    <Table.Cell>{comm.numberOfLikes}</Table.Cell>
                  </Table.Body>
                );
              })}
            </Table>
            <Link to={`/dashboard?tab=comments`}>
              <Button
                color="transparent"
                className="mx-auto text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                show more
              </Button>
            </Link>
          </div>
        ) : (
          <div className="font-bold text-xl">No Comments</div>
        )}
        {posts.length !== 0 ? (
          <div className="flex-grow lg:overflow-hidden md:mx-auto overflow-x-scroll scrollbar p-3 scrollbar-track-slate-300 scrollbar-thumb-slate-700 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-400yy">
            <Table hoverable className="shadow-md ">
              <Table.Head>
                <div className="text-xl font-bold mx-auto">Recent Posts</div>
              </Table.Head>
              <Table.Head>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Likes</Table.HeadCell>
              </Table.Head>
              {posts.map((post) => {
                return (
                  <Table.Body key={post._id}>
                    <Link to={`/post/${post.slug}`}>
                      <Table.Cell className="hover:underline cursor-pointer">
                        {post.title}
                      </Table.Cell>
                    </Link>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>{post.numberOfLikes}</Table.Cell>
                  </Table.Body>
                );
              })}
            </Table>
            <Link to={`/dashboard?tab=posts`}>
              <Button
                color="transparent"
                className="mx-auto text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                show more
              </Button>
            </Link>
          </div>
        ) : (
          <div className="font-bold text-xl">No Posts</div>
        )}
      </div>

      {errorMessage && <Alert color="red">{errorMessage}</Alert>}
    </div>
  );
}
