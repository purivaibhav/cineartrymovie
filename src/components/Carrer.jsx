import React from "react";

export default function Carrer() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-6xl w-full flex flex-col md:flex-row bg-black rounded-lg overflow-hidden shadow-lg">
        {/* Left Side Image */}
        <div className="md:w-1/2 relative">
          <img
            src="https://i.pinimg.com/736x/25/1b/f0/251bf0a90484a74d69fa444ca185927a.jpg"
            alt="Young woman with pink hair sitting at yellow metal table outdoors with plants and brick wall, holding notebook and smiling"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2ddcd32e-0a9f-4b8a-827f-5fc3b404bf3f.png";
            }}
          />
        </div>

        {/* Right Side Content */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center text-white bg-black">
          <p className="text-sm font-semibold tracking-wide mb-2">FOR TALENT</p>
          <h1 className="text-4xl font-bold mb-4">Find great work</h1>
          <p className="text-lg mb-8">
            Meet clients you're excited to work with and take your career or
            business to new heights.
          </p>

          <ul className="mb-8 space-y-4">
            <li className="flex items-center text-base">
              <span className="mr-3 text-white w-6 h-6" aria-hidden="true">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 3h-8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" />
                </svg>
              </span>
              Find opportunities at any career stage
            </li>
            <li className="flex items-center text-base">
              <span className="mr-3 text-white w-6 h-6" aria-hidden="true">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 0 1 0 6.844L12 14z" />
                  <path d="M12 14l-6.16 3.422a12.083 12.083 0 0 0 0-6.844L12 14z" />
                </svg>
              </span>
              Control when, where, and how you work
            </li>
            <li className="flex items-center text-base">
              <span className="mr-3 text-white w-6 h-6" aria-hidden="true">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <circle cx="8" cy="18" r="3" />
                  <circle cx="17" cy="18" r="3" />
                  <path d="M8 21h9" />
                  <path d="M9 14h7l-1-7H10l-1 7z" />
                </svg>
              </span>
              Explore different ways to earn
            </li>
          </ul>

          <button
            type="button"
            className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition"
          >
            Find opportunities
          </button>
        </div>
      </div>
    </div>
  );
}

