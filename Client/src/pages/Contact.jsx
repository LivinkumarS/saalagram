import { Button, Textarea, TextInput, Alert } from "flowbite-react";
import React, { useState } from "react";

export default function Contact() {
  const keys = JSON.parse(import.meta.env.VITE_API_KEY);

  const [formData, setFormData] = useState({ access_key: keys.EMAIL_API });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(false);
    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      formData.email === "" ||
      formData.message === "" ||
      formData.name === ""
    ) {
      return setError("All Fields Are Required");
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({
          access_key: keys.EMAIL_API,
          name: "",
          email: "",
          message: "",
        });
        setSuccess(true);
      } else {
        setError("Server Error...!");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="my-10 sm:m-0 overflow-hidden contact-bg min-h-screen relative flex flex-col items-center justify-center">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/saalagrammern.appspot.com/o/saalaimage.png?alt=media&token=b5f04aaf-83d0-42f5-9c9f-8815d30a04e9"
        alt=""
        className="dark:opacity-1 hidden md:inline opacity-90 z-0 h-screen w-auto absolute top-0 left-0"
      />

      <form
        onSubmit={handleSubmit}
        className="z-10 w-full max-w-xl px-8 mx-auto flex flex-col gap-4"
      >
        <p className="font-semibold text-center italic">
          Ready to take your business online? Let's build something amazing
          together! Whether you're looking for a custom blog or a full-fledged
          website, I'm here to bring your ideas to life. Drop your details
          below, and let’s start creating a blog website that reflects your
          brand, engages your audience, and grows your business!
        </p>
        <h1 className="text-xl sm:text-2xl font-extrabold text-center">
          Contact Form
        </h1>
        <div>
          <TextInput
            value={formData.name}
            placeholder="Name"
            type="text"
            name="name"
            id="name"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <TextInput
            value={formData.email}
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <Textarea
            value={formData.message}
            placeholder="Message"
            row="2"
            name="message"
            id="message"
            required
            onChange={handleChange}
          ></Textarea>
        </div>
        <Button
          color={"black"}
          className="bg-transparent text-black border border-black hover:bg-black hover:text-white hover:border-0 dark:border-white dark:text-white dark:hover:text-black dark:hover:bg-white"
          type="submit"
        >
          Submit Form
        </Button>
        <h1 className="mx-auto text-2xl font-extrabold text-gray-500 italic">
          Eat... Sleep... Code... Repeat...♾️
        </h1>
        {success && (
          <Alert className="w-full mt-4 font-semibold" color={"green"}>
            Submitted Successfully...!
          </Alert>
        )}
        {error && (
          <Alert className="w-full mt-4 font-semibold" color={"red"}>
            {error}
          </Alert>
        )}
      </form>
    </div>
  );
}
