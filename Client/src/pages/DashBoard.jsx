import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../components/DashSideBar.jsx";
import DashProfile from "../components/DashProfile.jsx";
import DashPost from "../components/DashPost.jsx";
import DashUsers from "../components/DashUsers.jsx";
import DashComments from "../components/DashComments.jsx";
import DashComp from "../components/DashComp.jsx";

export default function DashBoard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromURL = urlParams.get("tab");
    if (tabFromURL) {
      setTab(tabFromURL);
    }
    // console.log(tabFromURL);
  }, [location.search]);

  return (
    <div className=" md:flex">
      <div>
        {/* SideBar   */}
        <DashSideBar />
      </div>
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPost />}
      {tab === "users" && <DashUsers />}
      {tab === "comments" && <DashComments />}
      {tab === "dash" && <DashComp />}
    </div>
  );
}
