# Vercel Deployment Guide

This project is currently set up for local development with:

- `npm run dev` for the Vite frontend
- `npm run backend` for the Express API

Vercel can host the frontend, but it cannot run the current Express `server.js` as-is. For a full production deployment, you need either:

1. A separate backend host for `server.js`, or
2. A conversion of the API into Vercel Serverless Functions

## Recommended Setup

### Frontend: Vercel

1. Push the repository to GitHub.
2. In Vercel, import the repository.
3. Set the framework to **Vite**.
4. Use these build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Deploy the frontend.

### Backend: Separate Host

Deploy `server.js` to a service that supports long-running Node servers, such as:

- Render
- Railway
- Fly.io
- A VPS

Then update the frontend API URLs to point to that backend host.

## Environment Variables

If you separate the frontend and backend, add an environment variable for the API base URL in Vercel, such as:

```bash
VITE_API_URL=https://your-backend-domain.com
```

## Local Development

Use these commands while developing locally:

```bash
npm run dev
npm run backend
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Notes

- The backend reads and writes JSON files from `data/`.
- That file-based storage is fine for local development, but it is not a durable production database.
- For a real production app, replace the JSON file storage with a database.

## If You Want Vercel Only

To run everything on Vercel, the backend must be rewritten as serverless functions under an `api/` folder. That is a different deployment model from the current Express server.
