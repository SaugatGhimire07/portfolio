import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import WritingSection from "./components/WritingSection";

const PortfolioPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Use pageX and pageY instead of clientX and clientY to account for scrolling
      setMousePosition({
        x: event.pageX,
        y: event.pageY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="font-primary bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900">
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 z-30 transition duration-300"
          style={{
            position: "fixed", // Keep it fixed to avoid jumping
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
          }}
        ></div>
        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-4">
            <Header />
            <main id="content" className="pt-24 lg:w-[52%] lg:py-24">
              <AboutSection />
              <ExperienceSection />
              <ProjectsSection />
              <WritingSection />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
