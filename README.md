# SDPJSS Web Application

SDPJSS is a full-stack application for managing community members, families,
donations, receipts, notices, teams, advertisements, job openings, staff
requirements, refunds, printing, and administrative access.

The repository contains three independently managed Node.js projects:

| Project | Purpose | Local URL |
| --- | --- | --- |
| `frontend` | Public website and authenticated user portal | `http://localhost:5173` |
| `admin` | Back-office administration portal | `http://localhost:5174` |
| `backend` | Express REST API and integrations | `http://localhost:4000` |

## Technology Stack

- React 18, Vite, React Router, and Tailwind CSS
- Node.js and Express
- MongoDB with Mongoose
- JWT access and refresh-token authentication
- Cloudinary for uploaded media
- Razorpay for online payments
- Nodemailer for email delivery
- Google reCAPTCHA

## Main Features

### Public and user portal

- Public information, team, contact, notices, jobs, and staff requirements
- User registration, login, OTP, password recovery, and profile management
- Family-member management
- Donation entry, online payment, receipt download, and printing
- User-submitted advertisements, job openings, and staff requirements

### Administration portal

- Role-based admin and superadmin access
- Dashboard and reporting
- User, family, guest, team, notice, and feature management
- Registered and guest donation processing
- Donation categories, refunds, receipts, courier labels, and printing
- Administrative task lists

## Repository Structure

```text
.
├── admin/       # React back-office application
├── backend/     # Express API, models, controllers, middleware, and services
└── frontend/    # React public website and user portal
```

Each project has its own `package.json`, dependencies, and `.env` file. Run npm
commands from the relevant project directory.

## Prerequisites

- Node.js `20.19+` or `22.12+`
- npm
- A MongoDB deployment accessible from the development machine
- Test credentials for Cloudinary, Razorpay, reCAPTCHA, and email features that
  need to be exercised locally

Use test/sandbox service credentials for local development. Never use production
secrets on a developer workstation unless explicitly required and authorized.

## Local Setup

### 1. Clone and install dependencies

```bash
git clone <repository-url>
cd SDPJSS-host-1

cd backend
npm ci

cd ../frontend
npm ci

cd ../admin
npm ci
```

If a lockfile was intentionally changed, use `npm install` in that project and
commit the resulting `package-lock.json` with the dependency change.

### 2. Configure environment variables

Create these untracked files:

```text
backend/.env
frontend/.env
admin/.env
```

The `.env` files are ignored by Git. Do not commit them, paste their contents
into tickets, or add real credentials to documentation.

#### `backend/.env`

```dotenv
# Server and database
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>
ALLOWED_CORS_ORIGINS=http://localhost:5173,http://localhost:5174

# Authentication
JWT_SECRET=<long-random-access-token-secret>
REFRESH_SECRET=<different-long-random-refresh-token-secret>
ADMIN_EMAIL=<local-superadmin-email>
ADMIN_PASSWORD=<strong-local-superadmin-password>

# Cloudinary
CLOUDINARY_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_SECRET_KEY=<api-secret>

# Razorpay and reCAPTCHA
RAZORPAY_KEY_ID=<test-key-id>
RAZORPAY_KEY_SECRET=<test-key-secret>
CURRENCY=INR
RECAPTCHA_SECRET_KEY=<secret-key>

# Transactional email pool (comma-separated, matching list lengths)
EMAIL_USERS=<sender-one@example.com>,<sender-two@example.com>
EMAIL_PASSWORDS=<app-password-one>,<app-password-two>
EMAIL_FROM_NAME=SDPJSS
EMAIL_REPLY_TO=<reply-to@example.com>

# Contact form and legacy email flows
EMAIL_USER=<contact-sender@example.com>
EMAIL_PASSWORD=<email-app-password>
```

`MONGODB_URI` is the connection URI without the database name; the backend
appends `/sdpjss`. `EMAIL_USERS` and `EMAIL_PASSWORDS` are required at startup
and must contain the same number of comma-separated entries.

#### `frontend/.env`

```dotenv
VITE_APP_ENV=test
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=<test-public-key-id>
VITE_RECAPTCHA_SITE_KEY=<site-key>
VITE_SHOW_PRASAD_TOKEN_DOWNLOAD_BUTTON=false
VITE_MAHA_PRASAD_COLLECTION_DATE=<display-date>
VITE_MAHA_PRASAD_COLLECTION_TIME=<display-time>
VITE_MAHA_PRASAD_COLLECTION_LOCATION=<display-location>
```

#### `admin/.env`

```dotenv
VITE_APP_ENV=test
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=<test-public-key-id>
VITE_RECAPTCHA_SITE_KEY=<site-key>
VITE_MAHA_PRASAD_COLLECTION_DATE=<display-date>
VITE_MAHA_PRASAD_COLLECTION_TIME=<display-time>
VITE_MAHA_PRASAD_COLLECTION_LOCATION=<display-location>
```

All `VITE_*` variables are bundled into browser code and must be treated as
public. Never place private API secrets or server credentials in them.

`VITE_APP_ENV=test` displays a prominent `TEST` banner in both web applications.
For a live build, set it to `live` or leave it unset.

### 3. Start the applications

Open three terminals and start the backend first.

Terminal 1:

```bash
cd backend
npm run server
```

Terminal 2:

```bash
cd frontend
npm run dev
```

Terminal 3:

```bash
cd admin
npm run dev
```

Confirm that the API is available:

```bash
curl http://localhost:4000/
```

The expected response is `API WORKING`.

## Available Commands

Run commands inside `frontend`, `admin`, or `backend` as applicable.

| Command | Frontend/Admin | Backend |
| --- | --- | --- |
| `npm run dev` | Start the Vite development server | — |
| `npm run server` | — | Start with Nodemon and reload on changes |
| `npm start` | — | Start with Node.js |
| `npm run build` | Create a production build in `dist/` | — |
| `npm run preview` | Preview the production build | — |
| `npm run lint` | Run ESLint | Run ESLint |
| `npm run lint:fix` | — | Apply safe ESLint fixes |

Automated backend tests are not currently configured; the existing `npm test`
script is only a placeholder.

## API Overview

The backend exposes the following route groups:

| Prefix | Responsibility |
| --- | --- |
| `/api/user` | Authentication, profiles, donations, and user submissions |
| `/api/admin` | Admin authentication and administrative operations |
| `/api/khandan` | Family-group operations |
| `/api/c` | Public/common endpoints such as contact and notices |
| `/api/additional` | Guest users, guest donations, and related operations |
| `/api/todopages` | Administrative task pages |

Protected requests use JWTs supplied by the relevant web application. Do not
disable authentication middleware to simplify local testing.

## Development Workflow

Before opening a pull request:

```bash
cd frontend && npm run lint && npm run build
cd ../admin && npm run lint && npm run build
cd ../backend && npm run lint
```

Also smoke-test any affected registration, authentication, payment, receipt,
printing, email, upload, and role-based access flows.

## Troubleshooting

### Browser request blocked by CORS

Ensure `ALLOWED_CORS_ORIGINS` includes both local web origins exactly, then
restart the backend.

### Environment-variable changes are not reflected

Restart the affected Vite or backend process. Vite reads `.env` values when the
development server starts.

### Database connection fails

Check the MongoDB URI, network access list, credentials, and whether the URI
already includes a database path. This application appends `/sdpjss` itself.

### Email initialization or delivery fails

Confirm that the email lists have matching lengths and use provider-approved app
passwords. Avoid normal account passwords.

### Online payment or reCAPTCHA fails

Confirm that frontend public keys and backend secret keys belong to the same
test environment and that localhost is permitted in the provider configuration.

## Security

- Never commit `.env` files, credentials, access tokens, database URIs, or API
  secrets.
- Keep frontend public keys separate from backend secret keys.
- Use different JWT access and refresh secrets.
- Use sandbox accounts for local payments and third-party integrations.
- If a secret is committed, revoke or rotate it immediately; deleting it in a
  later commit does not remove it from Git history.

## Deployment Notes

- Configure environment variables in the hosting platform rather than committing
  `.env` files.
- Restrict `ALLOWED_CORS_ORIGINS` to deployed frontend and admin origins.
- Use `VITE_APP_ENV=test` only for test deployments.
- Run frontend and admin builds with `npm run build` and serve their `dist/`
  directories.
- Run the backend with `npm start` under a supervised process or hosting service.
