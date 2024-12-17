'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Zap } from 'lucide-react';

const subjects = [
  "Physics",
  "Chemistry",
  "Biology",
  "Math",
  "Computer Science",
  "Literature",
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
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      <main className="flex-grow relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute left-0 top-1/4 w-1/3 h-1/3 opacity-5">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Study%20Tutorial-1QyJTNGoYhNllpOMo1Nw2n1MIxEfHQ.png"
              alt="Decorative"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="absolute right-0 top-1/4 w-1/3 h-1/3 opacity-5">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Girl%20working%20on%20Focus%20Group-JlxWa2MXv1JP9PlMfaZIJqt0swFwNL.png"
              alt="Decorative"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="absolute left-1/4 bottom-0 w-1/3 h-1/3 opacity-5">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Web%20UI%20Design-zhLAcEap7ZZHJQpGO8vs41O3vPBSlv.png"
              alt="Decorative"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
          <div className="text-center">
            <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
              Backed by Personal Funds
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The free & fun way
              <br />
              to learn{" "}
              <span className="border-b-4 border-black">{currentSubject}</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Ace your exams with thousands of practice questions, study notes,
              & flashcards, all in one place.
            </p>

            <div className="mb-8">
              <span className="text-sm text-gray-600 block mb-2">
                Testimonials from teachers and Kids
              </span>
              <Image
                src="https://cdn.vox-cdn.com/thumbor/6bvYA8Z7hBRrMJ965Rb20uKB628=/0x0:1192x795/1200x628/filters:focal(596x398:597x399)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg"
                alt="Testimonials"
                width={300}
                height={48}
                className="h-12 w-auto mx-auto rounded-lg shadow-sm"
              />
            </div>

            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Join Chintu — its free
            </Button>

            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="bg-white p-6 rounded-2xl shadow-sm transition-all duration-300 ease-in-out hover:shadow-md">
                <BookOpen className="h-10 w-10 text-purple-600 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">
                  Comprehensive Materials
                </h3>
                <p className="text-gray-600 text-sm">
                  Wide range of tailored study resources.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm transition-all duration-300 ease-in-out hover:shadow-md">
                <Star className="h-10 w-10 text-yellow-500 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">
                  Expert-Curated Content
                </h3>
                <p className="text-gray-600 text-sm">
                  Learn from top educators in each field.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm transition-all duration-300 ease-in-out hover:shadow-md">
                <Zap className="h-10 w-10 text-blue-500 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">
                  Interactive Learning
                </h3>
                <p className="text-gray-600 text-sm">
                  Engage with dynamic quizzes and paths.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <div className="bg-green-100 rounded-full p-3 hidden sm:block">
            <div className="text-xl font-bold text-green-600">10/10 ✓</div>
            {/* <div className="text-green-600">✓</div> */}
          </div>
        </div>
      </main>
    </div>
  );
}

