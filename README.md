# NOIR ATELIER — AI Automotive Build Studio

A premium, high-end React web application for bespoke automotive styling with an AI-powered build concierge.

## Tech Stack

- **Frontend**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4 (custom noir luxury theme)
- **Backend**: Node.js (zero dependencies, native HTTP)
- **AI**: Supports Google Gemini, OpenAI, or any OpenAI-compatible API

## Features

- 🎨 **Noir luxury design** with glassmorphism, noise textures, and gradient accents
- ✨ **Premium animations**: canvas particles with shooting stars, 3D card tilt, parallax car SVG, scroll reveals
- 🖱️ **Magnetic cursor glow** that follows mouse movement
- 🏎️ **SVG car illustration** with spinning wheels, headlight beam, and road animation
- 📊 **Animated stat counters** (intersection observer triggered)
- 🤖 **AI Build Concierge**: form → structured modification plan (live AI or demo fallback)
- 📱 **Fully responsive** with mobile hamburger menu
- ♿ **Accessible**: ARIA labels, keyboard navigation, reduced motion support
- 📋 **Copy to clipboard**: plans and enquiries

## Quick Start

```bash
# Install dependencies
cd noir-atelier-app
npm install

# Start frontend dev server (port 5173)
npm run dev

# Start backend API server (port 3001) — in another terminal
npm run server
```

## AI Configuration

Set one of these environment variables before starting the backend:

```bash
# Google Gemini (recommended)
GEMINI_API_KEY=your-key-here npm run server

# OpenAI
OPENAI_API_KEY=sk-xxx npm run server

# Custom OpenAI-compatible API
AI_API_URL=https://your-api.com/v1/chat/completions AI_API_KEY=xxx npm run server
```

Without an API key, the AI Concierge falls back to a demo plan generator.

## Project Structure

```
noir-atelier-app/
├── server/
│   └── index.js          # Node.js backend (AI API proxy)
├── src/
│   ├── components/
│   │   ├── Header.jsx    # Fixed nav with scroll effect
│   │   ├── Hero.jsx      # Canvas particles + car SVG
│   │   ├── Approach.jsx  # Philosophy section
│   │   ├── Expertise.jsx # Services + animated counters
│   │   ├── Builds.jsx    # Gallery with filter chips
│   │   ├── Concierge.jsx # AI form + plan generation
│   │   ├── PlanResult.jsx# Structured plan display
│   │   ├── Contact.jsx   # Enquiry form
│   │   ├── Footer.jsx    # Footer with links
│   │   ├── CarSvg.jsx    # SVG car definitions
│   │   └── ProgressBar.jsx# Scroll progress indicator
│   ├── hooks/
│   │   └── useReveal.js  # Scroll reveal animation hook
│   ├── data/
│   │   └── constants.js  # Build data, expertise items, config
│   ├── utils/
│   │   └── planUtils.js  # Plan generation, formatting, export
│   ├── App.jsx           # Root with cursor glow
│   ├── main.jsx          # React entry point
│   └── index.css         # Tailwind + custom animations
├── index.html
├── vite.config.js
└── package.json
```

## Design Highlights

- **Color palette**: Ink black (#0b0a09), Bronze (#c2a068), Ivory (#efe8da)
- **Typography**: Cormorant Garamond (serif, italic) + Hanken Grotesk (sans)
- **Glassmorphism**: Backdrop blur panels with subtle bronze borders
- **Micro-interactions**: Button shimmer, card tilt, link underline, glow hover

---

*NOIR ATELIER is a fictional concept studio. All data is illustrative.*
