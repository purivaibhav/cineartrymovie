// src/components/Production1.jsx
import React, { useState, useRef } from 'react';

const productions = [
  {
    id: 1,
    title: 'Fictional Film',
    status: 'En cours',
    duration: '1h 30m',
    director: 'Alex Smith',
    coproducers: 'Studio A',
    category: 'Fiction',
    thumbnail: 'https://via.placeholder.com/400x600?text=Fiction',
    trailer: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 2,
    title: 'Urban Rhythms',
    status: 'Pub',
    duration: '45m',
    director: 'Nina Rose',
    coproducers: 'Urban Vibe',
    category: 'Docu',
    thumbnail: 'https://via.placeholder.com/400x600?text=Docu',
    trailer: 'https://www.youtube.com/embed/ysz5S6PUM-U',
  },
  {
    id: 3,
    title: 'Dream in Pixels',
    status: 'En développement',
    duration: '60m',
    director: 'Leo Zhang',
    coproducers: 'Pixel Arts',
    category: 'Fiction',
    thumbnail: 'https://via.placeholder.com/400x600?text=Fiction2',
    trailer: 'https://www.youtube.com/embed/oHg5SJYRHA0',
  },
  // Add more as needed
];

const categories = ['All', 'Pub', 'Docu', 'Fiction', 'En cours'];

export default function Production1() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);
  const scrollRef = useRef();

  const filtered = selectedCategory === 'All'
    ? productions
    : productions.filter((p) => p.category === selectedCategory);

  const scroll = (dir) => {
    scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black flex flex-col">
      {/* Filter bar */}
      <div className="sticky top-0 z-20 bg-gray-100 py-4 px-6 shadow">
        <div className="flex gap-4 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === cat
                  ? 'bg-black text-white'
                  : 'border-gray-400 hover:bg-gray-200'
              } whitespace-nowrap`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal scroll section */}
      <div className="relative flex items-center mt-6 px-4 md:px-8">
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 bg-white rounded-full shadow p-2 z-10 hidden md:block"
        >
          ←
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 scroll-smooth pb-4"
        >
          {filtered.map((m) => (
            <div
              key={m.id}
              className="min-w-[200px] md:min-w-[240px] bg-white rounded-lg shadow-md group cursor-pointer"
              onClick={() => setActiveVideo(m)}
            >
              <div className="h-[300px] overflow-hidden rounded-t-lg">
                <img
                  src={m.thumbnail}
                  alt={m.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-lg">{m.title}</h3>
                <p className="text-sm text-gray-600">{m.status} • {m.duration}</p>
                <p className="text-sm text-gray-500">{m.director}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll(1)}
          className="absolute right-0 bg-white rounded-full shadow p-2 z-10 hidden md:block"
        >
          →
        </button>
      </div>

      {/* Modal Trailer */}
      {activeVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-30 px-4">
          <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full">
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={activeVideo.trailer}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{activeVideo.title}</h2>
              <p><strong>Status:</strong> {activeVideo.status}</p>
              <p><strong>Duration:</strong> {activeVideo.duration}</p>
              <p><strong>Director:</strong> {activeVideo.director}</p>
              <p><strong>Co-producers:</strong> {activeVideo.coproducers}</p>
              <button
                onClick={() => setActiveVideo(null)}
                className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
