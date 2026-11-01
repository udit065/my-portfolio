import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { sendMessage } from "../lib/api.js";

const EMPTY = { name: "", email: "", message: "", website: "" };

export default function Contact({ profile }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: "idle", msg: "" });
  const [errors, setErrors] = useState({});

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "sending", msg: "" });
    setErrors({});
    try {
      await sendMessage(form);
      setForm(EMPTY);
      setStatus({ state: "sent", msg: "Thanks! Your message is in. I'll get back to you soon." });
    } catch (err) {
      setErrors(err.fields || {});
      setStatus({ state: "error", msg: err.fields && Object.keys(err.fields).length ? "" : err.message || "Could not send your message." });
    }
  }

  const input =
    "w-full rounded-lg border border-line bg-ink px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:border-accent focus:outline-none";

  return (
    <section id="contact" className="section">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow reveal">05. What's next?</p>
        <h2 className="h2 reveal">Get in touch</h2>
        <p className="reveal mt-4 text-lg text-slate-400">
          I'm open to new roles and interesting projects. Whether you have a question or just want to say hi, my inbox is open.
        </p>
        <a href={`mailto:${profile.email}`} className="reveal btn-ghost mt-6">
          <Mail size={16} /> {profile.email}
        </a>
      </div>

      <form onSubmit={onSubmit} noValidate className="card reveal mx-auto mt-10 max-w-2xl space-y-4 p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm text-slate-400">Name</span>
            <input name="name" value={form.name} onChange={update} required autoComplete="name" className={input} placeholder="Your name" />
            {errors.name && <span className="mt-1 block text-sm text-rose-400">{errors.name}</span>}
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm text-slate-400">Email</span>
            <input name="email" type="email" value={form.email} onChange={update} required autoComplete="email" className={input} placeholder="you@example.com" />
            {errors.email && <span className="mt-1 block text-sm text-rose-400">{errors.email}</span>}
          </label>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-sm text-slate-400">Message</span>
          <textarea name="message" value={form.message} onChange={update} required rows={5} className={input} placeholder="What would you like to talk about?" />
          {errors.message && <span className="mt-1 block text-sm text-rose-400">{errors.message}</span>}
        </label>
        {/* Honeypot for bots */}
        <input name="website" value={form.website} onChange={update} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className={`text-sm ${status.state === "sent" ? "text-accent" : "text-rose-400"}`}>
            {status.msg}
          </p>
          <button type="submit" disabled={status.state === "sending"} className="btn-primary disabled:opacity-60">
            <Send size={16} /> {status.state === "sending" ? "Sending…" : "Send message"}
          </button>
        </div>
      </form>
    </section>
  );
}
