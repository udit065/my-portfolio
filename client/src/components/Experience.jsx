import { useState } from "react";

export default function Experience({ experience }) {
  const [active, setActive] = useState(0);
  const job = experience[active];

  return (
    <section id="experience" className="section">
      <p className="eyebrow reveal">02. Experience</p>
      <h2 className="h2 reveal">Where I've worked</h2>

      <div className="reveal mt-10 grid gap-6 md:grid-cols-[220px_1fr]">
        <div role="tablist" aria-label="Companies" className="flex gap-1 overflow-x-auto md:flex-col md:border-l md:border-line">
          {experience.map((e, i) => (
            <button
              key={e.company}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`whitespace-nowrap px-4 py-3 text-left text-sm transition md:-ml-px md:border-l-2 ${
                i === active
                  ? "rounded-md bg-panel text-accent md:rounded-none md:border-accent md:bg-accent/5"
                  : "text-slate-400 hover:text-white md:border-transparent"
              }`}
            >
              {e.company.replace(/ (Pvt\. Ltd\.|LLP)$/, "")}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="min-h-[280px]">
          <h3 className="text-xl font-semibold text-white">
            {job.role} <span className="text-accent">@ {job.company}</span>
          </h3>
          <p className="mt-1 font-mono text-sm text-slate-500">
            {job.period} · {job.location}
          </p>
          <ul className="mt-5 space-y-3">
            {job.points.map((p) => (
              <li key={p} className="relative pl-6 leading-relaxed text-slate-400">
                <span className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-accent" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
