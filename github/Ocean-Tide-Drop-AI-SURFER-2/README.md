🌊 OCEAN TIDE DROP — CINEMATIC ARCHITECTURE README

A Neon‑Surf React + Vite + Cloudflare Pages System

---

🌟 Overview
Ocean Tide Drop is a cinematic, neon‑surf web experience built with:

- React 19
- Vite
- TypeScript
- Cloudflare Pages
- Framer Motion
- Lucide Icons

The project is structured around a clean, scalable architecture designed for rapid iteration, mobile‑first workflows, and a glowing, mythic brand identity.

This README documents the full system architecture, folder structure, and development flow.

---

🏛️ Project Architecture

```
src/
  components/      → Reusable UI components + co‑located CSS
  pages/           → Page-level scenes (Pricing, Membership, etc.)
  layouts/         → Global wrappers (Nav, Dock, HUD)
  styles/          → Global CSS (variables, animations, themes)
  utils/           → Pure helper functions
  hooks/           → Custom React hooks
  data/            → Product tiers, navigation, constants
  router.tsx       → Central routing map
  App.jsx          → App shell
  main.jsx         → Vite entry point
```

This structure keeps your UI modular, your logic clean, and your brand consistent.

---

🎨 Components
All reusable UI lives in:

```
src/components/
```

Each component has a matching CSS file:

```
ProductCard.tsx
product-card.css
NavBar.jsx
neon-dock.css
Sidebar.tsx
sidebar.css
HUD.tsx
hud.css
```

This ensures:

- clean separation  
- predictable imports  
- cinematic styling per component  

---

📄 Pages
Pages are scenes in your cinematic universe.

```
src/pages/
  pricing/
    Pricing.tsx
    PricingDetail.tsx
    pricing.css
  membership/
    MembershipIndex.tsx
    membership.css
  home/
    Home.jsx
```

Each page can have its own CSS, animations, and layout.

---

🧩 Layouts
Layouts wrap pages with global UI:

```
src/layouts/
  Layout.tsx
  AuthLayout.tsx
  GameLayout.tsx
```

These handle:

- Navigation  
- Neon Dock  
- HUD  
- Soundscape  
- Auth gates  

---

🧠 Data Layer
Centralized product + tier data:

```
src/data/
  products.ts
  tiers.ts
  navigation.ts
```

This keeps your pricing system clean and maintainable.

---

🎛️ Styles
Global styling lives here:

```
src/styles/
  index.css
  variables.css
  animations.css
  themes.css
```

This is where your neon‑ocean glow, cosmic gradients, and waterline animations live.

---

🧭 Routing
All routes are defined in:

```
src/router.tsx
```

This keeps navigation clean and centralized.

---

🌊 Surf Tier System
Your 4‑tier cinematic pricing system:

- Dawn Patrol — Entry tier  
- Breakline — Mid‑tier  
- Hatteras Island — High‑touch tier  
- Cape Point — Founder‑level tier  

Each tier has:

- a ProductCard  
- a PricingDetail page  
- a narrative  
- a feature set  
- a cinematic image  

---

🚀 Development

Install dependencies
```
npm install
```

Run dev server
```
npm run dev
```

Build for production
```
npm run build
```

Deploy (Cloudflare Pages)
Push to your connected GitHub repo — Cloudflare builds automatically.

---

🔥 Brand Identity
Ocean Tide Drop is built on:

- neon cyan + neon pink glow  
- cinematic gradients  
- surf‑energy motion  
- mythic storytelling  
- AI‑driven content systems  

Every component and page reflects this identity.

---

🐚 Credits
Created by Shannon Foster
Architected with cinematic precision  
Powered by React, Vite, and Cloudflare Workers

---
