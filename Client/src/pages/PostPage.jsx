import { Alert, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import RecentPost from "../components/RecentPost";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function PostPage() {
  const navigate = useNavigate();
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentPostErrors, setRecentPostErrors] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [postId, setPostId] = useState(null);
  const [postUser, setPostUser] = useState(null);
  console.log(postUser);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        if (res.ok) {
          const data = await res.json();
          setRecentPosts(data.posts);
          setRecentPostErrors(null);
        } else {
          setRecentPostErrors(data.message);
        }
      } catch (error) {
        setRecentPostErrors(error.message);
      }
    };

    fetchRecentPosts();
  }, []);

  useEffect(() => {
    const fetchPostUser = async () => {
      if (!post) {
        return;
      }
      try {
        const res = await fetch(`/api/user/${post.userId}`);
        const data = await res.json();
        if (res.ok) {
          const { username, ...rest } = data;

          setPostUser({ username });
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPostUser();
  }, [post]);

  useEffect(() => {
    const fetchPost = async () => {
      setError(null);
      setLoading(true);
      try {
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (res.ok) {
          setPost(data.posts[0]);
          setPostId(data.posts[0]._id);
        } else {
          setError(data.message);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="w-full min-h-screen">
        <Spinner
          className="w-full mx-auto my-5"
          color="info"
          size={"xl"}
          aria-label="Info spinner example"
        />
      </div>
    );
  }

  async function handleLikePost() {
    if (!currentUser) {
      return navigate("/sign-in");
    }

    try {
      const res = await fetch(`/api/post/likepost/${postId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="max-w-5xl w-full mx-auto">
      {post && (
        <div>
          <h1 className="underline font-bold text-2xl md:text-3xl text-center my-5 md:my-10">
            {post.title}
          </h1>

          <div className="w-full text-center flex justify-center items-center my-5 ">
            <Link to={`/search?category=${post.category}`}>
              <Button
                pill
                size={"xs"}
                className="bg-slate-400 text-black dark:text-black dark:bg-white font-bold text-center"
              >
                {post.category}
              </Button>
            </Link>
          </div>

          <div className="mx-3 sm:m-0">
            {postUser ? (
              <h1 className="font-semibold text-xs sm:text-sm text-gray-600 w-full sm:w-[500px] mx-auto">
                <span className="text-black dark:text-white">Post By: </span>{" "}
                {postUser.username}
              </h1>
            ) : null}
            <div className=" flex flex-col gap-1 w-full sm:w-[500px] mx-auto">
              <img
                src={post.image}
                alt="Post image"
                className="self-center w-full mx-auto object-cover shadow-lg dark:shadow-white dark:shadow-md"
              />

              <div className="flex flex-col gap-1 items-start">
                <h1 className=" text-gray-500 md:text-sm text-xs font-semibold">
                  CreatedAt: {new Date(post.updatedAt).toLocaleDateString()}
                </h1>
                {currentUser ? (
                  <div className="flex gap-1 flex-row items-center justify-start">
                    <FaThumbsUp
                      className="cursor-pointer"
                      onClick={handleLikePost}
                      fill={
                        post.likes.includes(currentUser._id) ? "blue" : "gray"
                      }
                    />
                    {post.numberOfLikes > 0 ? (
                      <p className="text-sm font-semibold text-gray-500">
                        {post.numberOfLikes === 1
                          ? "1 Like"
                          : post.numberOfLikes + " Likes"}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <div className="flex flex-row gap-2 text-xs text-red-600 font-semibold items-center justify-start">
                    You Must Sign In To access like section!!!
                    <Link
                      to={"/sign-in"}
                      className="self-center text-blue-600 hover:underline"
                    >
                      SignIn
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full  p-3 md:p-8">
            <p
              className="md:text-lg text-sm font-semibold  post-content"
              dangerouslySetInnerHTML={{ __html: post && post.content }}
            ></p>
          </div>
          <div className="w-full max-w-4xl mx-auto p-3 sm:p-9">
            <CallToAction key={post._id} />
          </div>
          <div className="max-w-4xl p-4 sm:p-8 mx-auto">
            <CommentSection key={post._id} postId={post._id} />
          </div>
        </div>
      )}
      {error && <Alert color={"red"}>{error}</Alert>}
      <div className="flex flex-col gap-5 items-center justify-center p-3 sm:p-6">
        <h1 className="font-extrabold text-lg sm:text-2xl  text-center bg-clip-text text-transparent bg-gradient-to-tr from-purple-700 to-blue-600 bg-transparent">
          Recent Posts
        </h1>

        <div className="mb-4 flex flex-row gap-3 flex-wrap justify-center items-center shadow-sm dark:shadow-none rounded-lg">
          {recentPosts &&
            recentPosts.map((post) => {
              return <RecentPost key={post._id} post={post} />;
            })}
        </div>
      </div>
      {recentPostErrors && <Alert color={"red"}>{recentPostErrors}</Alert>}
    </div>
  );
}
