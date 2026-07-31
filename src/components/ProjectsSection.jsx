import React from "react";
import SectionHeading from "../SectionHeading";
import { ArrowIcon, ExternalLinkIcon } from "./icons";
import { projectsByYear } from "../data/projects";

const FEATURED_COUNT = 4;

const ProjectsSection = ({ onViewArchive }) => {
  const featuredProjects = projectsByYear.slice(0, FEATURED_COUNT);

  return (
    <section
      id="projects"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Selected projects"
    >
      <SectionHeading title="Projects" />
      <div>
        <ul className="group/list">
          {featuredProjects.map((project) => (
            <li key={project.title} className="mb-12">
              <ProjectItem
                title={project.title}
                description={project.description}
                link={project.link || "#"}
                imageProps={{
                  alt: project.imageAlt,
                  src: project.image,
                }}
                technologies={project.technologies}
              />
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <button
            type="button"
            className="inline-flex items-center font-medium leading-tight text-slate-200 font-semibold text-slate-200 group"
            aria-label="View Full Project Archive"
            onClick={onViewArchive}
          >
            <span>
              <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                View Full Project{" "}
              </span>
              <span className="whitespace-nowrap">
                <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                  Archive
                </span>
                <ArrowIcon className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
              </span>
            </span>
          </button>
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
  const hasImage = Boolean(imageProps?.src);

  return (
    <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>

      <div className={`z-10 sm:order-2 ${hasImage ? "sm:col-span-6" : "sm:col-span-8"}`}>
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
                <ExternalLinkIcon className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
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

      {hasImage && (
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
      )}
    </div>
  );
};

export default ProjectsSection;
