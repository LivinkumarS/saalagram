import { Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <div className="w-full flex flex-col sm:flex-row p-4 sm:p-8 border-2 border-gray-400 shadow-lg rounded-tl-2xl gap-3 rounded-br-xl">
      <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-5 gap-3 sm:gap-8 text-center">
        <h1 className="sm:text-xl font-serif font-semibold ">
          Want to Have A Blog Post Website Dedicated To Your Business...!
        </h1>
        <Link to="/contact">
          <Button
            gradientDuoTone={"purpleToBlue"}
            className="rounded-tl-lg rounded-bl-none  rounded-br-none rounded-tr-none"
          >
            Contact Me!
          </Button>
        </Link>
      </div>
      <div className="flex-1">
        <img
          className="self-center w-fit shadow-md rounded-br-xl"
          src="https://firebasestorage.googleapis.com/v0/b/saalagrammern.appspot.com/o/a-sleek-tech-vibe-advertisement-poster-with-a-vibr-mqfw_W5XRL-vWpANIVbCbQ-tnvDbBhLSZmfZmloJQujNg.jpeg?alt=media&token=aee61894-aee6-483a-a620-e3bd0dafd28f"
          alt="poster img"
        />
      </div>
    </div>
  );
}
