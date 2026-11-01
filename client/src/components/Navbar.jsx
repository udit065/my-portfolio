import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

export default function Navbar({ resume }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled || open ? "border-b border-line bg-ink/85 backdrop-blur" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-mono text-lg font-semibold text-white">
          udit<span className="text-accent">.</span>dev
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="text-sm text-slate-400 transition hover:text-white">
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href={resume} target="_blank" rel="noreferrer" className="btn-ghost py-1.5!">
              Resume
            </a>
          </li>
        </ul>

        <button
          className="rounded-md p-2 text-slate-200 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <ul className="space-y-1 border-t border-line px-4 pb-4 pt-2 md:hidden">
          {[...LINKS, ["Resume", resume]].map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                {...(label === "Resume" ? { target: "_blank", rel: "noreferrer" } : {})}
                className="block rounded-md px-2 py-2 text-slate-300 hover:bg-panel hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
