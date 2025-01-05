// 'use client'
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useRef, useEffect, useState } from "react";

// export default function NotFound() {
//   const path = usePathname();
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [videoError, setVideoError] = useState(false);
  
//   // Extract the last part of the path and make it more readable
//   const extractLastPathSegment = (fullPath: string) => {
//     const segments = fullPath.replace(/^\/|\/$/g, '').split('/');
//     const lastSegment = segments[segments.length - 1];
//     return lastSegment.split('-').map(word => 
//       word.charAt(0).toUpperCase() + word.slice(1)
//     ).join(' ');
//   };

//   useEffect(() => {
//     // Autoplay the video when component mounts
//     if (videoRef.current) {
//       videoRef.current.play().catch(error => {
//         console.error("Autoplay was prevented", error);
//         setVideoError(true);
//       });
//     }
//   }, []);

//   const pathName = extractLastPathSegment(path);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4">
//       <div className="max-w-4xl w-full bg-orange-100 border-4 border-orange-500 rounded-xl shadow-lg overflow-hidden">
//         {/* Video Player with Error Handling */}
//         <div className="w-full aspect-video bg-black flex items-center justify-center">
//           {videoError ? (
//             <div className="text-white text-center">
//               Video Failed to Load
//             </div>
//           ) : (
//             <iframe
//             className="max-w-full max-h-full"
//             width="100%"
//             height="100%"
//             src="https://www.youtube.com/embed/wE8s993ZV-8"  // Updated for YouTube embed
//             title="YouTube video player"
//             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             onError={() => setVideoError(true)}  // Handle iframe errors
//           ></iframe> 
//           )}
//         </div>
        
//         <div className="p-6 text-center">
//           <h2 className="text-4xl font-bold text-orange-700 mb-4">
//             Working on {pathName} right now
//           </h2>
//           <p className="text-xl text-orange-800 mb-6">
//             We apologize, but the page you're looking for isn't available
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Link
//               href="/"
//               className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 inline-block"
//             >
//               Return Home
//             </Link>
//             <Link
//               href="/vision"
//               className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 inline-block"
//             >
//               Check out our VISION
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";

export default function NotFound() {
  const path = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  
  // Extract the last part of the path and make it more readable
  const extractLastPathSegment = (fullPath: string) => {
    const segments = fullPath.replace(/^\/|\/$/g, '').split('/');
    const lastSegment = segments[segments.length - 1];
    return lastSegment.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  useEffect(() => {
    // Autoplay the video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Autoplay was prevented", error);
        setVideoError(true);
      });
    }
  }, []);

  const pathName = extractLastPathSegment(path);

  return (
    <div className="flex flex-col items-center justify-center min-h-max bg-orange-50 p-4">
      <div className="max-w-4xl w-full bg-orange-100 border-4 border-orange-500 rounded-xl shadow-lg overflow-hidden">
        {/* Video Player with Error Handling */}
        <div className="w-full aspect-video bg-black flex items-center justify-center">
          {videoError ? (
            <div className="text-white text-center">
              Video Failed to Load
            </div>
          ) : (
            <iframe
              className="max-w-full max-h-full"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/wE8s993ZV-8?autoplay=1&controls=0"  // Updated for autoplay and hidden controls
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={() => setVideoError(true)}  // Handle iframe errors
            ></iframe>
          )}
        </div>
        
        <div className="p-6 text-center">
          <h2 className="text-4xl font-bold text-orange-700 mb-4">
            Working on {pathName} right now
          </h2>
          <p className="text-xl text-orange-800 mb-6">
            We apologize, but the page you&aposre looking for isn&apost available
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 inline-block"
            >
              Return Home
            </Link>
            <Link
              href="/audio-explainer"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 inline-block"
            >
              Check out Misty
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
