import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CallToAction from "../components/CallToAction";
import RecentPost from "../components/RecentPost";
import { Link } from "react-router-dom";
import { Alert } from "flowbite-react";

export default function Home() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [errorMessage, seterroeMessage] = useState(null);
  const [quote, setQuote] = useState({});

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`https://saalagram-1.onrender.com/api/post/getposts?limit=4`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
          setTotalPosts(data.totalPosts);
          seterroeMessage(null);
        } else {
          seterroeMessage(data.message);
        }
      } catch (error) {
        seterroeMessage(error.message);
      }
    };

    const fetchQuote = async () => {
      try {
        const res = await fetch(`https://saalagram-1.onrender.com/api/quote/getquote`);

        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setQuote(data);
        } else {
          setQuote({
            quote: "The will of man is his happiness.",
            author: "Friedrich Schiller",
          });
        }
      } catch (error) {
        setQuote({
          quote: "The will of man is his happiness.",
          author: "Friedrich Schiller",
        });
      }
    };

    fetchRecentPosts();
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen sm:mx-9 my-3">
      <div className="flex flex-col gap-8 mx-auto w-full p-1 items-center">
        <div className="w-full p-5 flex flex-col gap-8">
          <h1 className="font-extrabold text-xl sm:text-2xl bg-clip-text text-transparent bg-gradient-to-tr from-green-500 to-yellow-200 bg-transparent">
            Welcome To Saala's Blog Website...!
          </h1>

          <p className="text-md sm:text-xl font-semibold">
          Welcome to <b>Saala's Blog</b>, your go-to hub for tech insights, coding adventures, and a dash of humor! Built with the MERN stack, this blog showcases creative solutions, innovative ideas, and web development tips that inspire both beginners and experts. Dive in, explore, and enjoy a unique blend of learning and entertainment!
          </p>
        </div>
        <div className="max-w-4xl w-full p-3">
          <CallToAction className="mx-auto" />
        </div>
        <div className="flex flex-col gap-5 items-center justify-center p-3 sm:p-6">
          <h1 className="font-extrabold text-lg sm:text-2xl  text-center bg-clip-text text-transparent bg-gradient-to-tr from-green-500 to-yellow-200 bg-transparent">
            Recent Posts
          </h1>

          <div className=" flex flex-row gap-3 flex-wrap justify-center items-center shadow-sm dark:shadow-none rounded-lg">
            {recentPosts && recentPosts.length > 0 ? (
              recentPosts.map((post) => {
                return <RecentPost key={post._id} post={post} />;
              })
            ) : (
              <h1 className="text-center font-bold text-red-600">No Posts!</h1>
            )}
          </div>
        </div>

        {recentPosts.length > 0 ? (
          <div className=" mx-auto">
            <Link
              to={`/search?limit=${totalPosts}`}
              className="text-xl underline font-bold text-center text-blue-600 hover:underline cursor-pointer"
            >
              See All Posts
            </Link>
          </div>
        ) : null}
        {quote.author && (
          <div className="w-full max-w-xl mx-auto p-flex flex-col items-stretch justify-center">
            <h1 className="text-xl text-center font-extrabold italic">
              Today's Quote
            </h1>
            <p className="font-bold text-lg text-center my-3 italic">{quote.quote}</p>
            <p className="text-right font-semibold text-gray-600 italic">
              -{quote.author}
            </p>
          </div>
        )}
      </div>
      {errorMessage && <Alert color="red">{errorMessage}</Alert>}
    </div>
  );
}
