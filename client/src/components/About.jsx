import { GraduationCap } from "lucide-react";

export default function About({ profile, education }) {
  return (
    <section id="about" className="section">
      <p className="eyebrow reveal">01. About</p>
      <h2 className="h2 reveal">A bit about me</h2>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <div className="space-y-5 text-lg leading-relaxed text-slate-400 lg:col-span-3">
          {profile.about.map((p, i) => (
            <p key={i} className="reveal">{p}</p>
          ))}
          <div className="reveal grid grid-cols-3 gap-3 pt-4">
            {profile.stats.map((s) => (
              <div key={s.label} className="card p-4 text-center">
                <div className="text-3xl font-extrabold text-white">{s.value}</div>
                <div className="mt-1 text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 lg:col-span-2">
          {education.map((e) => (
            <div key={e.school} className="card reveal p-5">
              <div className="flex items-start gap-3">
                <span className="rounded-lg bg-accent/10 p-2 text-accent">
                  <GraduationCap size={20} />
                </span>
                <div>
                  <h3 className="font-semibold text-white">{e.degree}</h3>
                  <p className="text-sm text-slate-400">{e.school}</p>
                  <p className="mt-1 font-mono text-xs text-slate-500">
                    {e.period} · {e.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
