import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons.jsx";

const FILTERS = ["All", "Full-stack", "Mobile", "Frontend"];
const LINK_LABEL = { live: "Live", code: "Code", frontend: "Frontend", api: "API" };

function ProjectLinks({ links }) {
  return (
    <div className="flex flex-wrap gap-3">
      {Object.entries(links || {}).map(([k, url]) => (
        <a
          key={k}
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition hover:text-accent"
        >
          {k === "live" ? <ExternalLink size={15} /> : <GithubIcon className="h-4 w-4" />}
          {LINK_LABEL[k] || k}
        </a>
      ))}
    </div>
  );
}

export default function Projects({ projects }) {
  const [filter, setFilter] = useState("All");
  const shown = useMemo(
    () => projects.filter((p) => filter === "All" || p.category === filter),
    [projects, filter]
  );
  const featured = shown.filter((p) => p.featured);
  const others = shown.filter((p) => !p.featured);

  return (
    <section id="projects" className="section">
      <p className="eyebrow reveal">03. Projects</p>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="h2 reveal">Things I've built</h2>
        <div className="reveal flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                filter === f ? "bg-accent text-ink font-semibold" : "border border-line text-slate-400 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {featured.length > 0 && (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {featured.map((p) => (
            <article key={p.slug} className="card group relative overflow-hidden p-6 transition hover:-translate-y-1 hover:border-accent/50">
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/20" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-accent">{p.category}</span>
                  <span className="font-mono text-xs text-slate-500">Featured</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold text-white">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-400">{p.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <ProjectLinks links={p.links} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {others.length > 0 && (
        <>
          <h3 className="mt-16 text-center text-xl font-semibold text-white">Other noteworthy projects</h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <article key={p.slug} className="card flex flex-col p-5 transition hover:-translate-y-1 hover:border-accent/50">
                <span className="font-mono text-xs uppercase tracking-wider text-accent">{p.category}</span>
                <h4 className="mt-2 text-lg font-semibold text-white">{p.title}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{p.description}</p>
                <p className="mt-4 font-mono text-xs text-slate-500">{p.stack.join(" · ")}</p>
                <div className="mt-4">
                  <ProjectLinks links={p.links} />
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
