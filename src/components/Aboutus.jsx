import React from 'react';

const AboutSection = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center">
      <h1 className="text-9xl font-bold leading-tight">À PROPOS</h1>
      <h2 className="text-4xl font-bold mt-4">LESS IS MORE.</h2>
      <h2 className="text-4xl font-bold mt-2">TOUJOURS.</h2>
      <p className="mt-6 text-lg max-w-lg">
        Dans nos idées, nos visuels, notre façon de travailler.
      </p>
      <div className="mt-4 text-gray-400">
        <span className="inline-flex items-center">
          <svg className="w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default AboutSection;
