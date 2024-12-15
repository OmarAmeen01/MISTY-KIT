// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function OnboardingMCQs() {
//   const router = useRouter();
//   const [responses, setResponses] = useState({
//     question1: "",
//     question2: "",
//     question3: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setResponses((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Save responses to the database (replace with an API call)
//     await fetch("/api/setOnboardedData", {
//       method: "POST",
//       body: JSON.stringify(responses),
//     });

//     // Redirect to the main page
//     router.push("/home");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen p-4">
//       <h1 className="text-2xl font-bold mb-6">Welcome! Let's get started.</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             What is your primary study goal?
//           </label>
//           <input
//             type="text"
//             name="question1"
//             value={responses.question1}
//             onChange={handleChange}
//             placeholder="E.g., Improve math skills"
//             className="w-full border rounded p-2"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             How many hours can you commit daily?
//           </label>
//           <input
//             type="text"
//             name="question2"
//             value={responses.question2}
//             onChange={handleChange}
//             placeholder="E.g., 2-3 hours"
//             className="w-full border rounded p-2"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Which subjects are you most interested in?
//           </label>
//           <input
//             type="text"
//             name="question3"
//             value={responses.question3}
//             onChange={handleChange}
//             placeholder="E.g., Science, Math"
//             className="w-full border rounded p-2"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function OnboardingMCQs() {
  const router = useRouter();
  const { data: session } = useSession();
  const [responses, setResponses] = useState({
    studyGoal: "",
    dailyStudyHours: "",
    interestedSubjects: ""
  });
  const [errors, setErrors] = useState({
    studyGoal: false,
    dailyStudyHours: false,
    interestedSubjects: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResponses((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newErrors = {
      studyGoal: responses.studyGoal.trim() === "",
      dailyStudyHours: responses.dailyStudyHours.trim() === "",
      interestedSubjects: responses.interestedSubjects.trim() === ""
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("/api/setOnboardedData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...responses,
          email: session?.user?.email
        }),
      });

      if (response.ok) {
        router.push("/home");
      } else {
        // Handle error
        const errorData = await response.json();
        console.error("Submission failed:", errorData);
        alert("Failed to submit onboarding data. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Welcome to Your Learning Journey
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              What is your primary study goal?
            </label>
            <input
              type="text"
              name="studyGoal"
              value={responses.studyGoal}
              onChange={handleChange}
              placeholder="E.g., Improve math skills"
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 
                ${errors.studyGoal 
                  ? 'border-red-500 focus:ring-red-300' 
                  : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.studyGoal && (
              <p className="text-red-500 text-xs mt-1">Study goal is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              How many hours can you commit daily?
            </label>
            <input
              type="text"
              name="dailyStudyHours"
              value={responses.dailyStudyHours}
              onChange={handleChange}
              placeholder="E.g., 2-3 hours"
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 
                ${errors.dailyStudyHours 
                  ? 'border-red-500 focus:ring-red-300' 
                  : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.dailyStudyHours && (
              <p className="text-red-500 text-xs mt-1">Daily study hours are required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Which subjects are you most interested in?
            </label>
            <input
              type="text"
              name="interestedSubjects"
              value={responses.interestedSubjects}
              onChange={handleChange}
              placeholder="E.g., Science, Math"
              className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 
                ${errors.interestedSubjects 
                  ? 'border-red-500 focus:ring-red-300' 
                  : 'border-gray-300 focus:ring-blue-300'}`}
            />
            {errors.interestedSubjects && (
              <p className="text-red-500 text-xs mt-1">Interested subjects are required</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg 
            hover:bg-blue-700 transition duration-300 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Start Your Learning Journey
          </button>
        </form>
      </div>
    </div>
  );
}