import React from 'react';

function Tutoring() {
  return (
    <div>
      <section className="flex flex-col md:flex-row justify-center items-center bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 p-10 mt-10 rounded-lg shadow-lg space-y-10 md:space-y-0 md:space-x-10">
        {/* Top Availability Text */}

        {/* Text Content */}
        <div className="text-center justify-center items-center flex flex-col md:text-left">
          <p className="font-mono text-blue-600 p-3 rounded-full text-center text-base mb-5 bg-blue-200 w-full md:w-auto">
            Currently available only for primary and high school students
          </p>
          <h2 className="font-mono font-black max-w-xl text-center text-4xl sm:text-6xl lg:max-w-3xl lg:text-7xl text-black tracking-tight">
            Study with <br />
            <span className="inline-block pb-2 underline decoration-blue-500 decoration-[4px] underline-offset-[3px] sm:decoration-8 sm:underline-offset-4">
              Misty
            </span>
          </h2>
          <p className="text-gray-700 mt-4 max-w-lg text-center md:text-left">
            We offer the most affordable courses with a transparent and simple subscription model. Perfect for learners and parents looking for reliable education!
          </p>

          {/* Get Started Button */}
          <button
            className="mt-6 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg rounded-full shadow-lg hover:from-purple-500 hover:to-blue-500 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
            aria-label="Get started with tutoring for free"
          >
            Get Started - It's currently free
          </button>
        </div>

        {/* Image */}
        <div>
          <img
            src="/toturing-img.webp"
            alt="Illustration of a friendly AI tutor named Misty helping students"
            className="rounded-full shadow-xl border-4 border-blue-200 hover:shadow-2xl transition-all duration-300 ease-in-out"
            height={300}
            width={300}
          />
        </div>
      </section>
    </div>
  );
}

export default Tutoring;