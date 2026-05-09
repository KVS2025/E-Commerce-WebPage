# SuperSimple E-Commerce Platform

A responsive e-commerce app built with React, Vite, and Express. It includes product browsing, cart management, checkout, order history, and order tracking.

## Features

- Product grid with ratings and pricing
- Search filtering on the home page
- Cart add, update, and delete flows
- Checkout with delivery options and payment summary
- Orders page and tracking page

## Tech Stack

- React 19
- Vite
- Express
- Axios
- React Router
- Day.js

## Project Structure

- `src/` - React frontend
- `server.js` - Express API server
- `data/` - JSON files used by the backend
- `public/` - Static assets

## Run Locally

Open two terminals in `ecommerce-project`:

```bash
npm run dev
```

```bash
npm run backend
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start the Vite frontend
- `npm run backend` - Start the Express API server
- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the Vite build
- `npm run lint` - Run ESLint

## Notes

- The backend reads and writes JSON files from `data/`
- If the backend is not running, product and cart requests will fail
- Keep `node_modules/` out of version control
