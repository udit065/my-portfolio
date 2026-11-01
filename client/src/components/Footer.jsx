import { GithubIcon, LinkedinIcon } from "./BrandIcons.jsx";

export default function Footer({ profile }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with MongoDB, Express, React & Node.
        </p>
        <div className="flex gap-2">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2 hover:text-white"><GithubIcon className="h-5 w-5" /></a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 hover:text-white"><LinkedinIcon className="h-5 w-5" /></a>
        </div>
      </div>
    </footer>
  );
}
