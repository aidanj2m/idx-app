# Real Estate Property Listings - Next.js Frontend

A modern, responsive Next.js application for browsing real estate property listings powered by the SimplyRETS API.

## ✨ Features

- 🏠 **Property Listings** - Browse properties in a responsive grid layout
- 🔍 **Advanced Filters** - Filter by price, bedrooms, bathrooms, and property type
- 📄 **Pagination** - Navigate through property results
- 🖼️ **Property Details** - View detailed information with photo galleries
- ⚡ **Server-Side Rendering** - Optimized for SEO and performance
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🎨 **Tailwind CSS** - Modern, utility-first styling
- 📘 **TypeScript** - Full type safety throughout

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running (see [../idx-api/README.md](../idx-api/README.md))

### Installation

Dependencies are already installed! If you need to reinstall:

```bash
npm install
```

### Environment Setup

The `.env.local` file is already configured to point to your local backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

For production, update this to your deployed backend URL.

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
idx-thing/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page (property listings)
│   ├── property/[mlsId]/       # Property detail pages
│   └── globals.css             # Global styles
├── components/
│   ├── common/
│   │   ├── ErrorMessage.tsx    # Error display
│   │   ├── LoadingSpinner.tsx  # Loading indicator
│   │   └── Pagination.tsx      # Pagination controls
│   └── properties/
│       ├── PropertyCard.tsx    # Property card component
│       ├── PropertyFilters.tsx # Filter panel
│       └── PropertyGrid.tsx    # Grid layout
├── lib/
│   ├── api/
│   │   └── propertyApi.ts      # API client
│   ├── types/
│   │   └── property.ts         # TypeScript types
│   └── utils/
│       ├── constants.ts        # App constants
│       └── formatters.ts       # Utility functions
└── public/                     # Static assets
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Image Optimization**: Next.js Image component

## 📝 Usage

### Browse Properties

1. Visit the home page to see all available properties
2. Use the filter panel on the left to narrow down results:
   - Set price range (min/max)
   - Filter by number of bedrooms
   - Filter by number of bathrooms
   - Select property type (Residential, Condominium, etc.)
3. Click "Apply Filters" to update results
4. Use pagination at the bottom to navigate through pages

### View Property Details

1. Click on any property card
2. View high-resolution photos
3. See detailed property information and features
4. Use "Back to listings" to return to the main page

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variable:
   - `NEXT_PUBLIC_API_URL` = Your backend API URL
4. Deploy!

Or use the Vercel CLI:

```bash
vercel
```

## 🐛 Troubleshooting

### API Connection Issues

If you see "Failed to fetch properties":

1. Ensure the backend is running at `http://localhost:8000`
2. Check that `NEXT_PUBLIC_API_URL` in `.env.local` is correct
3. Verify CORS is properly configured in the backend

### Image Loading Issues

If property images don't load:

1. Check `next.config.ts` has the correct `remotePatterns`
2. Verify the SimplyRETS image URLs are accessible

## 📄 License

This project is part of a real estate listing application.
