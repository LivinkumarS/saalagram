import { Alert, Button, Select, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecentPost from "./RecentPost";

export default function Search() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    searchTerm: "",
    category: null,
    order: null,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const url = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(url.search);
    const searchTerm = urlParams.get("searchTerm");
    const order = urlParams.get("order");
    const category = urlParams.get("category");
    const limit = urlParams.get("limit");
    if (searchTerm) {
      setFilter((prev) => {
        return {
          ...prev,
          searchTerm,
          order,
          category,
        };
      });
    }

    const fetchPost = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };

    fetchPost();
  }, [url.search]);

  async function handleChange(e) {
    setFilter((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    if (filter.searchTerm) {
      urlParams.set("searchTerm", filter.searchTerm);
    }
    if (filter.category) {
      urlParams.set("category", filter.category);
    }
    if (filter.order) {
      urlParams.set("order", filter.order);
    }

    navigate(`/search?${urlParams.toString()}`);
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-0 min-h-screen">
      <form
        className="w-fit md:min-w-56 border-gray-600 border-b md:border-r flex flex-col items-start gap-8 p-4 md:p-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row whitespace-normal flex-wrap items-center gap-1">
          <p className="font-bold">SearchTerm:</p>
          <TextInput
            type="text"
            id="searchTerm"
            name="searchTerm"
            placeholder="search..."
            onChange={handleChange}
            value={filter.searchTerm}
          />
        </div>
        <div className="flex flex-row whitespace-normal flex-wrap items-center gap-1">
          <p className="font-bold">Filter:</p>
          <Select
            name="order"
            id="order"
            value={filter.order}
            onChange={handleChange}
          >
            <option value={"desc"}>Latest</option>
            <option value={"asc"}>Oldest</option>
          </Select>
        </div>
        <div className="flex flex-row whitespace-normal flex-wrap items-center gap-1">
          <p className="font-bold">Category:</p>
          <Select
            name="category"
            id="category"
            value={filter.category}
            onChange={handleChange}
          >
            <option value={""}>Select</option>
            <option value={"uncategorized"}>Uncategorized</option>
            <option value={"react"}>ReactJS</option>
            <option value={"node"}>NodeJS</option>
          </Select>
        </div>
        <Button
          type="submit"
          gradientDuoTone={"purpleToBlue"}
          outline
          className="w-full"
        >
          Apply Filter
        </Button>
      </form>
      <div className=" flex-grow ">
        {loading ? (
          <div className="flex-grow w-full p-5 text-2xl font-bold mx-auto text-center">
            <Spinner size={"lg"} color={"blue"} />
          </div>
        ) : (
          <div className="flex-grow flex flex-col gap-5 p-3 items-center">
            <h1 className="text-lg w-full text-center font-bold">
              Filter Results
            </h1>
            <div className="w-full flex flex-wrap gap-2 md:gap-4 items-center justify-center">
              {posts.length > 0 ? (
                posts.map((post) => {
                  return <RecentPost key={post._id} post={post} />;
                })
              ) : (
                <h1 className="text-red-600 font-bold">
                  No Results Matches The Filter...!
                </h1>
              )}
            </div>
          </div>
        )}
        {errorMessage && <Alert color="red">{errorMessage}</Alert>}
      </div>
    </div>
  );
}
