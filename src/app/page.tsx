'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Zap } from 'lucide-react';

const subjects = [
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "Literature",
  "History",
];

export default function Home() {
  const [currentSubject, setCurrentSubject] = useState(subjects[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSubject((prevSubject) => {
        const currentIndex = subjects.indexOf(prevSubject);
        return subjects[(currentIndex + 1) % subjects.length];
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F2EC] text-gray-800 overflow-hidden font-sans">
      <main className="flex-grow relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute left-0 top-1/4 w-1/3 h-1/3 opacity-5 animate-float">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Study%20Tutorial-1QyJTNGoYhNllpOMo1Nw2n1MIxEfHQ.png"
              alt="Decorative"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="absolute right-0 top-1/4 w-1/3 h-1/3 opacity-5 animate-float-delayed">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Girl%20working%20on%20Focus%20Group-JlxWa2MXv1JP9PlMfaZIJqt0swFwNL.png"
              alt="Decorative"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="absolute left-1/4 bottom-0 w-1/3 h-1/3 opacity-5 animate-float">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Web%20UI%20Design-zhLAcEap7ZZHJQpGO8vs41O3vPBSlv.png"
              alt="Decorative"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="text-center">
            <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-lg font-serif mb-8 transform hover:scale-105 transition-transform duration-300 ease-in-out">
              Established in the Year of Our Lord 2024
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-8 leading-tight tracking-tight text-gray-900">
              The Distinguished Way
              <br />
              to Master{" "}
              <span className="relative">
                <span className="border-b-8 border-amber-400">{currentSubject}</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-amber-200 -z-10 transform skew-x-12"></span>
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-sans">
              Achieve scholastic excellence through our curated collection of practice inquiries, 
              scholarly notes, and mnemonic devices, all conveniently arranged in one location.
            </p>

            <div className="mb-12">
              <span className="text-lg text-gray-600 block mb-4 font-serif italic">
                Esteemed by Educators and Pupils Alike
              </span>
              <div className="flex justify-center items-center space-x-4">
                <Image
                  src="https://cdn.vox-cdn.com/thumbor/6bvYA8Z7hBRrMJ965Rb20uKB628=/0x0:1192x795/1200x628/filters:focal(596x398:597x399)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg"
                  alt="Testimonials"
                  width={60}
                  height={60}
                  className="h-16 w-16 rounded-full shadow-md border-2 border-amber-200"
                />
                <Image
                  src="https://cdn.vox-cdn.com/thumbor/6bvYA8Z7hBRrMJ965Rb20uKB628=/0x0:1192x795/1200x628/filters:focal(596x398:597x399)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg"
                  alt="Testimonials"
                  width={60}
                  height={60}
                  className="h-16 w-16 rounded-full shadow-md border-2 border-amber-200"
                />
                <Image
                  src="https://cdn.vox-cdn.com/thumbor/6bvYA8Z7hBRrMJ965Rb20uKB628=/0x0:1192x795/1200x628/filters:focal(596x398:597x399)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg"
                  alt="Testimonials"
                  width={60}
                  height={60}
                  className="h-16 w-16 rounded-full shadow-md border-2 border-amber-200"
                />
              </div>
            </div>

            <Button
              size="lg"
              className="bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 text-xl font-serif rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Join Our Academy — It&apos;s Complimentary!
            </Button>

            <div className="mt-24 grid grid-cols-1 gap-12 sm:grid-cols-3">
              <div className="bg-white p-8 rounded-none shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl transform hover:-translate-y-2 border-t-4 border-amber-400 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 transform rotate-45 translate-x-8 -translate-y-8"></div>
                <BookOpen className="h-16 w-16 text-amber-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-gray-800 font-serif">
                  Comprehensive Materials
                </h3>
                <p className="text-gray-600 text-lg font-sans">
                  An extensive array of tailored study resources at your disposal.
                </p>
              </div>
              <div className="bg-white p-8 rounded-none shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl transform hover:-translate-y-2 border-t-4 border-amber-400 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 transform rotate-45 translate-x-8 -translate-y-8"></div>
                <Star className="h-16 w-16 text-amber-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-gray-800 font-serif">
                  Expert-Curated Content
                </h3>
                <p className="text-gray-600 text-lg font-sans">
                  Glean wisdom from the finest educators in each discipline, carefully selected for your benefit.
                </p>
              </div>
              <div className="bg-white p-8 rounded-none shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl transform hover:-translate-y-2 border-t-4 border-amber-400 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 transform rotate-45 translate-x-8 -translate-y-8"></div>
                <Zap className="h-16 w-16 text-amber-500 mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-gray-800 font-serif">
                  Interactive Learning
                </h3>
                <p className="text-gray-600 text-lg font-sans">
                  Engage with dynamic examinations and personalized educational journeys.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-6 right-6">
          <div className="bg-amber-100 rounded-full p-4 shadow-md transform hover:scale-110 transition-transform duration-300 ease-in-out border border-amber-300">
            <div className="text-2xl font-extrabold text-amber-800 font-serif">10/10 ✓</div>
          </div>
        </div>
      </main>
    </div>
  );
}

