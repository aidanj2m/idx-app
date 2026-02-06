# TexasRealty - Frontend

Next.js 16 real estate search application with interactive Mapbox maps, property filtering, and a dark theme with gold accents.

## Tech Stack

- **Framework:** Next.js 16, React 19, TypeScript 5
- **Styling:** Tailwind CSS 4, Geist font
- **Maps:** Mapbox GL 3.18, react-map-gl 8.1
- **HTTP:** Axios
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Mapbox access token ([mapbox.com](https://account.mapbox.com/access-tokens/))
- Backend API running (see [../idx-api/README.md](../idx-api/README.md))

### Setup

```bash
cd idx-thing
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://idx-api-tau.vercel.app/api
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

### Development

```bash
npm run dev       # http://localhost:3000
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint
```

## Routes

| Route | Description |
|---|---|
| `/` | Landing page with hero search and featured properties |
| `/search` | Interactive map + sidebar property search with filters |
| `/property/[mlsId]` | Server-rendered property detail page |

## Features

- **Map Search:** Interactive Mapbox map with price pill pins rendered as native WebGL symbol layers (locked to coordinates during zoom/pan)
- **Filters:** Price range, beds, baths, property type synced via URL search params
- **Sidebar:** Scrollable property cards with hover state synced to map pins
- **Property Detail:** Photo gallery, key facts grid, home details, embedded location map
- **Dark Theme:** Black/zinc backgrounds with gold (#D4AF37) accents
- **Map Styles:** Toggle between dark streets and satellite views

## Project Structure

```
app/
  layout.tsx                    # Root layout with Navbar
  page.tsx                      # Homepage with hero search
  globals.css                   # Global styles, theme colors
  search/page.tsx               # Map-based search (client)
  property/[mlsId]/page.tsx     # Property detail (server)
components/
  layout/Navbar.tsx
  home/                         # HeroSearch, FeaturedProperties, FilterBar
  search/                       # MapView, PropertySidebar, PropertyPopup, MapStyleToggle
  property/                     # PropertyInfo, PropertyMap
  common/                       # LoadingSpinner, ErrorMessage, Pagination
lib/
  api/propertyApi.ts            # Axios API client with interceptors
  types/property.ts             # TypeScript interfaces
  utils/
    formatters.ts               # Price, number, date formatting
    constants.ts                # Property types, API config
    searchParams.ts             # URL param <-> filter conversion
```

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox GL access token |

## Deployment

```bash
vercel
```

Set environment variables in the Vercel dashboard. The production app is at `https://idx-thing.vercel.app`.
