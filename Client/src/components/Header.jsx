import React, { useEffect, useState } from "react";
import { Navbar, TextInput, Button, Dropdown } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { themeChange } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { curTheme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname;

  const url = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(url.search);
    const term = searchParams.get("searchTerm");
    if (term) {
      setSearchTerm(term);
    }
  }, [url.search]);

  function handleThemeChange() {
    dispatch(themeChange());
  }

  async function handleSignout() {
    try {
      const response = await fetch(
        "https://saalagram-1.onrender.com/api/user/signout",
        {
          method: "POST",
        }
      );
      const res = await response.json();
      if (!response.ok) {
        console.log(res);
      } else {
        dispatch(signoutSuccess());
        localStorage.clear();
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    const searchParam = new URLSearchParams(url.search);
    searchParam.set("searchTerm", searchTerm);
    navigate(`/search?searchTerm=${searchTerm}`);
  }

  return (
    <div>
      <Navbar className="border-b-2">
        <Link
          to="/"
          className=" shadow-lg shadow-green-500 dark:shadow-md rounded-tl-none rounded-lg px-2 py-1  self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <i className="font-bold text-xl sm:text-2xl text-green-500">Saala's Blog</i>
        </Link>
        <form onSubmit={handleSearch}>
          <TextInput
            value={searchTerm}
            type="text"
            placeholder="Search"
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch
            onClick={() => {
              navigate("/search");
            }}
          />
        </Button>
        <div className="flex gap-3 sm:order-2">
          <Button
            className="w-12 h-10 hidden sm:inline"
            color="gray"
            pill
            onClick={handleThemeChange}
          >
            {curTheme === "dark" ? <FaMoon /> : <FaSun />}
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <img
                  alt=""
                  src={currentUser.profilePhoto}
                  className="p-1  ring-gray-300 dark:ring-gray-500 rounded-full h-10 w-10"
                  data-testid="flowbite-avatar-img"
                />
              }
            >
              <Dropdown.Header>
                <span className="font-bold text-sm block">
                  {currentUser.username}
                </span>
                <span className="text-sm">{currentUser.email}</span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Item onClick={handleSignout}>Signout</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-in" className="self-center">
              <Button
                size="xs"
                className="self-center"
                outline
                gradientDuoTone="greenToBlue"
              >
                Sign-In
              </Button>
            </Link>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link
            as={"div"}
            active={path === "/"}
            className="flex gap-3 p-0 text-sm font-bold"
          >
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link
            as={"div"}
            active={path === "/about"}
            className="flex gap-3 p-0 text-sm font-bold"
          >
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link
            as={"div"}
            active={path === "/contact"}
            className="flex gap-3 p-0 text-sm font-bold"
          >
            <Link to="/contact">Contact</Link>
          </Navbar.Link>
          <Button
            className="mt-5 sm:hidden"
            color="gray"
            pill
            onClick={handleThemeChange}
          >
            {curTheme === "dark" ? <FaMoon /> : <FaSun />}
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
