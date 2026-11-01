# Udit Yadav · Portfolio

My personal portfolio, built with the **MERN** stack.

- **Frontend** (`client/`): React 18, Vite and Tailwind CSS v4, in a dark, responsive single page.
- **Backend** (`server/`): Express, MongoDB and Mongoose. It serves projects from the database and stores contact-form messages.
- **Content** (`shared/portfolio.json`): one file holds the profile, experience, projects and skills. Edit it to update the site.

## Run locally
```bash
npm run install:all
cp server/.env.example server/.env   # add your MongoDB URI
npm run dev:server                   # http://localhost:5000
npm run dev:client                   # http://localhost:5173 (proxies /api to the server)
```
The site works without a database too: projects come from `shared/portfolio.json`, and the contact form asks visitors to email instead.

## API
| Method | Route | Purpose |
|---|---|---|
| GET | `/api/health` | Health check and DB status |
| GET | `/api/portfolio` | All content from `shared/portfolio.json` |
| GET | `/api/projects` | Projects from MongoDB, or from the JSON as a fallback |
| POST | `/api/contact` | Save a message (validated, rate-limited, honeypot) |

To load the projects into MongoDB, run `npm run seed`.

## Deploy (free tiers)
1. **MongoDB Atlas:** create a free M0 cluster and copy the connection string.
2. **API on Render:** New → Blueprint → pick this repo. `render.yaml` sets it up. Set `MONGO_URI`, and set `CLIENT_URL` to your frontend URL.
3. **Frontend on Vercel:** import the repo, set the root directory to `client`, and set `VITE_API_URL` to the Render URL.

## Updating content
Edit `shared/portfolio.json`, then run `npm run seed` to sync projects to MongoDB. The resume lives at `client/public/Udit-Yadav-Resume.pdf`.
