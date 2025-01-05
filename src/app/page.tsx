"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Head from "next/head"; // Import Head for including links in the head
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "./globals.css";

const subjects = ["Physics", "Chemistry", "Biology", "Mathematics", "Literature", "History"];

export default function Home() {
  const [currentSubject, setCurrentSubject] = useState(subjects[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSubject((prev) => {
        const currentIndex = subjects.indexOf(prev);
        return subjects[(currentIndex + 1) % subjects.length];
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-max bg-white text-gray-800 font-sans relative overflow-hidden">
      <Head>
        {/* Import Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Background Images */}
      {/* For mobile view */}
      <div className="top-0 flex justify-center items-center md:hidden">
        <Image
          src="/misty.png"
          alt="Decorative"
          width={300}
          height={300}
        />
      </div>

      {/* For larger screens */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <div className="absolute left-0  top-10 bottom-0 w-auto animate-float">
          <Image
            src="/left-landing.png"
            alt="Decorative"
            width={300}
            height={300}
          />
        </div>
        <div className="absolute right-0 top-10 bottom-0 w-auto animate-float-delayed">
          <Image
            src="/right-landing.png"
            alt="Decorative"
            width={300}
            height={300}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center py-5 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-5">
          <h1 className="mx-auto font-mono font-black max-w-xl text-center text-3xl tracking-normal text-black transition-all sm:text-5xl lg:max-w-3xl lg:text-[88px]">
            The Distinguished Way to Master{" "}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              key={currentSubject}
              transition={{ duration: 0.5 }}
              className="relative inline-block"
            >
              <span className="inline-block pb-2 underline decoration-blue-500 decoration-[4px] underline-offset-[3px] sm:decoration-8 sm:underline-offset-4">
                {currentSubject}
              </span>
            </motion.span>
          </h1>
          <h2 className="mx-auto sanfont mt-4 max-w-xl text-center text-lg font-medium leading-6 tracking-tight text-muted-foreground sm:mt-8 sm:text-3xl sm:leading-tight lg:max-w-3xl">
            Try the best conversational AI Teacher at the palm of your hands.
          </h2>
        </div>

        <div id="tp-widget-wrapper" className="tp-widget-wrapper visible mt-1">
          <div id="tp-widget-rating" className="tp-widget-rating">
            <span id="translations-main">
              Tested by<strong> 500+ </strong>students
            </span>
          </div>
        </div>

        {/* Call to Action */}
        <Button
          className="mt-6 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg rounded-full shadow-lg hover:from-purple-500 hover:to-blue-500 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 p-5"
        >
          Join Misty — It's Free!
        </Button>
      </main>

      {/* Footer */}
      <div className="mt-auto mb-0">
        <footer className="bg-transparent py-6 relative z-10">
          <div className="text-center text-gray-600 text-sm">
            © {currentYear} Misty. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
