"use client"

const AboutUsPage = () => {
  return (
    <div className="bg-[#1c1c1c] min-h-screen p-10 text-[#f5f5f5] font-sans">
      {/* Section 1 */}
      <section className="mb-24">
        <h1 className="text-[12vw] mt-25 font-extrabold leading-[1]">ABOUT</h1>
        <h2 className="text-4xl font-bold mt-8 leading-snug">
          CONNECTING TALENT.
          <br />
          CREATING FILMS.
        </h2>
        <p className="text-lg mt-2 max-w-10xl flex items-center gap-2">
          The world's first intuitive platform for film collaboration.
          <span role="img" aria-label="film camera emoji" className="inline-block select-none animate-spin text-4xl">
            🎬
          </span>
        </p>
        <div className="text-center mt-48">
          <div className="inline-block select-none text-4xl animate-bounce">&#8595;</div>
          <p className="mt-2 uppercase tracking-widest text-xl">Scroll</p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mb-24">
        <h2 className="text-[8vw] font-extrabold leading-[1] max-w-xl">
          WHO WE <br /> ARE?{" "}
          <span role="img" aria-label="movie clapper emoji" className="inline-block select-none">
            🎭
          </span>
        </h2>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed">
          CineArtery is the world's first intuitive platform to find the right talent and resources needed to weave a
          beautiful film.
          <br />
          Here, artists can display their best work and get hired by producers for roles that suit their craft.
        </p>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed">
          We hold a futuristic vision for how the global film industry connects, collaborates, and creates. Our aim is
          to make networking among filmmakers as seamless as the storytelling they bring to life.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-24 max-w-4xl mx-auto">
        <div className="flex flex-col gap-16">
          {/* Our Vision */}
          <div>
            <h2 className="text-[8vw] font-extrabold leading-[1] max-w-xl mb-6">
              OUR <br /> VISION{" "}
              <span role="img" aria-label="telescope emoji" className="inline-block select-none">
                🔭
              </span>
            </h2>
            <div className="space-y-4 text-xl leading-relaxed max-w-3xl">
              <p className="flex items-start gap-4">
                <span className="animate-ping select-none text-2xl">🎯</span>
                Build a global network and collaborative space for filmmakers
              </p>
              <p className="flex items-start gap-4">
                <span className="animate-ping select-none text-2xl">💡</span>
                Enable seamless exchange of knowledge and ideas
              </p>
              <p className="flex items-start gap-4">
                <span className="animate-ping select-none text-2xl">🎪</span>
                Be the right platform for the right talent
              </p>
              <p className="flex items-start gap-4">
                <span className="animate-ping select-none text-2xl">🌱</span>
                Nurture creativity through the right opportunities and support
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <div>
            <h2 className="text-[8vw] font-extrabold leading-[1] max-w-xl mb-6">
              OUR <br /> MISSION{" "}
              <span role="img" aria-label="rocket emoji" className="inline-block select-none">
                🚀
              </span>
            </h2>
            <p className="text-xl leading-relaxed max-w-3xl mb-8">To build a system that enables:</p>
            <div className="space-y-6 text-xl leading-relaxed max-w-3xl">
              <p className="flex items-start gap-4">
                <span className="animate-ping select-none text-2xl">🤝</span>
                Seamless collaboration between creators and producers
              </p>
              <p className="flex items-start gap-4">
                <span className="animate-ping select-none text-2xl">🛡️</span>
                Cultivation of trust through transparent, open systems
              </p>
              <p className="flex items-start gap-4">
                <span className="animate-ping select-none text-2xl">💰</span>
                Real-time clarity to budgeting
              </p>
              <p className="flex items-start gap-4">
                <span className="animate-ping select-none text-2xl">🎨</span>
                Protection of freedom of creative expression
              </p>
            </div>
          </div>

          {/* Innovation */}
          <div>
            <h2 className="text-4xl font-extrabold flex items-center gap-4 mb-4">
              <span className="animate-ping select-none text-3xl">👉</span> INNOVATIVE
            </h2>
            <p className="text-xl leading-relaxed max-w-3xl">
              We're revolutionizing how the film industry connects. From talent discovery to project completion, we're
              building the future of filmmaking collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Scroll Up Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className="fixed bottom-10 right-10 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-md hover:bg-gray-200 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  )
}

export default AboutUsPage
