import React from "react";
import SectionHeading from "../SectionHeading";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="About me"
    >
      <SectionHeading title="About" />
      <div>
        <p className="mb-4">
          I'm a passionate Full Stack Developer with a strong foundation in
          building scalable web applications. My expertise spans front-end and
          back-end development, with experience in React, Java, Spring Boot,
          ASP.NET, MongoDB, and MySQL. I enjoy crafting intuitive user
          interfaces while ensuring robust back-end architecture to support
          smooth functionality.
        </p>
        <p className="mb-4">
          Currently, I'm a student pursuing Full Stack Software Development at{" "}
          {}
          <a
            className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
            href="https://www.lambtoncollege.ca/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Lambton College (opens in a new tab)"
          >
            Lambton College, Missisauga
          </a>
          , while actively working on projects that combine my technical
          expertise with user-centered design principles. My past work includes
          e-learning platforms, inventory management systems, and online
          bookstores, all built with efficiency, security, and user experience
          in mind.
        </p>
        <p className="mb-4">
          Beyond development, I'm deeply curious about the intersection of
          technology and human interaction, always exploring ways to make
          digital experiences more engaging, accessible, and performant.
        </p>

        <p>
          When I'm not coding, you'll find me reading, gaming, exploring new
          receipe, or brainstorming innovative ways to enhance digital
          experiences.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
