import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { fallback, fetchProjects } from "./lib/api.js";
import { useReveal } from "./lib/useReveal.js";

export default function App() {
  const [projects, setProjects] = useState(fallback.projects);
  const { profile, experience, education, skills } = fallback;

  useEffect(() => {
    const ctrl = new AbortController();
    fetchProjects(ctrl.signal)
      .then((data) => Array.isArray(data) && data.length && setProjects(data))
      .catch(() => {}); // keep bundled projects if the API is unreachable
    return () => ctrl.abort();
  }, []);

  useReveal([projects]);

  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Navbar resume={profile.resume} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} education={education} />
        <Experience experience={experience} />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
