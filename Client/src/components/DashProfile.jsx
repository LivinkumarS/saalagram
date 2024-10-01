import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Alert, Button, TextInput, Modal } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { BiError, BiSolidError } from "react-icons/bi";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteFailure,
  deleteStart,
  deleteSuccess,
  signoutSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
import { PiExclamationMarkBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

export default function DashProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const {
    currentUser,
    error: currentUserError,
    loading,
  } = useSelector((state) => state.user);
  const [showModel, setShowModel] = useState(false);
  const [uploadingErrorMessage, setUploadingErrorMessage] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [updationSuccess, setUpdationSuccess] = useState(false);
  const [updationError, setUpdationError] = useState(null);
  const [formData, setFormData] = useState({});

  const filePickerRef = useRef();

  async function handleSignout() {
    setUpdationError(null);
    try {
      const response = await fetch(
        "https://saalagram-1.onrender.com/api/user/signout",
        {
          method: "POST",
        }
      );
      const res = await response.json();
      if (!response.ok) {
        setUpdationError(res.message);
      } else {
        dispatch(signoutSuccess());
        localStorage.clear();
        navigate("/");
      }
    } catch (err) {
      setUpdationError(err.message);
    }
  }

  async function handleDeleteUser() {
    setShowModel(false);
    setUpdationError(null);
    dispatch(deleteStart());
    try {
      const res = await fetch(
        `https://saalagram-1.onrender.com/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: localStorage.getItem("access_token") }),
        }
      );
      const response = await res.json();
      if (res.ok) {
        dispatch(deleteSuccess());
        navigate("/");
      } else {
        dispatch(deleteFailure(response.message));
        setUpdationError(response.message);
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
      setUpdationError(error.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setImageFileUploadProgress(null);
    setUploadingErrorMessage(null);
    if (imageUploading) {
      return;
    }
    try {
      dispatch(updateStart());
      if (Object.keys(formData).length === 0) {
        dispatch(updateFailure("Change Something To Update...!"));
        setUpdationSuccess(null);
        return setUpdationError(currentUserError);
      }
      const res = await fetch(
        `https://saalagram-1.onrender.com/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            token: localStorage.getItem("access_token"),
          }),
        }
      );
      const response = await res.json();
      if (res.ok) {
        setUpdationError(null);
        setUpdationSuccess("User Updated Successfully...!");
        setFormData({});
        return dispatch(updateSuccess(response));
      } else {
        dispatch(updateFailure(response.message));
        setUpdationSuccess(null);
        return setUpdationError(currentUserError);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdationSuccess(null);
      return setUpdationError(currentUserError);
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  function handleImageChange(e) {
    setImageFileUploadProgress(null);
    setUploadingErrorMessage(null);
    setImageUploading(true);
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  }
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        if (error) {
          setUploadingErrorMessage("The File Size Must Be Under 2MB");
          setImageFileUploadProgress(null);
          setImageFileURL(null);
          setImageFile(currentUser.profilePhoto);
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          setImageUploading(false);
          setFormData({ ...formData, profilePhoto: downloadURL });
        });
      }
    );
  };

  return (
    <div className="w-full md:w-96 md:mx-auto p-5 flex flex-col gap-5 md:mt-3">
      <h1 className="text-3xl font-semibold w-full text-center">Profile</h1>
      <form className="w-100 flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/.*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />

        <div
          className="relative cursor-pointer w-32 h-32 shadow-md rounded-full self-center mx-auto"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          {imageFileUploadProgress ? (
            <CircularProgressbar
              className="z-10 absolute top-0 left-0 w-full h-full"
              value={imageFileUploadProgress}
              text={`${imageFileUploadProgress}%`}
            />
          ) : null}
          <img
            className={`${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-40"
            }  absolute top-0 left-0 rounded-full w-full h-full border-8 border-[lightgray]`}
            src={imageFileURL || currentUser.profilePhoto}
            alt="ProfilePhoto"
          />
        </div>
        {uploadingErrorMessage && (
          <Alert icon={BiError} color={"red"} className="font-bold">
            {uploadingErrorMessage}
          </Alert>
        )}
        <TextInput
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="Username"
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={imageUploading || loading}
        >
          {loading ? "loading...!" : "Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              disabled={imageUploading}
              type="button"
              className="w-full"
              gradientDuoTone="purpleToBlue"
            >
              Create Post
            </Button>
          </Link>
        )}
      </form>
      <div className="flex justify-between text-red-500 font-semibold">
        <span
          className="cursor-pointer mx-2"
          onClick={() => {
            setShowModel(true);
          }}
        >
          Delete account
        </span>
        <span className="cursor-pointer mx-2" onClick={handleSignout}>
          Signout
        </span>
      </div>
      {updationSuccess && (
        <Alert icon={FaThumbsUp} color={"success"} className="font-bold">
          {updationSuccess}
        </Alert>
      )}
      {updationError && (
        <Alert icon={BiSolidError} color={"red"} className="font-bold">
          {updationError}
        </Alert>
      )}
      {showModel && (
        <Modal
          popup
          show={showModel}
          size={"md"}
          onClose={() => {
            setShowModel(false);
          }}
        >
          <Modal.Header />
          <Modal.Body>
            <h1 className="w-10 h-10 text-3xl font-bold rounded-full flex justify-center items-center mx-auto mb-4 border-2 border-black">
              <PiExclamationMarkBold />
            </h1>
            <h1 className="text-3xl font-bold text-black w-fit mx-auto mb-6 text-center">
              Are You Sure..?
            </h1>
            <div className="w-fit mx-auto flex gap-4">
              <Button
                onClick={handleDeleteUser}
                color={"red"}
                className="font-bold text-2xl bg-red-600 text-black"
              >
                Yes, Delete
              </Button>
              <Button
                onClick={() => {
                  setShowModel(false);
                }}
                color={"transparent"}
                className="font-bold text-2xl border-2 border-black"
              >
                No, Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
