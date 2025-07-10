import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "../assets/img1.webp";
import img2 from "../assets/img2.webp";
import img3 from "../assets/img3.webp";
import img4 from "../assets/img4.webp";
import img5 from "../assets/img5.webp";

gsap.registerPlugin(ScrollTrigger);

const Home2 = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300",
          scrub: true,
        },
      });

      // Animate image positions outward
      tl.to("#img3", { x: -250, duration: 1 }, 0)
        .to("#img2", { x: -150, y: -150, duration: 1 }, 0)
        .to("#img1", { x: -120, y: 100, duration: 1 }, 0)
        .to("#img4", { x: 120, y: -120, duration: 1 }, 0)
        .to("#img5", { x: 200, y: 150, duration: 1 }, 0)

        // Animate text to grow and fade in
        .fromTo(
          textRef.current,
          { scale: 0.75, opacity: 0, y: 20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          0.1
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-white overflow-hidden"
    >
      <div className="relative w-full h-full max-w-screen-xl mx-auto">

        {/* Center Text (Styled Bold & Larger) */}
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none px-4 text-center">
          <div
            id="centerText"
            ref={textRef}
            className="transition-all duration-500"
          >
            <p className="text-xs md:text-sm uppercase tracking-wide text-gray-500 mb-2">
              15+ Years of Work Experience
            </p>
            <h1 className="text-[28px] md:text-[60px] font-extrabold text-[#111111] leading-tight max-w-4xl mx-auto">
              Your Trusted Partner in Design Excellence
            </h1>
          </div>
        </div>

        {/* Images */}
        <img
          id="img3"
          src={img3}
          alt="img3"
          className="absolute w-[270px] left-[18%] top-[22%] z-30"
        />
        <img
          id="img2"
          src={img2}
          alt="img2"
          className="absolute w-[200px] left-[28%] top-[24%] z-40"
        />
        <img
          id="img1"
          src={img1}
          alt="img1"
          className="absolute w-[240px] left-[39%] top-[40%] z-40"
        />
        <img
          id="img4"
          src={img4}
          alt="img4"
          className="absolute w-[240px] right-[28%] top-[10%] z-30"
        />
        <img
          id="img5"
          src={img5}
          alt="img5"
          className="absolute w-[280px] right-[23%] top-[27%] z-40"
        />
      </div>
    </section>
  );
};

export default Home2;
