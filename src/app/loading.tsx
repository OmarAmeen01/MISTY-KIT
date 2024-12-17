// loading.tsx
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div
      className="w-5 h-5 rounded-full bg-black animate-loader-animation relative"
    >
      <div
        className="absolute inset-0 rounded-full bg-black animate-loader-animation"
        style={{ animationDelay: '-0.5s' }}
      ></div>
      <div
        className="absolute inset-0 rounded-full bg-black animate-loader-animation"
        style={{ animationDelay: '-1s' }}
      ></div>
    </div>
  );
};

const Loading: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-orange-500 bg-opacity-50 z-50 flex justify-center items-center">
    Loading...
    </div>
  );
};

export default Loading;
