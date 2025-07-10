// ScrollEffect.js

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollEffecthome = () => {
  const imgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const image = imgRef.current;
    const content = contentRef.current;

    gsap.fromTo(
      image,
      { scale: 1 },
      {
        scale: 2,
        scrollTrigger: {
          trigger: content,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="relative h-[300vh]">
      {/* Left Fixed Image */}
      <div className="sticky top-0 h-screen flex items-center justify-center w-1/2 float-left">
        <img
          ref={imgRef}
          src="https://via.placeholder.com/400x600"
          alt="Scaling"
          className="w-2/3 h-auto object-cover transition-transform duration-300"
        />
      </div>

      {/* Right Scrollable Content */}
      <div
        ref={contentRef}
        className="absolute right-0 top-0 h-full w-1/2 flex flex-col justify-center p-10 space-y-40 text-lg leading-relaxed"
      >
        <div className="h-screen flex items-center">
          <p>First content block — this will scroll normally while the image scales up.</p>
        </div>
        <div className="h-screen flex items-center">
          <p>Second content block — continue writing descriptive text or details.</p>
        </div>
        <div className="h-screen flex items-center">
          <p>Third content block — image on left still scaling up gradually.</p>
        </div>
      </div>
    </div>
  );
};

export default ScrollEffecthome;
