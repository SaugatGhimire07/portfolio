import React, { useState, useEffect } from "react";
import { ArrowIcon, ExternalLinkIcon } from "./icons";
import { projectsByYear } from "../data/projects";
import { getLinkLabel } from "../utils/linkLabel";
import { isInternalLink, handleInternalLinkClick } from "../utils/internalNav";

export default function ProjectArchive({ onBack, onNavigate }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      requestAnimationFrame(() => {
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-400 antialiased">
      {/* Gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
          zIndex: 9999,
        }}
      />

      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:py-24">
        <button
          type="button"
          className="group mb-2 inline-flex items-center text-sm font-semibold leading-tight text-teal-300"
          onClick={onBack}
        >
          <ArrowIcon className="mr-1 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-2" />
          Back
        </button>

        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          All Projects
        </h1>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead className="sticky top-0 z-10 border-b border-slate-300/10 bg-slate-900/90 backdrop-blur">
              <tr>
                <th className="py-4 pr-8 text-sm font-semibold text-slate-200">Year</th>
                <th className="py-4 pr-8 text-sm font-semibold text-slate-200">Project</th>
                <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
                  Made at
                </th>
                <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
                  Built with
                </th>
                <th className="hidden py-4 text-sm font-semibold text-slate-200 sm:table-cell">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {projectsByYear.map((p, i) => (
                <tr
                  key={`${p.title}-${i}`}
                  className="border-b border-slate-300/10 last:border-none"
                >
                  <td className="py-4 pr-4 align-top text-sm text-slate-500">{p.year}</td>
                  <td className="py-4 pr-4 align-top font-semibold leading-snug text-slate-200">
                    {p.title}
                  </td>
                  <td className="hidden py-4 pr-4 align-top text-sm text-slate-400 lg:table-cell whitespace-nowrap">
                    {p.madeAt}
                  </td>
                  <td className="hidden py-4 pr-4 align-top lg:table-cell">
                    <ul className="flex flex-wrap gap-1.5">
                      {p.technologies.map((t) => (
                        <li key={t}>
                          <span className="inline-flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                            {t}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="hidden py-4 align-top sm:table-cell">
                    {p.link && (
                      <a
                        href={p.link}
                        target={isInternalLink(p.link) ? undefined : "_blank"}
                        rel={isInternalLink(p.link) ? undefined : "noreferrer noopener"}
                        onClick={isInternalLink(p.link) ? (e) => handleInternalLinkClick(e, p.link, onNavigate) : undefined}
                        className="group/link inline-flex items-center text-sm text-slate-400 hover:text-teal-300"
                      >
                        <span>{isInternalLink(p.link) ? "View case study" : getLinkLabel(p.link)}</span>
                        <ExternalLinkIcon className="inline-block h-3.5 w-3.5 shrink-0 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 ml-1" />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}