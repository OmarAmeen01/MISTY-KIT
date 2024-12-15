"use client";

import { useEffect, useState } from "react";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OnBoardingPage() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };
    fetchCsrfToken();

    // Check onboarding status after user is authenticated
    const checkOnboardingStatus = async () => {
      if (session?.user?.email) {
        const email = session.user.email;

        try {
          const response = await fetch(`/api/check-onboarding?email=${email}`);
          if (response.ok) {
            const data = await response.json();
            if (data.onboarded) {
              // Redirect to home if onboarded
              router.push("/home");
            } else {
              // Redirect to the MCQs page if not onboarded
              router.push("/onBoardingPage/mcqs");
            }
          } else {
            console.error(
              "Error checking onboarding status:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Failed to fetch onboarding status:", error);
        }
      }
    };

    // Execute the check onboarding function
    if (status === "authenticated") {
      checkOnboardingStatus();
    }
  }, [session, status, router]);

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-gray-800 relative flex items-center justify-center">
        <Image src="/exodus.jpg" alt="Background" layout="fill" priority />
        <div className="absolute bottom-12 left-12 text-white">
          <p className="text-xl font-semibold">
            “Really useful and unique study site that goes beyond a basic
            question bank...”
          </p>
          <p className="mt-4 text-lg">Cathy</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-8">
        <h2 className="text-3xl font-bold mb-6">Arkham</h2>
        <div className="w-full max-w-sm">
          <h3 className="text-2xl font-semibold mb-4">Sign up</h3>

          {/* Social Sign-Ins */}
          <button
            onClick={() => signIn("google")}
            className="w-full bg-gray-200 text-black flex items-center justify-center py-2 rounded-md mb-4"
          >
            <img src="/favicon.ico" alt="Google" className="h-5 w-5 mr-2" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
