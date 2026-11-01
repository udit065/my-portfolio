import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";

export default function Hero({ profile }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-accent/20 via-accent-2/10 to-transparent blur-3xl"
      />
      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-4 pt-24 sm:px-6">
        <p className="eyebrow reveal">Hi, my name is</p>
        <h1 className="reveal mt-3 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
          {profile.name}.
        </h1>
        <h2 className="reveal mt-3 text-3xl font-bold tracking-tight text-slate-400 sm:text-5xl">
          {profile.role} who ships{" "}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            full-stack products
          </span>
          .
        </h2>
        <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">{profile.tagline}</p>

        <p className="reveal mt-4 inline-flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin size={16} /> {profile.location}
        </p>

        <div className="reveal mt-9 flex flex-wrap items-center gap-3">
          <a href="#projects" className="btn-primary">
            See my work <ArrowUpRight size={16} />
          </a>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-ghost">
            <Download size={16} /> Resume
          </a>
          <span className="mx-1 hidden h-6 w-px bg-line sm:block" />
          <span className="flex items-center gap-1">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-lg p-2.5 text-slate-400 transition hover:bg-panel hover:text-white">
            <GithubIcon className="h-5 w-5" />
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-lg p-2.5 text-slate-400 transition hover:bg-panel hover:text-white">
            <LinkedinIcon className="h-5 w-5" />
          </a>
          </span>
        </div>
      </div>
    </section>
  );
}
