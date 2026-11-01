import { Code2 } from "lucide-react";

export default function Skills({ skills }) {
  return (
    <section id="skills" className="section">
      <p className="eyebrow reveal">04. Skills</p>
      <h2 className="h2 reveal">My toolkit</h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g) => (
          <div key={g.group} className="card reveal p-6">
            <div className="flex items-center gap-2 text-white">
              <Code2 size={18} className="text-accent" />
              <h3 className="font-semibold">{g.group}</h3>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s} className="chip">{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
