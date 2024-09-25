import React from "react";

export default function About() {
  return (
    <div className="px-5 min-h-screen h-auto flex flex-col items-center justify-center gap-10">
      <div className=" my-5 sm:my-10 text-xs sm:text-lg font-semibold borderDecoration text-white sm:font-bold">
        Welcome to <b>Saala's Blog</b>, a dynamic space where technology meets
        creativity! Built using the powerful MERN stack (MongoDB, Express,
        React, Node.js), this blog is your ultimate destination for insightful
        articles, coding tutorials, and fun-filled tech stories. Whether you're
        a seasoned developer or just starting your journey, <b>Saala's Blog   </b> 
         offers something for everyone—ranging from practical coding tips to
        innovative projects that showcase cutting-edge web development. Here, we
        believe that learning should be both educational and enjoyable. You'll
        find a unique mix of in-depth programming guides, web development
        tricks, and a sprinkle of humor to keep things exciting. Our content is
        designed not only to teach but also to inspire, helping you unlock new
        levels of creativity and technical skill. Explore, engage, and evolve
        with us as we share our passion for code, design, and innovation.
        Welcome to a world where tech knowledge meets fun, and every post is a
        step toward mastering the digital universe!
      </div>
      <div className="w-full max-w-3xl p-2 flex flex-row items-center justify-center flex-wrap sm:flex-nowrap gap-5 rounded-lg shadow-xl">
        <img src="https://firebasestorage.googleapis.com/v0/b/portfolio-react-29350.appspot.com/o/Livin.jpg?alt=media&token=de15e18f-d9de-4759-8537-8b36a188c6ee" alt="" className="rounded-full w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]" />
        <div>
          <h3 className="font-bold">Created By: <span className="text-gray-600">Livinkumar S(Saala)</span> </h3>
          <p><p className="font-semibold text-sm">A passionate web developer with a strong foundation in web technologies like HTML, CSS, JavaScript, React, and Node.js. Completed a BE in Electronics and Communication Engineering and built various projects, including responsive web applications and full-stack blogs. Currently seeking a role in a company where I can apply and expand my skills while contributing to innovative projects. </p></p>
        </div>
      </div>
      <div className="w-full p-3 max-w-xl rounded-lg rounded-tl-none shadow-xl mb-10">
        <p className="text-gray-600 font-medium text-md">
        I'm currently open to taking on new projects. If you're looking for a web solution, whether it's a blog, e-commerce platform, or a custom-built web app, feel free to reach out. Let's work together to create something amazing!
        </p>
      </div>
    </div>
  );
}
