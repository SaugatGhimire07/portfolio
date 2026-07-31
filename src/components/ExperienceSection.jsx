import React from "react";
import SectionHeading from "../SectionHeading";

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Work experience"
    >
      <SectionHeading title="Experience" />
      <div>
        <ol className="group/list">
          <ExperienceItem
            period="Mar 2026 — Present"
            title="Technical Support Advisor II"
            company="Concentrix"
            href="https://www.concentrix.com/"
            description="Resolved 50–60 hardware, software, networking, and application support cases weekly, maintaining high customer satisfaction scores and minimal system downtime across enterprise environments. Documented 200+ incidents and troubleshooting workflows monthly into knowledge management articles, improving knowledge base accuracy and reducing average resolution time. Performed root cause analysis on recurring technical issues in collaboration with cross-functional teams, driving system enhancements that reduced repeat incidents. Delivered step-by-step troubleshooting guidance to end users, raising first-call resolution rates."
            technologies={[
              "Technical Documentation",
              "Help Desk Support",
              "Troubleshooting",
              "Root Cause Analysis",
              "Customer Support",
            ]}
          />

          <ExperienceItem
            period="Feb 2022 — Oct 2023"
            title="Full Stack Developer"
            company="InDesign Media Pvt. Ltd."
            description="Designed, built, and tested full stack web applications using JavaScript, React.js, and Node.js, shipping 3+ feature enhancements that improved usability and performance. Developed and integrated RESTful APIs across internal systems, reducing response times by 15%, and engineered SQL database schemas that improved data retrieval efficiency by 15%. Collaborated in Agile sprints with cross-functional teams, translating requirements into scalable technical solutions and accelerating feature delivery cycles by 20%. Debugged recurring application and data-flow issues through root cause analysis, improving system reliability by 20%."
            technologies={[
              "JavaScript",
              "React.js",
              "Node.js",
              "SQL",
              "RESTful APIs",
              "Python",
            ]}
          />

          <ExperienceItem
            period="Jan 2021 — Feb 2022"
            title="Student Services Department Officer"
            company="Itahari International College"
            description="Advised 300+ students on academic and non-academic matters, resolving grievances and coordinating support services across 4 departments. Organized orientation programs and extracurricular events for cohorts of 200+ incoming students, improving early-semester engagement. Maintained accurate records for 600+ active students, ensuring compliance with college policies and data accuracy standards. Analyzed student services data to identify trends and recommend improvements adopted by 5 departments."
            technologies={[
              "Student Advising and Support",
              "Data Analysis and Decision Making",
            ]}
          />

          <ExperienceItem
            period="Aug — Nov 2020"
            title="Full Stack Developer Intern"
            company="Quality IT Solution"
            description="Developed user-facing features and back-end APIs using Laravel, optimizing functionality and performance across production web applications. Collaborated with a 7-member graphic design team to translate UI/UX designs into responsive, interactive web components. Implemented data protection standards and security best practices, improving system efficiency by 92%. Conducted debugging, code reviews, and pre-deployment testing on relational database schemas."
            technologies={[
              "Laravel",
              "PHP",
              "JavaScript",
              "PostgreSQL",
              "HTML & CSS",
            ]}
          />
        </ol>
        <div className="mt-12">
          <a
            className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 font-semibold text-slate-200 group/link text-base"
            href="#"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View Full Résumé (opens in a new tab)"
          >
            <span>
              View Full{" "}
              <span className="inline-block">
                Résumé
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
        </div>
      </div>
    </section>
  );
};

const ExperienceItem = ({
  period,
  title,
  company,
  href,
  description,
  technologies,
}) => {
  return (
    <li className="mb-12">
      <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
        <header
          className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
          aria-label={period}
        >
          {period}
        </header>
        <div className="z-10 sm:col-span-6">
          <h3 className="font-medium leading-snug text-slate-200">
            <div>
              <a
                className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${title} at ${company} (opens in a new tab)`}
              >
                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                <span>
                  {title} ·{" "}
                  <span className="inline-block">
                    {company}
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
            </div>
          </h3>
          <p className="mt-2 text-sm leading-normal">{description}</p>
          <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
            {technologies.map((tech) => (
              <li key={tech} className="mr-1.5 mt-2">
                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                  {tech}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default ExperienceSection;
