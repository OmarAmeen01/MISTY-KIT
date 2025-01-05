"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OnBoardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const checkOnboarding = async () => {
        try {
          const response = await fetch(`/api/check-onboarding?email=${session.user?.email}`);
          const data = await response.json();

          if (data.onboarded) {
            router.push("/"); // Redirect to home if onboarded
          } else {
            router.push("/onBoardingPage/mcqs"); // Redirect to MCQs if not onboarded
          }
        } catch (error) {
          console.error("Onboarding check failed", error);
        }
      };

      checkOnboarding();
    }
  }, [session, status, router]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section */}
      <div className="flex-1 relative hidden md:flex items-center justify-center bg-gray-800">
        <Image
          src="/exodus.jpg"
          alt="Background"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: 0,
            objectFit: "cover",
            backgroundColor: "transparent",
          }}
          layout="fill"
          priority
        />
        <div className="absolute bottom-12 left-12 text-white max-w-md">
          <p className="text-xl font-medium italic leading-relaxed">
            “Really useful and unique study site that goes beyond a basic question bank...”
          </p>
          <p className="mt-4 text-lg font-semibold">— Cathy</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 relative">

        <div className="w-full max-w-md text-center">
          <h3 className="text-3xl font-semibold mb-6 text-gray-800">
            Welcome to Misty
          </h3>
          <p className="text-gray-600 mb-8">
            Sign up to access tailored learning resources and get started on your journey to mastery.
          </p>

          {/* Social Sign-Ins */}
          <button
            onClick={() => signIn("google")}
            className="w-full bg-gray-800 text-white flex items-center justify-center py-3 rounded-lg hover:bg-gray-900 transition duration-300 shadow-md"
          >
            <img
              src="/google.png"
              alt="Google"
              className="h-6 w-6 mr-3"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
