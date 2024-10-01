import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Progress } from "flowbite-react";
import { app } from "../firebase";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { BiError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function UpdatePost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageUploadingProgress, setImageUploadingProgress] = useState(0);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `https://saalagram-1.onrender.com/api/post/getposts?postId=${postId}`,
          {
            method: "GET",
          }
        );

        const data = await res.json();

        if (res.ok) {
          setErrorMessage(null);
          setFormData(data.posts[0]);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    fetchPost();
  }, [postId]);

  async function handleUploadImage() {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setErrorMessage("File Size Must Be Under 2MB");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          setFormData({ ...formData, image: downloadURL });
        });
      }
    );
  }

  async function handlePostSubmit(e) {
    e.preventDefault();
    setErrorMessage(null);

    if (formData.content === "" || !formData.image || !formData.title) {
      return setErrorMessage("All Fields Are Required!");
    }

    const sendData = JSON.stringify(formData);

    try {
      const res = await fetch(
        `https://saalagram-1.onrender.com/api/post/updatepost/${formData._id}/${formData.userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
            image: formData.image,
            category: formData.category,
            token: localStorage.getItem("access_token"),
          }),
        }
      );
      const response = await res.json();
      if (res.ok) {
        navigate(`/post/${response.slug}`);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="p-3 max-w-3xl min-h-screen mx-auto">
      <h1 className="font-bold text-center my-7 text-3xl">Update Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            id="title"
            type="text"
            placeholder="Title"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
            value={formData.title}
          />
          <Select
            name="category"
            id="category"
            className="cursor-pointer"
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
            value={formData.category}
          >
            <option value="no category">Select Category</option>
            <option value="react">ReactJS</option>
            <option value="node">NodeJS</option>
          </Select>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-between border-2 border-dashed border-teal-500 p-3">
          <FileInput
            type="file"
            accept="image/*"
            className="flex-1"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
            }}
          />
          <Button
            type="button"
            color={"teal"}
            disabled={!imageFile || imageUploadingProgress}
            onClick={handleUploadImage}
          >
            {imageUploadingProgress > 0 && imageUploadingProgress < 100
              ? "Loading..."
              : "Upload"}
          </Button>
        </div>
        {imageUploadingProgress > 0 && (
          <Progress progress={imageUploadingProgress} />
        )}
        <div
          hidden={!imageFileURL && !formData.image}
          className="h-60 w-fit mx-auto relative"
        >
          <img
            src={imageFileURL || formData.image}
            alt="Post Image"
            className="w-full h-full cursor-pointer"
            onClick={() => {
              setImageFileURL(null);
              setImageFile(null);
              setImageUploadingProgress(0);
              setFormData({ ...formData, image: null });
            }}
          />
        </div>

        {formData.title ? (
          <ReactQuill
            value={formData.content}
            id="content"
            theme="snow"
            className="h-20"
            placeholder="Write Something About You Post..!"
            onChange={(val) => {
              setFormData({ ...formData, content: val });
            }}
          />
        ) : null}
        <Button
          type="submit"
          gradientDuoTone={"greenToBlue"}
          className="w-100 mt-16 sm:mt-12 mb-12"
          outline
          onClick={handlePostSubmit}
          disabled={
            !imageUploadingProgress === 0 && imageUploadingProgress < 100
          }
        >
          Update
        </Button>
      </form>
      {errorMessage && (
        <Alert color={"red"} className="mt-4" icon={BiError}>
          {errorMessage}
        </Alert>
      )}
    </div>
  );
}
