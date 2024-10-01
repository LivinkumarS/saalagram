import React, { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import Oath from "../components/Oath";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function SignIn() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();

  function handleChange(e) {
    const trigger = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [trigger.id]: trigger.value,
      };
    });
    // console.log(formData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(signInStart());

    if (
      !formData.email ||
      !formData.password ||
      formData.email === "" ||
      formData.password === ""
    ) {
      dispatch(signInFailure("All Fields Are Required"));
    }

    try {
      const res = await fetch(
        "https://saalagram-1.onrender.com/api/auth/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const response = await res.json();
      // console.log(response);

      if (response.success === false) {
        dispatch(signInFailure(response.message));
      }
      if (res.ok) {
        const { token, ...signData } = response;
        dispatch(signInSuccess(signData));
        cookies.set("access_token", token, { expires: "7d" });
        navigate("/");
      }
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="gap-5 flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left-side  */}
        <div className="flex-1">
          <Link
            to="/"
            className="rounded-lg rounded-tl-none shadow-lg dark:shadow-white dark:shadow-md self-center whitespace-nowrap text-3xl sm:text-5xl font-bold dark:text-white"
          >
            <i className="font-bold text-xl sm:text-2xl p-8">Saala's Blog</i>
          </Link>
          <p className="mt-4 font-semibold">
            "Saala's Blog" is a personal platform built using the MERN stack
            (React, Node, MongoDB, Express) to showcase my skills in web
            development. It features blog posts on technical topics,
            highlighting my expertise in coding and creative web design,
            offering insights for tech enthusiasts.
          </p>
        </div>
        {/* right-side  */}
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="">
              <Label value="Email" />
              <TextInput
                type="text"
                placeholder="something@hello.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="******"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              className="mx-auto my-4 w-auto md:w-96"
              size="sm"
              type="submit"
              isProcessing={loading}
              gradientDuoTone="purpleToBlue"
            >
              Submit
            </Button>
            <Oath />
            <div className="gap-2 flex">
              <span>Don't Have an account?</span>
              <Link className="text-blue-600" to="/sign-up">
                Sign Up
              </Link>
            </div>
          </form>
          {errorMessage && (
            <Alert color="red" className="mt-2">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
