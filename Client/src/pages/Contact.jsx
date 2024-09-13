import { Button, Textarea, TextInput,Label } from "flowbite-react";
import React from "react";

export default function Contact() {
  
  return (
    <div className=" overflow-hidden contact-bg min-h-screen relative flex flex-col items-center justify-center">
      
      <img src="https://firebasestorage.googleapis.com/v0/b/saalagrammern.appspot.com/o/saalaimage.png?alt=media&token=b5f04aaf-83d0-42f5-9c9f-8815d30a04e9" alt=""  className="dark:opacity-1 hidden md:inline opacity-90 z-0 h-screen w-auto absolute top-0 left-0"/>

      <form
        action="https://api.web3forms.com/submit"
        method="POST"
        className="z-10 w-full max-w-xl px-8 mx-auto flex flex-col gap-4"
      >
        <p className="font-semibold text-center italic">Ready to take your business online? Let's build something amazing together! Whether you're looking for a custom blog or a full-fledged website, I'm here to bring your ideas to life. Drop your details below, and let’s start creating a blog website that reflects your brand, engages your audience, and grows your business!</p>
        <h1 className="text-xl sm:text-2xl font-extrabold text-center">Contact Form</h1>
        <TextInput type="hidden" name="access_key" value="72ed829b-94d5-4898-87f3-3b4934cec02a" />
        <div>
          <TextInput placeholder="Name" type="text" name="name" required />
        </div>
        <div>
          <TextInput placeholder="Email" type="email" name="email" required />
        </div>
        <div>
          <Textarea placeholder="Message" row='2' name="message" required></Textarea>
        </div>
        <Button color={'black'} className="bg-transparent text-black border border-black hover:bg-black hover:text-white hover:border-0 dark:border-white dark:text-white dark:hover:text-black dark:hover:bg-white" type="submit">
          Submit Form
        </Button>
<h1 className="mx-auto text-2xl font-extrabold text-gray-500 italic">Eat... Sleep... Code... Repeat...♾️</h1>
      </form>
    </div>
  );
}
