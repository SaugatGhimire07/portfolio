// Create a new file: src/hooks/useActiveSection.jsx
import { useState, useEffect } from "react";

const useActiveSection = (sectionIds, offset = 100) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      // Find all sections
      const sections = sectionIds
        .map((id) => {
          const element = document.getElementById(id);
          if (element) {
            return {
              id,
              offsetTop: element.offsetTop,
              offsetHeight: element.offsetHeight,
            };
          }
          return null;
        })
        .filter(Boolean);

      // Determine which section is in view
      const scrollPosition = window.scrollY + offset;

      // Find the current section
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const nextSection = sections[i + 1];

        // Check if we're at the last section or between the current and next section
        if (
          (!nextSection && scrollPosition >= section.offsetTop) ||
          (scrollPosition >= section.offsetTop &&
            scrollPosition < nextSection?.offsetTop)
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Run once on mount to set initial active section
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};

export default useActiveSection;
