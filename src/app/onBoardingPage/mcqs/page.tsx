// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";

// export default function OnboardingMCQs() {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [responses, setResponses] = useState({
//     studyGoal: "",
//     dailyStudyHours: "",
//     interestedSubjects: ""
//   });
//   const [errors, setErrors] = useState({
//     studyGoal: false,
//     dailyStudyHours: false,
//     interestedSubjects: false
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setResponses((prev) => ({ ...prev, [name]: value }));
//     // Clear error when user starts typing
//     setErrors((prev) => ({ ...prev, [name]: false }));
//   };

//   const validateForm = () => {
//     const newErrors = {
//       studyGoal: responses.studyGoal.trim() === "",
//       dailyStudyHours: responses.dailyStudyHours.trim() === "",
//       interestedSubjects: responses.interestedSubjects.trim() === ""
//     };
//     setErrors(newErrors);
//     return !Object.values(newErrors).some(error => error);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const response = await fetch("/api/setOnboardedData", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...responses,
//           email: session?.user?.email
//         }),
//       });

//       if (response.ok) {
//         router.push("/");
//       } else {
//         // Handle error
//         const errorData = await response.json();
//         console.error("Submission failed:", errorData);
//         alert("Failed to submit onboarding data. Please try again.");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
//           Welcome to Your Learning Journey
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               What is your primary study goal?
//             </label>
//             <input
//               type="text"
//               name="studyGoal"
//               value={responses.studyGoal}
//               onChange={handleChange}
//               placeholder="E.g., Improve math skills"
//               className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 
//                 ${errors.studyGoal 
//                   ? 'border-red-500 focus:ring-red-300' 
//                   : 'border-gray-300 focus:ring-blue-300'}`}
//             />
//             {errors.studyGoal && (
//               <p className="text-red-500 text-xs mt-1">Study goal is required</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               How many hours can you commit daily?
//             </label>
//             <input
//               type="text"
//               name="dailyStudyHours"
//               value={responses.dailyStudyHours}
//               onChange={handleChange}
//               placeholder="E.g., 2-3 hours"
//               className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 
//                 ${errors.dailyStudyHours 
//                   ? 'border-red-500 focus:ring-red-300' 
//                   : 'border-gray-300 focus:ring-blue-300'}`}
//             />
//             {errors.dailyStudyHours && (
//               <p className="text-red-500 text-xs mt-1">Daily study hours are required</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Which subjects are you most interested in?
//             </label>
//             <input
//               type="text"
//               name="interestedSubjects"
//               value={responses.interestedSubjects}
//               onChange={handleChange}
//               placeholder="E.g., Science, Math"
//               className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 
//                 ${errors.interestedSubjects 
//                   ? 'border-red-500 focus:ring-red-300' 
//                   : 'border-gray-300 focus:ring-blue-300'}`}
//             />
//             {errors.interestedSubjects && (
//               <p className="text-red-500 text-xs mt-1">Interested subjects are required</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg 
//             hover:bg-blue-700 transition duration-300 
//             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//           >
//             Start Your Learning Journey
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Beaker } from 'lucide-react';

const studyGoals = ["Improve grades", "Learn new skills", "Prepare for exams", "Personal growth"];
const dailyStudyHours = ["1-2 hours", "2-3 hours", "3-4 hours", "4+ hours"];
const subjects = ["Math", "Physics", "Chemistry", "Biology", "Literature", "History"];

export default function OnboardingMCQs() {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const [responses, setResponses] = useState<{
    studyGoal: string;
    dailyStudyHours: string;
    interestedSubjects: string[];
  }>({
    studyGoal: "",
    dailyStudyHours: "",
    interestedSubjects: []
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  const handleOptionSelect = (field: keyof typeof responses, value: string) => {
    setResponses(prev => {
      if (field === 'interestedSubjects') {
        return {
          ...prev,
          [field]: prev[field].includes(value)
            ? prev[field].filter(item => item !== value)
            : [...prev[field], value]
        };
      }
      return { ...prev, [field]: value };
    });
    // Clear any previous errors
    setError(null);
  };

  const handleNextStep = () => {
    // Validate current step
    const currentField = questions[currentStep].field;
    if (!responses[currentField] || 
        (Array.isArray(responses[currentField]) && !responses[currentField].length)) {
      setError(`Please select ${questions[currentStep].title.toLowerCase()}`);
      return;
    }

    if (currentStep < 2) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // Validate all responses before submission
    if (!responses.studyGoal || !responses.dailyStudyHours || !responses.interestedSubjects.length) {
      setError("Please complete all steps before submitting");
      return;
    }

    if (status !== "authenticated" || !sessionData?.user?.email) {
      setError("User is not authenticated");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/setOnboardedData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...responses,
          email: sessionData.user.email
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error("Submission failed:", errorData);
        setError(errorData.error || "Failed to submit onboarding data. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const questions = [
    {
      title: "What's your primary study goal?",
      options: studyGoals,
      field: "studyGoal" as const,
      isMulti: false,
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "How many hours can you commit daily?",
      options: dailyStudyHours,
      field: "dailyStudyHours" as const,
      isMulti: false,
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Which subjects interest you most?",
      options: subjects,
      field: "interestedSubjects" as const,
      isMulti: true,
      icon: <Beaker className="w-6 h-6" />
    }
  ];

  const currentQuestion = questions[currentStep];

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-orange-600 text-2xl font-bold"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-5xl font-bold mb-8 text-center text-orange-800">
          Your Learning Journey
        </h1>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="flex items-center mb-6">
            {currentQuestion.icon}
            <h2 className="text-2xl font-semibold ml-3 text-orange-700">{currentQuestion.title}</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option}
                onClick={() => handleOptionSelect(currentQuestion.field, option)}
                className={`p-4 rounded-xl text-left transition-all text-lg font-medium
                  ${currentQuestion.isMulti
                    ? (responses[currentQuestion.field] as string[]).includes(option)
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                    : responses[currentQuestion.field] === option
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
        {error && (
          <div className="mt-4 text-center text-red-500 text-sm">
            {error}
          </div>
        )}
        <motion.button
          onClick={handleNextStep}
          disabled={!responses[currentQuestion.field].length || isSubmitting}
          className={`mt-8 w-full py-4 text-xl font-bold rounded-xl transition-all
            ${responses[currentQuestion.field].length && !isSubmitting
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-orange-300 text-orange-100 cursor-not-allowed'
            }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? "Submitting..." : currentStep < 2 ? "Next" : "Start Learning"}
        </motion.button>
      </div>
    </div>
  );
}