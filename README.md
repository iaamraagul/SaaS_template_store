# SaaSTemplates — Premium SaaS Template Marketplace

SaaSTemplates is a full-stack mini marketplace for premium SaaS templates. It follows the supplied UX Pilot references while using the Express API for authentication, template data, and favorites.

## Features

- Responsive marketplace with the supplied six template thumbnails
- Search, category filtering, empty states, and a Clear action
- JWT login and registration with bcrypt-hashed passwords
- Axios-powered frontend API client with bearer-token handling
- Protected Favorites route and authenticated favorite add/remove actions
- Persistent JWT, user session, and favorite state in localStorage
- Password visibility controls, validation, logout, and return-to-login redirects
- CSS depth treatment, layered device artwork, responsive cards, and mobile layouts
- Render and Vercel deployment configuration

## Stack

- Frontend: React, Vite, React Router, Axios, JavaScript, CSS, Lucide React
- Backend: Node.js, Express, Mongoose, MongoDB, JWT, bcryptjs
- Tests: Vitest, Supertest, mongodb-memory-server

```text
client/src/{components,context,data,hooks,pages,services,App.jsx,main.jsx,index.css}
server/src/{config,controllers,middleware,models,routes,utils,app.js,server.js}
```

## Local setup

Requirements: Node.js 18+ and MongoDB (local or Atlas).

Backend terminal:

```powershell
cd server
npm install
Copy-Item .env.example .env
# Set MONGODB_URI and a long random JWT_SECRET in .env
npm run seed
npm run dev
```

Frontend terminal:

```powershell
cd client
npm install
Copy-Item .env.example .env
npm run dev
```

The frontend runs at `http://localhost:5173`; the API runs at `http://localhost:5000`.

## Routes

| Path         | Purpose                                        |
| ------------ | ---------------------------------------------- |
| `/`          | Marketplace home                               |
| `/templates` | Marketplace page required by the assessment    |
| `/login`     | Login form                                     |
| `/register`  | Registration form                              |
| `/signup`    | Registration alias used by the supplied design |
| `/favorites` | Authenticated favorites page                   |

## API

Successful responses use `{ success: true, data }`; errors use `{ success: false, message }`.

| Method | Endpoint                           | Auth       | Purpose                              |
| ------ | ---------------------------------- | ---------- | ------------------------------------ |
| GET    | `/api/health`                      | No         | Health check                         |
| POST   | `/api/auth/register`               | No         | Create a user and return a JWT       |
| POST   | `/api/auth/login`                  | No         | Authenticate a user and return a JWT |
| GET    | `/api/templates?search=&category=` | No         | List and filter templates            |
| GET    | `/api/templates/:id`               | No         | Return template details              |
| GET    | `/api/favorites`                   | Bearer JWT | Return the current user's favorites  |
| POST   | `/api/favorites/:templateId`       | Bearer JWT | Add a favorite                       |
| DELETE | `/api/favorites/:templateId`       | Bearer JWT | Remove a favorite                    |

## Hosting

The repository includes `render.yaml` for the API and `client/vercel.json` for SPA routing. A typical deployment is:

1. Create a MongoDB Atlas database.
2. Deploy `server/` to Render using `render.yaml`.
3. Set `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL` in Render.
4. Deploy `client/` to Vercel.
5. Set `VITE_API_URL` to the deployed API's `/api` URL in Vercel.

Actual hosting still requires the owner's Render, Vercel, MongoDB, and GitHub accounts; no credentials are stored in this repository.

## Verification

```powershell
cd client
npm run build

cd ../server
npm test
```

The API tests use `mongodb-memory-server`, which downloads a test MongoDB binary the first time they run. If that download is blocked by a network policy, run the app against the configured local or Atlas MongoDB and rerun the checks.

## Submission

Repository target: `https://github.com/iaamraagul/SaaS_template_store`

Developer: Raagul
Contact: [Add your preferred email or LinkedIn before submission]
