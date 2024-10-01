import { Button } from "flowbite-react";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Oath() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app);
  async function handleOuthClick() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch(
        "https://saalagram-1.onrender.com/api/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: resultsFromGoogle.user.displayName,
            email: resultsFromGoogle.user.email,
            profilePhoto: resultsFromGoogle.user.photoURL,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        const { token, ...signData } = data;
        dispatch(signInSuccess(signData));
        localStorage.setItem("access_token",token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Button
      type="button"
      gradientDuoTone="greenToBlue"
      className=" font-bold mx-auto my-4 w-auto md:w-96 "
      outline
      onClick={handleOuthClick}
    >
      <span className="self-center mr-2">
        <FaGoogle />
      </span>
      Google
    </Button>
  );
}
