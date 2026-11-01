import fallback from "../../../shared/portfolio.json";

const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export { fallback };

// Projects come from MongoDB via the API; the bundled JSON keeps the site working if the API is asleep.
export async function fetchProjects(signal) {
  const res = await fetch(`${BASE}/api/projects`, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function sendMessage(payload) {
  const res = await fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || "Could not send your message.");
    err.fields = data.errors || {};
    throw err;
  }
  return data;
}
