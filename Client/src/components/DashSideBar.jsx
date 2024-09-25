import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiUser } from "react-icons/hi";
import { PiSignOutBold } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { GiPostStamp } from "react-icons/gi";
import { useSelector } from "react-redux";
import { BiComment, BiUserCircle } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";

export default function DashSideBar() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    if (tabFromURL) {
      setTab(tabFromURL);
    }
  }, [location.search]);

  async function handleSignout() {
    try {
      const response = await fetch("https://saalagram-1.onrender.com/api/user/signout", {
        method: "POST",
      });
      const res = await response.json();
      if (!response.ok) {
        console.log(res);
      } else {
        dispatch(signoutSuccess());
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Sidebar className="w-full md:w-56 md:min-h-screen">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {currentUser.isAdmin ? (
            <Link to={"/dashboard?tab=dash"}>
              <Sidebar.Item
                as="div"
                active={tab === "dash"}
                label={"dash"}
                labelColor="dark"
                icon={MdDashboard}
                className="cursor-pointer mt-2"
              >
                DashBoard
              </Sidebar.Item>
            </Link>
          ) : null}
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              as="div"
              active={tab === "profile"}
              label={currentUser.isAdmin ? "admin" : "user"}
              labelColor="dark"
              icon={HiUser}
              className="cursor-pointer"
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser.isAdmin ? (
            <Link to={"/dashboard?tab=posts"}>
              <Sidebar.Item
                as="div"
                active={tab === "posts"}
                label={"posts"}
                labelColor="dark"
                icon={GiPostStamp}
                className="cursor-pointer mt-2"
              >
                Posts
              </Sidebar.Item>
            </Link>
          ) : null}
          {currentUser.isAdmin ? (
            <Link to={"/dashboard?tab=users"}>
              <Sidebar.Item
                as="div"
                active={tab === "users"}
                label={"users"}
                labelColor="dark"
                icon={BiUserCircle}
                className="cursor-pointer mt-2"
              >
                Users
              </Sidebar.Item>
            </Link>
          ) : null}
          {currentUser.isAdmin ? (
            <Link to={"/dashboard?tab=comments"}>
              <Sidebar.Item
                as="div"
                active={tab === "comments"}
                label={"comm"}
                labelColor="dark"
                icon={BiComment}
                className="cursor-pointer mt-2"
              >
                Comments
              </Sidebar.Item>
            </Link>
          ) : null}
          <Sidebar.Item
            icon={PiSignOutBold}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            SignOut
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
