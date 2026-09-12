# DroneTV AI Support & Lead Assistant

A full-stack web application for a drone services and training company. It combines a
marketing site, a rule-based AI support chatbot, an enquiry/lead capture flow, and an
admin dashboard for managing incoming leads.

Built as an internship assignment by **Amit Kumar Saini**.

> Live demo: _add deployed frontend/backend URLs here once hosted_

---

## Features

- **Landing page** with hero, about section, and calls to action
- **Services page** showcasing drone service offerings with direct enquiry links
- **Courses/Training page** listing structured training programs
- **Rule-based AI chatbot** (no external LLM) with:
  - Keyword/intent matching for services, courses, contact, registration, student and
    human-handoff queries
  - Quick-reply suggestion chips
  - Persistent conversation history for the browser session
  - A clear/reset conversation action
  - An inline enquiry form launched directly from the chat
  - Graceful fallback responses for unrecognized questions
- **Contact/Enquiry form** with client- and server-side validation and clear success/error
  feedback
- **Admin dashboard** (`/admin`) with:
  - Search by name, email, or phone
  - Filter by user type and status
  - Enquiry detail modal with status updates
  - Delete with confirmation
  - Stat cards summarizing enquiry counts by status
- Fully responsive layout (desktop, tablet, mobile) using a custom dark drone-tech theme
- Centralized error handling, input sanitization, rate limiting, and security headers on
  the API

---

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite
- React Router
- Plain CSS with CSS Modules (no UI kit)

**Backend**
- Node.js + Express + TypeScript
- MongoDB with Mongoose (MongoDB Atlas)
- express-validator for input validation
- helmet, cors, express-rate-limit, express-mongo-sanitize for security

---

## Project Structure

```
FullStack_Chatbot_Task_Amit_Saini/
├── backend/
│   ├── src/
│   │   ├── config/         # env config, MongoDB connection
│   │   ├── controllers/    # route handlers
│   │   ├── middleware/     # error handling, validation, rate limiting
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express routers
│   │   ├── seed/           # database seed script
│   │   ├── utils/          # response helpers, AppError
│   │   ├── validators/     # express-validator rule sets
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── admin/           # admin dashboard components
│   │   ├── api/             # typed API client
│   │   ├── chatbot/         # rule-based chatbot engine + UI
│   │   ├── components/      # shared UI components (Navbar, Button, Modal, etc.)
│   │   ├── pages/           # route-level pages
│   │   ├── styles/          # global CSS + theme variables
│   │   ├── types/           # shared TypeScript types
│   │   ├── utils/           # frontend validation helpers
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
├── database/
│   └── schema.md            # collection schema documentation
├── API_DOCUMENTATION.md
├── DroneTV_API.postman_collection.json
└── README.md
```

---

## Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- A MongoDB Atlas cluster (or any MongoDB connection string)

### 1. Clone and install dependencies

```bash
git clone <repository-url>
cd FullStack_Chatbot_Task_Amit_Saini

cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure environment variables

Copy the example env files and fill in real values:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

See [Environment Variables](#environment-variables) below for details.

### 3. Seed the database (optional but recommended)

```bash
cd backend
npm run seed
```

This inserts 8 sample enquiries into the `enquiries` collection.

### 4. Run the backend

```bash
cd backend
npm run dev
```

The API starts on `http://localhost:5000` by default.

### 5. Run the frontend

```bash
cd frontend
npm run dev
```

The app starts on `http://localhost:5173` by default and proxies API calls to the URL set
in `VITE_API_BASE_URL`.

### 6. Build for production

```bash
# Backend
cd backend && npm run build && npm start

# Frontend
cd frontend && npm run build && npm run preview
```

---

## Environment Variables

### backend/.env

| Variable                | Description                                             | Example                                  |
|--------------------------|----------------------------------------------------------|--------------------------------------------|
| `PORT`                   | Port the Express server listens on                        | `5000`                                     |
| `NODE_ENV`               | `development` or `production`                              | `development`                              |
| `MONGODB_URI`            | MongoDB Atlas connection string                             | `mongodb+srv://user:pass@cluster.mongodb.net/dronetv` |
| `CORS_ORIGIN`            | Comma-separated list of allowed frontend origins             | `http://localhost:5173`                    |
| `RATE_LIMIT_WINDOW_MS`   | Rate limit window in milliseconds for POST /api/enquiries    | `900000`                                   |
| `RATE_LIMIT_MAX`         | Max requests per window per IP                                | `20`                                       |

### frontend/.env

| Variable              | Description                    | Example                          |
|-----------------------|----------------------------------|-------------------------------------|
| `VITE_API_BASE_URL`   | Base URL of the backend API       | `http://localhost:5000/api`         |

---

## Database Setup

The application uses a single `enquiries` collection. Full schema documentation, field
constraints, and an example document are in [`database/schema.md`](./database/schema.md).

To populate sample data for local development or a demo, run:

```bash
cd backend
npm run seed
```

This clears the `enquiries` collection and inserts 8 realistic sample enquiries covering
all user types and statuses.

---

## API Endpoints

Full request/response examples are documented in
[`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md). A ready-to-import Postman collection is
available at [`DroneTV_API.postman_collection.json`](./DroneTV_API.postman_collection.json).

| Method | Endpoint                     | Description                                            |
|--------|-------------------------------|----------------------------------------------------------|
| GET    | `/api/health`                  | API health check                                          |
| GET    | `/api/enquiries`                | List enquiries (supports `search`, `userType`, `status`, `page`, `limit`) |
| GET    | `/api/enquiries/:id`            | Get a single enquiry by id                                 |
| POST   | `/api/enquiries`                | Create a new enquiry                                        |
| PUT    | `/api/enquiries/:id`            | Update an enquiry's details                                 |
| PATCH  | `/api/enquiries/:id/status`     | Update only an enquiry's status                              |
| DELETE | `/api/enquiries/:id`            | Delete an enquiry                                            |

---

## Security

- **Dual-side validation**: identical rules enforced in the frontend (`utils/validation.ts`)
  and backend (`validators/enquiry.validator.ts`)
- **Input sanitization**: `express-mongo-sanitize` strips MongoDB operator injection from
  all incoming request data; React escapes all rendered user content by default
- **HTTP headers**: `helmet` sets secure defaults
- **CORS whitelist**: only origins listed in `CORS_ORIGIN` are allowed
- **Rate limiting**: `POST /api/enquiries` is rate-limited per IP
- **No leaked internals**: the centralized error handler always returns a generic message
  to the client; raw errors are only logged server-side in development
- **Secrets**: all credentials live in `.env` files, which are git-ignored; only
  `.env.example` files are committed

---

## Screenshots

> Add screenshots of the following pages here before submission:

- `docs/screenshots/home.png` - Landing page
- `docs/screenshots/services.png` - Services page
- `docs/screenshots/courses.png` - Courses page
- `docs/screenshots/chatbot.png` - Chatbot in action
- `docs/screenshots/contact.png` - Enquiry form
- `docs/screenshots/admin.png` - Admin dashboard

---

## Author

**Amit Kumar Saini**
