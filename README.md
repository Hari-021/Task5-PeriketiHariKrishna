# ⚡ Periketi Hari Krishna |  Portfolio Website

A premium, recruiter-friendly personal portfolio website designed for **Periketi Hari Krishna** (AI & Machine Learning Engineer & Full Stack Developer) built with a minimal white-first aesthetic, elegant typography, smooth scrolling, and an interactive 3D WebGL hero illustration.

---

## 🎨 Design Philosophy & Tokens

*   **Backgrounds**: Pure White (`#FFFFFF`) / Light Gray (`#F8FAFC`, `#F5F7FA`)
*   **Typography**:
    *   *Headings*: **Space Grotesk** (large, bold, spacious)
    *   *Body*: **Inter** (clean, readable sans-serif)
    *   *Buttons*: **Manrope** (modern geometric)
    *   *Stats/Numbers*: **JetBrains Mono** (monospace clarity)
*   **Accents**: Blue (`#2563EB`) and Purple (`#7C3AED`) gradients

---

## ✨ Features

### 💻 3D Interactive Hero
A WebGL canvas powered by raw **Three.js** that responds to mouse cursor movements. Features:
*   A glowing central AI point-cloud cluster representing a neural brain.
*   Drifting physical glass-transmission cubes that tilt and track.
*   Floating vector-rendered technology cards (React & Python).
*   Dynamic particle stars and custom directional/point lighting.

### 📈 Animated Counters & Timelines
*   **About Me**: Focus areas and career objective columns paired with numeric statistics (projects count, REST APIs) that count up smoothly using intersection observers once scrolled into view.
*   **Experience timeline**: A vertical layout showcasing the chronological progression throughout the **Decode Labs** Full Stack Internship.

### 📚 Deep-Dive Case Study Pages
Supports comprehensive case study pages for all 4 Decode Labs projects. Includes:
*   Objectives & Detailed Problem Statements.
*   **System Architecture Diagrams**: Linear layouts showing data flow steps.
*   **Simulated CLI Staging Terminals**: Terminal-like output containers showing compilation, system statuses, and server checks.
*   Granular challenges, solutions, and key metrics.

### 🐙 Simulated GitHub activity Log
*   An interactive simulated contribution calendar mimicking user contribution grids (commits list) by days and weeks with commit counts visible on cell hovers.
*   Language usage bar showing codebase percentages (TypeScript, Python, JavaScript).

---

## 🛠️ Tech Stack

*   **Frontend Core**: React 19, TypeScript, Vite, Tailwind CSS
*   **3D Graphics**: Three.js (WebGL rendering context)
*   **Animations**: Framer Motion (Transitions, scroll-reveals, fade-ins)
*   **Iconography**: Lucide React + custom SVG Brand Components
*   **Back-End Models (Case Studies)**: Supabase Cloud, Python FastAPI, Node.js/Express
*   **Databases (Case Studies)**: MongoDB, SQLite, SQLAlchemy

---

## 🚀 Getting Started

### Prerequisites

*   **Node.js**: `v18.0.0` or higher
*   **npm**: `v9.0.0` or higher

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/periketiharikrishna/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Launch local development server**:
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

4.  **Create production build**:
    ```bash
    npm run build
    ```
    Static compile folders will output in `/dist`.

---

## 📂 Directory Layout

```text
portfolio/
├── dist/                  # Compiled production build output
├── public/                # Static assets (favicons, manifest)
├── src/
│   ├── assets/            # Vector media assets
│   ├── components/        # Visual components
│   │   ├── About.tsx      # Biography & stats
│   │   ├── BrandIcons.tsx # Custom GitHub/LinkedIn SVGs
│   │   ├── CaseStudy.tsx  # Dynamic project case study pages
│   │   ├── Contact.tsx    # Validated contact form
│   │   ├── Experience.tsx # Vertical timeline
│   │   ├── Footer.tsx     # Dark minimal footer
│   │   ├── Github.tsx     # Commit logs calendar widget
│   │   ├── Hero.tsx       # Three.js 3D WebGL scene
│   │   ├── Navbar.tsx     # Sticky scroll-blur header
│   │   ├── Projects.tsx   # Project cards grid
│   │   └── Skills.tsx     # Skills progress cards
│   ├── data/
│   │   └── projectsData.ts# JSON metadata & text records
│   ├── App.tsx            # Main router and loader setup
│   ├── index.css          # Tailwind configurations & scroll bars
│   └── main.tsx           # Dom element mounting
├── tailwind.config.js     # Design tokens and fonts extensions
├── postcss.config.js      # PostCSS configurations
└── tsconfig.json          # TypeScript compilation settings
```
