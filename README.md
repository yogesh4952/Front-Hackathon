# Front Hackathon

A React + Vite frontend for a hackathon platform. The app includes routing, protected pages, a dashboard-like layout, and TailwindCSS styling.

## Features

- React 18 with Vite build tooling
- React Router DOM v7 navigation and route protection
- TailwindCSS v4 styling
- Toast notifications using `react-toastify`
- Framer Motion animations
- Responsive hackathon and project pages

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

- `src/` - application source code
- `src/main.jsx` - app entry point
- `src/App.jsx` - routing and page layout
- `src/pages/` - page components
- `src/components/` - reusable UI components
- `src/context/` - app state provider

## Notes

- The project root now uses `react-router-dom` only.
- `react-router` has been removed to avoid unused dependency issues.
- If you see a blank white screen, verify the browser console for runtime errors and make sure `npm install` was run.
