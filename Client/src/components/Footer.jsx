import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {  FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function FooterComp() {
  return (
    <Footer className="border border-t-8 border-teal-800 p-5 flex-col">
      <div className="flex justify-between gap-10 flex-wrap w-screen pr-10">
        <Link to="/" className="sm:ml-4 font-semibold text-lg flex items-center justify-center">
          <i className="font-bold text-xl sm:text-2xl">Saala's Blog</i>
        </Link>

        

        <div className="flex gap-4 sm:gap-20">
          <div className="">
            <Footer.Title title="Follow Us" />
            <Footer.LinkGroup col>
              <Footer.Link
                className="text-blue-950 dark:text-purple-500 cursor-pointer font-bold"
                href="https://github.com/LivinkumarS"
                target="_blank"
              >
                GitHub
              </Footer.Link>
              <Footer.Link
                className="text-blue-600 cursor-pointer font-bold"
                href="https://www.linkedin.com/in/livinkumar-saravanan-666731255"
                target="_blank"
              >
                LinkedIn
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div className="">
            <Footer.Title title="Legal" />
            <Footer.LinkGroup col>
              <Footer.Link className=" cursor-pointer font-bold">
                Privacy Policy
              </Footer.Link>
              <Footer.Link className=" cursor-pointer font-bold">
                Terms&Conditions
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
      </div>
      <Footer.Divider />
      <div className="self-start sm:self-center">
        <div className="flex-col gap-0 justify-center items-center">
          <Footer.Copyright
            href="#"
            by="Saala's Blog"
            year={new Date().getFullYear()}
          />
          <Footer.LinkGroup className="mt-5 flex-row gap-2 items-center justify-start sm:justify-center">
            <Footer.Link className="cursor-pointer" href="" target="_blank">
              <FaGithub />
            </Footer.Link>
            <Footer.Link className="cursor-pointer" href="https://www.linkedin.com/in/livinkumar-saravanan-666731255" target="_blank">
              <FaLinkedin />
            </Footer.Link>
            <Footer.Link className="cursor-pointer" href="https://www.linkedin.com/in/livinkumar-saravanan-666731255" target="_blank">
              <FaWhatsapp />
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
      </div>
    </Footer>
  );
}
