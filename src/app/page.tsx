"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button} from "@/components/ui/button";
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
    <div className="flex flex-col min-h-max md:min-h-screen  lg:max-w-[1700px] lg:w-[100%]  lg:min-w-[1080px] lg:ml-auto lg:mr-auto bg-white text-gray-800 font-sans relative overflow-hidden">
     

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

   <div>   {/* For larger screens */}
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

      <main className="flex-grow flex flex-col items-center justify-center py-5 px-4 sm:px-6 md:mt-36 lg:px-8 relative z-10">
        <div className="text-center mb-5">
          <h1 className="mx-auto font-sans font-bold max-w-xl text-center text-3xl tracking-normal text-black transition-all sm:text-5xl lg:max-w-3xl lg:text-[3.8rem]">
            The Distinguished Way to Master{" "} 
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              key={currentSubject}
              transition={{ duration: .2 }}
              className="relative inline-block"
            >
              <span className="inline-block pb-2 underline decoration-blue-500 decoration-[4px] underline-offset-[3px] sm:decoration-8 sm:underline-offset-4">
                {currentSubject}
              </span>
            </motion.span>
          </h1>
          <h2 className="mx-auto font-sans mt-4 text-center text-md text-gray-500 font-medium leading-6 tracking-tight  text-muted-foreground sm:mt-8 sm:text-3xl sm:leading-tight lg:max-w-2xl lg:text-3xl max-w-xl">
            Try the best conversational AI Teacher at the palm of your hands.
          </h2>
        </div>

        <div id="tp-widget-wrapper" className="tp-widget-wrapper visible mt-1">
        </div>

        {/* Call to Action */}
      
       <div className="flex-items-center p-2">



        <Button
          className=" mt-6 px-8 py-4 box-border bg-blue-500 hover:bg-blue-500  hover:bg-opacity-85 p-5 font-bold text-xl drop-shadow-2xl shadow-inner active:mt-0.2 active:border-b-2 border-b-4 border-black/10  rounded-2xl tracking-wide"
        >
          Join Misty — It's Free!
        </Button>
        


        </div>
            </main>
</div>
     
 {/* Main Content */}
 
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
