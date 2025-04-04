import React from "react";
import SectionHeading from "../SectionHeading";
// Import project images
import quizCraftImage from "../assets/02.jpg";
import maplyticsImage from "../assets/03.jpg";
import spotifyProfileImage from "../assets/04.jpg";
import nextAcademyImage from "../assets/05.jpg";

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Selected projects"
    >
      <SectionHeading title="Projects" />
      <div>
        <ul className="group/list">
          <li className="mb-12">
            <ProjectItem
              title="Quiz Craft"
              description="Interactive quiz platform for educators, teachers, and students to create, manage, and participate in quizzes. It offers real-time engagement, analytics, and personalized feedback to enhance learning."
              link="https://github.com/SaugatGhimire07/quiz-craft"
              imageProps={{
                alt: "Quiz Craft",
                src: quizCraftImage,
              }}
              technologies={[
                "React",
                "Express",
                "Socket.IO",
                "Node",
                "MongoDB",
              ]}
            />
          </li>

          <li className="mb-12">
            <ProjectItem
              title="Maplytics"
              description="Business intelligence service that analyzes Google Maps reviews to uncover competitive insights, customer sentiment, and market trends. It helps businesses identify strengths, weaknesses, and opportunities to stay ahead in their industry."
              link="#"
              imageProps={{
                alt: "Maplytics business intelligence service",
                src: maplyticsImage,
              }}
              technologies={["React", "Node.js", "MongoDB"]}
            />
          </li>

          <li className="mb-12">
            <ProjectItem
              title="Spotify Profile"
              description="Web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more."
              link="https://spotify.saugat.dev/"
              imageProps={{
                alt: "Spotify Profile application",
                src: spotifyProfileImage,
              }}
              technologies={["React", "Express", "Spotify API", "Renderer"]}
            />
          </li>

          <li className="mb-12">
            <ProjectItem
              title="Next Academy"
              description="eLearning platform designed to equip learners with in-demand technical skills in coding, cybersecurity, DevOps, and more."
              link="#"
              imageProps={{
                alt: "Next Academy eLearning platform",
                src: nextAcademyImage,
              }}
              technologies={["Java"]}
            />
          </li>
        </ul>
        <div className="mt-12">
          <a
            className="inline-flex items-center font-medium leading-tight text-slate-200 font-semibold text-slate-200 group"
            aria-label="View Full Project Archive"
            href="/archive"
          >
            <span>
              <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                View Full Project{" "}
              </span>
              <span className="whitespace-nowrap">
                <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                  Archive
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

const ProjectItem = ({
  title,
  description,
  link,
  imageProps,
  technologies,
}) => {
  return (
    <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>

      <div className="z-10 sm:order-2 sm:col-span-6">
        <h3>
          <a
            className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${title} (opens in a new tab)`}
          >
            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
            <span>
              {title}{" "}
              <span className="inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </span>
          </a>
        </h3>
        <p className="mt-2 text-sm leading-normal">{description}</p>

        {technologies && technologies.length > 0 && (
          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
            {technologies.map((tech) => (
              <li key={tech} className="mr-1.5 mt-2">
                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                  {tech}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <img
        alt={imageProps.alt}
        loading="lazy"
        width="200"
        height="48"
        decoding="async"
        data-nimg="1"
        className="aspect-video object-cover rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
        style={{ color: "transparent" }}
        srcSet={imageProps.srcSet}
        src={imageProps.src}
      />
    </div>
  );
};

export default ProjectsSection;
