import React, { useState, useEffect, useRef } from 'react';

const sections = [
  {
    bg: 'bg-black',
    heading1: 'Brand',
    heading2: 'Identities',
    tags: ['Logo', 'Typography', 'Color Palette', 'Voice & Tone', 'Guidelines'],
    text:
      "Our team will assist in developing a consistent brand voice, ensuring that all messages align with the brand's tone, values, objectives and goals.",
  },
  {
    bg: 'bg-gray-900',
    heading1: 'Smart',
    heading2: 'Development',
    tags: ['Web Development', 'App Development', 'UI/UX Design', 'Interactions', 'CMS'],
    text:
      "Our team will work closely with you, taking the time to understand your vision and feedback in order to bring your ideas to life. We'll provide regular updates and ensure that the final product surpasses your expectations.",
  },
  {
    bg: 'bg-gray-800',
    heading1: 'Marketing',
    heading2: 'Campaigns',
    tags: ['Digital Marketing', 'SEO', 'Social Media', 'Content Creation', 'Email Marketing'],
    text:
      'At SOHub, we recognize that effective marketing goes beyond simply promoting products or services. It involves understanding target audiences, crafting compelling messages, and improving the sustainable growth of an organization.',
  },
  {
    bg: 'bg-gray-700',
    heading1: '3D',
    heading2: 'Visualization',
    tags: ['Architecture', 'Engineering', 'Construction', 'Interior Design', 'Product Design'],
    text:
      'Our company specializes in envisioning images and animations of architectural and engineering projects. We use the latest software to create stunning visuals that portray astonishing photorealistic end products.',
  },
   
  

];

// Icon SVG for the bullet
const BulletIcon = () => (
  <svg
    className="w-6 h-6 mr-3 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20m0 0l7-7m-7 7L5 15" />
  </svg>
);

export default function ScrollableSections() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // On scroll update current active index for animation
  const onScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const height = containerRef.current.clientHeight;

    // Determine which section is mostly in the center of viewport
    const index = Math.round(scrollTop / height);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const refCurrent = containerRef.current;
    if (refCurrent) {
      refCurrent.addEventListener('scroll', onScroll, { passive: true });
    }
    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener('scroll', onScroll);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory"
      style={{ scrollBehavior: 'smooth', scrollSnapType: 'y mandatory' }}
      tabIndex={0}
    >
      {sections.map(({ bg, heading1, heading2, tags, text }, i) => {
        // Calculate offset for smooth fade/slide effect
        // Based on currentIndex, apply opacity and translateY

        let opacity = 0;
        let translateY = 50;

        if (i === currentIndex) {
          opacity = 1;
          translateY = 0;
        } else if (i === currentIndex - 1 || i === currentIndex + 1) {
          opacity = 0.5;
          translateY = 25;
        } else {
          opacity = 0;
          translateY = 50;
        }

        return (
          <section
            key={i}
            className={`${bg} snap-start min-h-screen p-16 flex flex-col justify-center rounded-[56px] mx-4 my-12 relative transition-all duration-700 ease-in-out`}
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              color: 'white',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            {/* Heading */}
            <h1 className="text-8xl font-extrabold leading-tight max-w-xl select-none">
              <span className="text-white">{heading1}</span>{' '}
              <span className="text-gray-400">{heading2}</span>
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-4 mt-12 max-w-full">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-black bg-opacity-20 px-6 py-2 rounded-full text-white text-base cursor-pointer select-none transition-colors duration-300 hover:bg-opacity-40"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Text with icon */}
            <div className="mt-14 flex max-w-xl select-text items-start">
              <BulletIcon />
              <p className="text-xl leading-relaxed text-white">{text}</p>
            </div>
          </section>
        );
      })}
    </div>
  );
}

