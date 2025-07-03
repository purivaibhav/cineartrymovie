import React from 'react';
import './Services.css'; // assuming you'll create a CSS file for styles

const services = [
  { id: '01', text: 'BRANDING' },
  { id: '02', text: 'UI DESIGN' },
  { id: '03', text: 'DEVELOPMENT' },
  { id: '04', text: 'STRATEGY' },
];

const Services = () => {
  return (
    <section className="bg-[#0D0F14] min-h-screen flex flex-col justify-start p-8">
      {services.map(({ id, text }, index) => (
        <div 
          key={id} 
          className={`relative border-b border-gray-800 py-8 flex items-start fade-in`}>
          {/* Number */}
          <span className="text-[18px] font-semibold text-gray-400 mr-6 flex-shrink-0 select-none number-animation">
            {id}
          </span>
          {/* Text */}
          <h2
            className="relative uppercase font-extrabold tracking-tight leading-[1] text-[9.5rem] w-full max-w-full text-transparent bg-clip-text text-animation"
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              backgroundImage:
                'linear-gradient(90deg, rgb(172,172,172), rgb(96,96,96))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            {text}
          </h2>
        </div>
      ))}
    </section>
  );
};

export default Services;
