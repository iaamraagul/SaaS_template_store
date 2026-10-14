# Full Stack Web Developer Intern - Technical Task

**Document version:** 26.10.01  
**Assignment duration:** 2 days (48 hours) from the time the assignment is shared.  
**Project task:** Mini SaaS Template Store

## Instructions for Codex

Use this document as the implementation specification for the **Mini SaaS Template Store** assessment. Implement the required full-stack application and use the checklist near the end to verify coverage before considering the work complete.

- Treat the requirements in **Assessment Specification (transcribed from the PDF)** as the source of truth.
- Required features and optional bonus features are separated. Do not treat bonus features as mandatory.
- Preserve the specified page paths, API routes, template fields, repository name, folder names, and evaluation criteria.
- Select a compatible combination from the technology options in the source specification. The source does not require every listed alternative to be used.
- Where the source does not specify implementation details, make a small, sensible implementation choice and document it in the project README rather than presenting it as a requirement from the PDF.
- Do not invent the user's name or contact information for the README; leave clear placeholders for these values if they have not been supplied.

---

# Assessment Specification (transcribed from the PDF)

## 1. Technical Task

**FULL STACK WEB DEVELOPER INTERN - TECHNICAL TASK**

**DURATION:** 2 days (48 hours) from the time the assignment is shared.

## 2. Tech Stack

- **Frontend:** React.js (Vite or CRA), TailwindCSS (optional but preferred)
- **Backend:** Node.js + Express.js
- **Database:** SQLite / PostgreSQL / MongoDB (any one you prefer)
- **ORM / Query Builder:** Knex.js or Mongoose
- **Version Control:** Git (Push your work to a public GitHub repo)

## 3. Project Task - "Mini SaaS Template Store"

Build a small full-stack web app that allows users to:

1. Register & Login
2. View a list of available templates
3. Mark templates as "Favorite"
4. See their favorited templates in a "My Favorites" section

## 4. Backend Requirements (Node.js + Express)

### 4.1 Authentication

- Implement basic user registration and login.
- Use JWT-based authentication.
- Hash passwords before storing (e.g., bcrypt).

### 4.2 Templates API

Create a table/collection for templates with the following fields:

- `id`
- `name`
- `description`
- `thumbnail_url`
- `category`

Implement these routes:

| Method | Route | Requirement |
|---|---|---|
| `GET` | `/api/templates` | List all templates |
| `GET` | `/api/templates/:id` | Get template details |
| `POST` | `/api/favorites/:templateId` | Add to favorites (authenticated) |
| `GET` | `/api/favorites` | Get all favorited templates for logged-in user |

### 4.3 Database

- Seed at least **5 sample templates**.

### 4.4 Validation & Error Handling

- Validate inputs for registration & login.
- Use proper status codes and JSON responses.

## 5. Frontend Requirements (React.js)

### 5.1 Pages

Implement these pages at the specified paths:

| Path | Page |
|---|---|
| `/register` | User Registration Form |
| `/login` | User Login Form |
| `/templates` | List of all templates |
| `/favorites` | List of user's favorited templates |

### 5.2 Functionality

- After login, store JWT in local storage.
- Use Axios to call your backend APIs.
- Show template cards with a "Favorite" button.
- Mark templates that are already favorited.
- Handle auth redirects (only logged-in users can see favorites).

### 5.3 UI

- Clean and responsive (Tailwind preferred).
- Display template cards with image, title, and description.

## 6. Bonus (Optional, for Extra Points)

These items are optional:

- Add Search or Filter by Category on templates page.
- Add Logout button and protected routes.
- Deploy backend on Render / Vercel, and frontend on Vercel / Netlify.

## 7. Submission Guidelines

1. Create a **public GitHub repository** named `fullstack-intern-task`.
2. Include a `README.md` with:
   - Setup instructions (how to run backend & frontend)
   - Tech stack used
   - Your name & contact info
3. Push both `client/` and `server/` folders to the same repo.
4. Submit the GitHub repo link.

## 8. Evaluation Criteria

| Area | Description | Weight |
|---|---|---:|
| Code Structure | Clean, modular, well-organized backend & frontend | 25% |
| Functionality | Meets all required features | 25% |
| UI & UX | Clean, responsive, and user-friendly design | 20% |
| API Integration | Smooth frontend-backend communication | 20% |
| Bonus Features | Filters, deployment, extra creativity | 10% |

---

# Codex Completion Checklist

Use this checklist to verify the implementation against the assessment. The required checklist reflects the PDF; optional work is kept separate.

## Required functionality

- [ ] User registration is implemented.
- [ ] User login is implemented.
- [ ] Passwords are hashed before they are stored.
- [ ] Authentication is JWT-based.
- [ ] Registration and login inputs are validated.
- [ ] API error responses use appropriate HTTP status codes and JSON.
- [ ] A templates data table/collection contains `id`, `name`, `description`, `thumbnail_url`, and `category`.
- [ ] At least five sample templates are seeded.
- [ ] `GET /api/templates` lists all templates.
- [ ] `GET /api/templates/:id` returns template details.
- [ ] `POST /api/favorites/:templateId` adds a template to favorites and requires authentication.
- [ ] `GET /api/favorites` returns the logged-in user's favorited templates.
- [ ] `/register` displays the registration form.
- [ ] `/login` displays the login form.
- [ ] `/templates` lists all templates.
- [ ] `/favorites` lists the logged-in user's favorited templates.
- [ ] The frontend stores the JWT in local storage after login.
- [ ] Axios is used for frontend-to-backend API requests.
- [ ] Template cards display an image, title, and description.
- [ ] Template cards include a "Favorite" button.
- [ ] Templates that are already favorited are marked as such.
- [ ] Authentication redirects prevent logged-out users from viewing favorites.
- [ ] The UI is clean and responsive.
- [ ] The repository contains both `client/` and `server/` folders.
- [ ] The public GitHub repository is named `fullstack-intern-task`.
- [ ] `README.md` explains how to run the backend and frontend, lists the tech stack, and contains the developer's name and contact information.
- [ ] The GitHub repository link is ready for submission.

## Optional bonus checklist

- [ ] Add search or category filtering on the templates page.
- [ ] Add a logout button.
- [ ] Add protected routes.
- [ ] Optionally deploy the backend on Render or Vercel.
- [ ] Optionally deploy the frontend on Vercel or Netlify.

## Implementation details not specified by the PDF

The following choices are not prescribed in the source document. Make reasonable implementation decisions as needed, and do not describe them as explicit assessment requirements:

- Exact registration and login API route paths and request/response schemas.
- Exact validation rules beyond validating registration and login inputs.
- Exact database schema for users and favorites, apart from the template fields listed above.
- Exact visual design, color palette, and template content/images.
- Whether favorites can be removed, and any route for removing them. The PDF explicitly specifies adding a favorite and retrieving a user's favorites, but does not specify a removal route.
- Testing framework, deployment configuration details, and environment-variable names.

