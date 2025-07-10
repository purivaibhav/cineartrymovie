import React from "react";

const ThreeDPage = () => {
  return (
    <div className="w-full h-screen bg-black">
      <iframe
        src="https://my.spline.design/your-project-name/scene.splinecode" // <-- Replace with your own link
        frameBorder="0"
        width="100%"
        height="100%"
        allowFullScreen
        title="3D Interactive Spline"
        className="border-none"
      ></iframe>
    </div>
  );
};

export default ThreeDPage;
