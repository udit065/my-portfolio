import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Allow importing ../shared/portfolio.json
    fs: { allow: [".."] },
    proxy: { "/api": "http://localhost:5000" },
  },
});
