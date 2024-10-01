import React, { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert } from "flowbite-react";
import Oath from "../components/Oath";

export default function SignUp() {
  const [formData, setFormData] = useState({email:'',username:'',password:''});
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate=useNavigate();
  

  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setLoading(false);
      setErrorMessage("All Fields Are Required");
      return;
    }
    try {
      const res = await fetch("https://saalagram-1.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const response = await res.json();
      if (response.success === false) {
        setErrorMessage(response.message);
      } else {
        setErrorMessage(null);
      }
      if(res.ok){
        navigate('/sign-in');
      }
      // console.log(response);
    } catch (err) {
      setErrorMessage(err.message)
    }
    setLoading(false);
    setFormData({email:'',username:'',password:''})
  }

  async function handleChange(event) {
    const data = event.target.value;
    const tar = event.target.id;
    setFormData((prev) => {
      return {
        ...prev,
        [tar]: data.trim(),
      };
    });
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="gap-5 flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left-side  */}
        <div className="flex-1">
          <Link
            to="/"
            className="rounded-lg rounded-tl-none shadow-lg shadow-green-500 dark:shadow-md self-center whitespace-nowrap text-3xl sm:text-5xl font-bold dark:text-white"
          >
            <i className="font-bold text-xl text-green-500 sm:text-2xl p-3 pt-0">Saala's Blog</i>
          </Link>
          <p className="mt-4 font-semibold">
          "Saala's Blog" is a personal platform built using the MERN stack (React, Node, MongoDB, Express) to showcase my skills in web development. It features blog posts on technical topics, highlighting my expertise in coding and creative web design, offering insights for tech enthusiasts.
          </p>
        </div>
        {/* right-side  */}
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="">
              <Label value="UserName" />
              <TextInput
                type="text"
                placeholder="User Name"
                id="username"
                onChange={handleChange}
                value={formData.username}
              />
            </div>
            <div className="">
              <Label value="Email" />
              <TextInput
                type="text"
                placeholder="something@hello.com"
                id="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="">
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="******"
                id="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <Button
              className="mx-auto my-4 w-auto md:w-96"
              size="sm"
              type="submit"
              isProcessing={isLoading}
              gradientDuoTone="greenToBlue"
            >
              Submit
            </Button>
            <Oath/>
            <div className="gap-2 flex">
              <span>Have an account?</span>
              <Link className="text-blue-600" to="/sign-in">
                Sign In
              </Link>
            </div>
          </form>
          {errorMessage && <Alert color="red">{errorMessage}</Alert>}
        </div>
      </div>
    </div>
  );
}
