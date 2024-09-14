import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function RecentPost({ post }) {
  return (
    <div className="w-[250px] flex flex-col shadow-lg rounded-lg relative group dark:shadow-sm dark:shadow-white">
      <Link to={`/post/${post.slug}`} >
        <img
          src={post.image}
          alt="post"
          className="w-full rounded-t-lg h-[200px] group-hover:h-[168px] object-cover"
        />
        <div className="flex flex-col items-start p-2 justify-center">
          <p className="text-xl font-semibold w-full">{post.title.length>25?post.title.slice(0,25)+'...':post.title}</p>
          <p className="text-md ">{post.category}</p>
        </div>
        <Link
          to={`/post/${post.slug}`}
          className="w-full hidden group-hover:inline"
        >
          <Button className="mx-auto mb-1" size={'xs'} gradientDuoTone={"purpleToBlue"}>
            See Post
          </Button>
        </Link>
      </Link>
    </div>
  );
}
