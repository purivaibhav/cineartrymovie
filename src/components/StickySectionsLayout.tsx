"use client"

import { MessageSquare, Sparkles } from "lucide-react"

export default function StickySectionsLayout() {
  const bgColors = [
    "bg-[#1f1f1f]",
    "bg-[#2a2a2a]",
    "bg-[#3a3a3a]",
    "bg-[#4a4a4a]",
  ];

  const sections = [
    {
      title: "Brand",
      subtitle: "Identities",
      tags: ["Logo", "Typography", "Color Palette", "Voice & Tone", "Guidelines"],
      content:
        "Our team will assist in developing a consistent brand voice, ensuring that all messages align with the brand's tone, values, objectives and goals.",
    },
    {
      title: "Smart",
      subtitle: "Development",
      tags: ["Web Development", "App Development", "UI/UX Design", "Interactions", "CMS"],
      content:
        "Our team will work closely with you, taking the time to understand your vision and feedback in order to bring your ideas to life. We'll provide regular updates and ensure that the final product surpasses your expectations.",
    },
    {
      title: "Marketing",
      subtitle: "Campaigns",
      tags: ["Digital Marketing", "SEO", "Social Media", "Content Creation", "Email Marketing"],
      content:
        "At SOHub, we recognize that effective marketing goes beyond simply promoting products or services. It involves understanding target audiences, crafting compelling messages, and improving the sustainable growth of an organization.",
    },
    {
      title: "3D",
      subtitle: "Visualization",
      tags: ["Architecture", "Engineering", "Construction", "Interior Design", "Product Design"],
      content:
        "Our company specializes in envisioning images and animations of architectural and engineering projects. We use the latest software to create stunning visuals that portray astonishing photorealistic end products.",
    },
  ];

  return (
    <div className="relative">
      {sections.map((section, index) => (
        <section
          key={index}
          className={`sticky top-0 h-[80vh] ${bgColors[index % bgColors.length]} flex items-center justify-start overflow-hidden rounded-3xl transition duration-700 ease-in-out`}
        >
          <div
            className="w-full h-full flex items-center px-8 md:px-16 lg:px-24"
            style={{ objectFit: "cover" }}
          >
            <div className="max-w-6xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-none mb-8">
                <span className="text-white">{section.title}</span>
                <br />
                <span className="text-gray-400">{section.subtitle}</span>
              </h1>

              <div className="flex flex-wrap gap-6 mb-10 text-white text-base">
                {section.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>

              <div className="flex items-start gap-4 text-white text-lg leading-relaxed max-w-4xl">
                <Sparkles className="text-white mt-1 flex-shrink-0" size={24} />
                <p>{section.content}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Spacer to allow last section to be pushed up */}
      <div className="h-screen"></div>
    </div>
  );
}
