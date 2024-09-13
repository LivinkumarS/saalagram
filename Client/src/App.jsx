import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import About from "./pages/About.jsx";
import SignUp from "./pages/SignUp.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import Header from "./components/Header.jsx";
import FooterComp from "./components/Footer.jsx";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminOnlyPrivateRoute from "./components/AdminOnlyPrivateRoute.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import UpdatePost from "./pages/UpdatePost.jsx";
import PostPage from "./pages/PostPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Search from "./components/Search.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  const { curTheme } = useSelector((state) => state.theme);
  return (
    <div className={curTheme}>
      <div className="w-screen bg-white text-gray-950 dark:bg-gray-950 dark:text-white ">
        <BrowserRouter>
        <ScrollToTop/>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashBoard />} />
            </Route>
            <Route element={<AdminOnlyPrivateRoute />}>
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/update-post/:postId" element={<UpdatePost />} />
            </Route>
            <Route path="/contact" element={<Contact />} />
            <Route path="/post/:postSlug" element={<PostPage />} />
          </Routes>
          <FooterComp />
        </BrowserRouter> 
      </div>
    </div>
  );
}
