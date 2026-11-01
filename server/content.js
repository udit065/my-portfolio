import { readFileSync } from "node:fs";

// Single source of truth shared with the client.
export const content = JSON.parse(
  readFileSync(new URL("../shared/portfolio.json", import.meta.url), "utf8")
);
