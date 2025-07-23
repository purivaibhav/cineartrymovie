// BestHome.jsx

import React, { useRef, useEffect, useState } from "react";

const sections = [
  {
    number: "01",
    title: "BRANDING",
    desc:
      "Lorem ipsum dolor sit amet consectetur. Aliquet donec rutrum pellentesque a pellentesque non. Nullam dignissim urna eu ultrices risus. Sit at odio facilisi sit eget auctor.",
    tags: ["BOXING", "PACKAGING", "ENCLOSURE"],
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80",
  },
  {
    number: "02",
    title: "UI DESIGN",
    desc:
      "Vivamus vitae libero at augue dictum aliquam. Fusce posuere ultrices nullam. Euismod neque vitae ut a eget purus amet in eu.",
    tags: ["LABELING", "PACKAGING", "CONTAINERIZATION"],
    img: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=500&q=80",
  },
  {
    number: "03",
    title: "DEVELOPMENT",
    desc:
      "Suspendisse eu ex euismod, egestas nisi eget, viverra eros. Etiam euismod magna ut arcu faucibus rutrum.",
    tags: ["BOXING", "PACKAGING", "ENCLOSURE"],
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80",
  },
  {
    number: "04",
    title: "STRATEGY",
    desc:
      "Nullam euismod, nunc in vulputate cursus, nibh dolor ultricies dolor, a fermentum libero erat nec lacus.",
    tags: ["STRATEGY", "PLANNING", "CONSULTING"],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
  },
];

// Floating sidebar buttons
// const FloatingButtons = () => (
//   <div className="fixed top-[90px] right-8 z-50 flex flex-col gap-2 items-end">
//     <button
//       className="flex items-center gap-2 px-4 py-2 bg-white text-[#6166dd] hover:bg-[#f3f0ff] shadow rounded-full text-sm font-semibold transition-all border border-[#dde1f5]"
//       style={{ minWidth: 188 }}
//     >
//       <span role="img" aria-label="">📑</span>
//       120+ Templates
//     </button>
//     <button
//       className="flex items-center gap-2 px-4 py-2 bg-black bg-opacity-80 text-white hover:bg-opacity-100 shadow rounded-full text-sm font-semibold transition-all border border-[#2d2d3a]"
//       style={{ minWidth: 188 }}
//     >
//       <span role="img" aria-label="">⚙️</span>
//       Customization
//     </button>
//     <button
//       className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-400 text-white hover:from-blue-600 hover:to-purple-500 shadow rounded-full text-sm font-semibold transition-all border border-[#deebff]"
//       style={{ minWidth: 188 }}
//     >
//       <span role="img" aria-label="">💼</span>
//       Hire Our Team
//     </button>
//   </div>
// );

const BestHome = () => {
  const sectionRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(-1);

  // showInfo determines if scroll has reached reveal threshold
  useEffect(() => {
    const handleScroll = () => {
      const offset = 0.3 * window.innerHeight;
      let idx = -1;
      sectionRefs.current.forEach((ref, i) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top < offset) idx = i;
        }
      });
      setActiveIdx(idx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#17191a] overflow-x-hidden">
     

      <div className="max-w-[1400px] mx-auto pt-9 pb-32">
        {sections.map((section, idx) => (
          <div
            ref={el => (sectionRefs.current[idx] = el)}
            key={section.title}
            className="border-b border-[#22242A] min-h-[130px] md:min-h-[185px] relative transition-colors"
            style={{
              scrollMarginTop: "110px",
            }}
          >
            {/* Section header row */}
            <div className="flex flex-row items-end gap-3 px-3 sm:px-8 select-none relative z-10 py-3 md:py-5">
              <span className="font-mono text-[18px] text-[#6e6e7b] mb-2 md:mb-0">
                {section.number}
              </span>
              <span
                className={`font-extrabold leading-tight tracking-tight uppercase
                 text-[clamp(44px,9vw,112px)]
                  ${activeIdx === idx 
                      ? "text-gray-100" 
                      : "text-[#6e6e7b] opacity-85"} 
                  transition-colors`}
                style={{
                  fontFamily: "Inter, Arial, sans-serif",
                }}
              >
                {section.title}
              </span>
            </div>
            {/* Reveal content only when scrolled to this section */}
            {activeIdx === idx && (
              <div className="overflow-hidden pt-5 pb-8 md:pb-14 animate-fadein">
                <div className="flex flex-col md:flex-row gap-7 items-start px-3 sm:px-8">
                  <div className="flex-1">
                    <p className="text-gray-300 text-[17px] md:text-[18px] leading-relaxed mb-7 max-w-2xl">
                      {section.desc}
                    </p>
                    <div className="flex gap-4 flex-wrap">
                      {section.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-gray-400 rounded-full px-5 py-1.5 text-gray-100 font-mono text-[13px] tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <img
                    src={section.img}
                    alt={section.title}
                    className="w-[320px] h-[200px] object-cover rounded-lg border border-gray-700 shadow-md"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <style>
        {`
        .animate-fadein {
          animation: fadein .6s cubic-bezier(.62,0,.39,1.01);
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: none;}
        }
        `}
      </style>
    </div>
  );
};

export default BestHome;
