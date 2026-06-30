export interface Challenge {
  title: string;
  problem: string;
  solution: string;
}

export interface TechCategory {
  category: string;
  techs: string[];
}

export interface FeatureDetail {
  title: string;
  desc: string;
}

export interface CaseStudyData {
  heroBannerBg: string;
  problem: string;
  objectives: string[];
  role: string;
  architectureText: string;
  architectureSteps: string[];
  techStack: TechCategory[];
  features: FeatureDetail[];
  implementation: string;
  challenges: Challenge[];
  results: string[];
  skillsLearned: string[];
  futureEnhancements: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
  features: string[];
  caseStudy: CaseStudyData;
}

export const projectsData: Project[] = [
  {
    id: "nexus-university",
    title: "Nexus University",
    subtitle: "Smart Campus Digital Twin Command Center",
    category: "3D Smart Campus Platform",
    description: "A state-of-the-art interactive 3D digital twin platform representing a university campus, integrating real-time dashboards, IoT occupancy data, and an AI chat assistant to streamline student and faculty operations.",
    tech: ["React", "Three.js", "Tailwind CSS", "Framer Motion", "FastAPI", "WebSockets"],
    github: "https://github.com/periketiharikrishna/nexus-university-3d",
    demo: "https://nexus-university-command.vercel.app",
    image: "⚡",
    features: ["3D Digital Twin", "AI Assistant", "Analytics Dashboard", "Student & Faculty Portals", "Occupancy Monitoring"],
    caseStudy: {
      heroBannerBg: "from-blue-500 to-indigo-600",
      problem: "Traditional university campuses rely on isolated software portals for scheduling, facility management, navigation, and IoT occupancy tracking. Students struggle to find open study spaces or locate rooms, while administrators lack a unified real-time tool to monitor facilities and balance occupant loads.",
      objectives: [
        "Construct an interactive, web-based 3D digital twin of the campus using Three.js.",
        "Provide unified dashboard panels showing real-time occupancy updates via WebSocket streams.",
        "Embed an AI Assistant capable of answering campus logistical questions and directing users to open facilities."
      ],
      role: "Lead Full Stack Developer & 3D WebGL Engineer (Decode Labs Internship)",
      architectureText: "The system uses a React SPA frontend rendering an interactive 3D WebGL scene loaded from low-poly CAD geometries. Real-time updates are driven by a FastAPI gateway transmitting simulated IoT occupancy events over WebSockets. Database triggers automatically log historical data into SQLite for long-term predictive analysis.",
      architectureSteps: [
        "Vite + React loads custom GLTF campus maps and renders them using a specialized WebGL context.",
        "FastAPI routes real-time telemetry from simulate-sensors to the client dashboard using WebSocket streams.",
        "SQLite databases log occupancy history using SQLAlchemy ORM.",
        "OpenAI API endpoints integrated in backend respond to campus inquiries via vector-embedded documents."
      ],
      techStack: [
        { category: "Frontend", techs: ["React", "Three.js", "Tailwind CSS", "Framer Motion", "Vite"] },
        { category: "Backend & API", techs: ["Python FastAPI", "WebSockets", "SQLAlchemy", "Uvicorn"] },
        { category: "Databases & AI", techs: ["SQLite", "OpenAI API", "Vector Embeddings"] }
      ],
      features: [
        { title: "3D Digital Twin Navigation", desc: "Interactive orbit controls allowing users to zoom into classrooms, view live room occupancy levels, and highlight shortest paths." },
        { title: "IoT Occupancy Tracking", desc: "Sensors transmit live room data, dynamically changing classroom colors in 3D (Green for empty, Red for full)." },
        { title: "Academic AI Assistant", desc: "An embedded chat window offering automated scheduling updates, room finders, and administrative responses." },
        { title: "Multi-Role Dashboards", desc: "Tailored viewpoints for students (study room bookings) and faculty (classroom occupancy metrics and facility reports)." }
      ],
      implementation: "During the Decode Labs internship, the initial challenge was optimizing a CAD model of the university. I rebuilt key structures in Blender, exporting low-poly GLTF models. On the React side, a custom loader caching system was established using Three.js's LoadingManager, avoiding freeze frames during initial rendering. Custom shaders were written to color-code buildings dynamically based on live occupancy data.",
      challenges: [
        {
          title: "High Render Latency on Mobile Web",
          problem: "The initial 3D models were heavy (65MB+), causing visual stutters and crashing browsers on mobile devices.",
          solution: "Optimized all geometries in Blender to use instanced meshes for repetitive structures (trees, windows) and downscaled textures to 1K, reducing bundle size to 3.8MB. Implemented frustum culling to skip rendering off-screen elements."
        },
        {
          title: "Real-time WebSocket Synchronization",
          problem: "Handling dozens of concurrent sensor mock connections flooded the React rendering cycle, causing lag spikes.",
          solution: "Implemented a throttled updates manager in the React state. Incoming WebSocket events are aggregated in a buffer and flushed every 500ms instead of trigger-updating on every packet."
        }
      ],
      results: [
        "Achieved a consistent 60 FPS rendering rate on modern mobile devices.",
        "Reduced campus room search query duration by 70% using the integrated AI assistant.",
        "Successfully simulated and visualized 120+ concurrent classroom sensors in real-time."
      ],
      skillsLearned: ["WebGL optimization", "3D asset loading pipelines", "FastAPI WebSocket management", "Framer Motion state orchestration"],
      futureEnhancements: ["Integrate outdoor GPS pathfinding for live navigation between buildings.", "Connect actual hardware PIR occupancy sensors via an AWS IoT Core gateway.", "Add VR support via WebXR API for virtual campus walkthroughs."]
    }
  },
  {
    id: "subtracker-3d",
    title: "SubTracker 3D",
    subtitle: "FinTech SaaS Subscription Platform",
    category: "FinTech SaaS Platform",
    description: "An elegant personal finance SaaS dashboard featuring interactive 3D visualizations, automatic billing notifications, hybrid database synchronization, and secure session credentials to prevent subscription bloat.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Three.js", "Tailwind CSS"],
    github: "https://github.com/periketiharikrishna/subtracker-3d",
    demo: "https://subtracker-3d.vercel.app",
    image: "💳",
    features: ["Interactive 3D Charts", "Automated Billing Alert", "Secure JWT Session", "Hybrid Analytics", "Multi-Currency Convert"],
    caseStudy: {
      heroBannerBg: "from-purple-500 to-indigo-600",
      problem: "The average consumer spends hundreds of dollars on forgotten software subscriptions. Existing subscription trackers are simple spreadsheets lacking analytical visualization, currency conversions, and intelligent notifications before credit cards are auto-debited.",
      objectives: [
        "Build a clean financial SaaS portal using a premium white theme resembling Stripe and Linear.",
        "Render dynamic 3D charts displaying monthly spend trends by category.",
        "Create secure user accounts with token authentication and cloud-hosted subscription history."
      ],
      role: "Lead Full Stack Developer & UI Designer (Decode Labs Internship)",
      architectureText: "The client-side React app handles layout rendering and visualizes subscription profiles. A backend REST API built on Express and Node.js manages business logic, secure JSON Web Token authentication, and MongoDB database storage. Three.js is utilized directly to render interactive 3D financial expense models.",
      architectureSteps: [
        "Users log in securely; credentials are validated in Express and returned as signed JWT cookies.",
        "MongoDB Atlas stores subscription objects mapped to user IDs, containing cost, interval, and payment dates.",
        "Three.js canvas dynamically loops over active subscription totals to draw interactive 3D bars.",
        "Node-Mailer integrations trigger mock email alerts 3 days prior to any renewal date."
      ],
      techStack: [
        { category: "Frontend", techs: ["React", "Three.js", "Tailwind CSS", "Vite", "Framer Motion"] },
        { category: "Backend & Auth", techs: ["Node.js", "Express", "JSON Web Tokens (JWT)", "Bcrypt.js"] },
        { category: "Database & Alerts", techs: ["MongoDB", "Mongoose ORM", "Cron Schedulers"] }
      ],
      features: [
        { title: "3D Expense Breakdown", desc: "A gorgeous 3D ring chart and floating currency bars that rotate and respond to mouse pointer movements." },
        { title: "Renewal Countdown", desc: "Recruiter-friendly cards highlighting subscriptions approaching renewal sorted by nearest date." },
        { title: "Hybrid DB Billing Logic", desc: "Handles relational database constraints within NoSQL schemas, guaranteeing zero payment overlap." },
        { title: "Predictive Analytics", desc: "Estimates total annual and lifetime spend metrics dynamically adapting to changing currencies." }
      ],
      implementation: "To match Stripe's visual excellence, I designed a white-glass theme using smooth backdrop filters. The Three.js canvas renders custom geometric shapes representing billing categories. Each shape is interactive; hovering highlights the corresponding subscription details. We configured MongoDB to maintain strict indices on user IDs and renewal schedules, boosting query speeds.",
      challenges: [
        {
          title: "Three.js to React Lifecycle Interferences",
          problem: "Redrawing the 3D canvas when user subscription states updated caused canvas duplicate contexts and memory leaks.",
          solution: "Encapsulated the Three.js renderer inside a strict React useRef context. Implemented a cleanup function inside useEffect that disposes geometry, materials, and textures, and cancels the requestAnimationFrame loop on unmount."
        },
        {
          title: "Secure and Stateless Authorization",
          problem: "Protecting financial routes without performance slowdowns during rapid navigation clicks.",
          solution: "Utilized JWT access tokens stored in session state and paired with secure HttpOnly cookies, ensuring cross-site scripting (XSS) security while keeping API requests stateless and sub-10ms."
        }
      ],
      results: [
        "Optimized page transition durations to under 150ms using Framer Motion.",
        "Created an interactive 3D FinTech visualization that loads in under 1 second.",
        "Helped alpha users identify and cancel an average of $35/month in unwanted subscriptions."
      ],
      skillsLearned: ["Express API design", "Mongoose schema indexing", "Three.js memory optimization", "Token-based security protocols"],
      futureEnhancements: ["Integrate Plaid Link API to automatically pull live transaction histories from banking portals.", "Implement an SMS notification gateway using Twilio API for direct text reminders.", "Add shared group billing configurations for shared household subscriptions."]
    }
  },
  {
    id: "restaurant-pos",
    title: "Restaurant Order System",
    subtitle: "Multi-Database POS and Order Manager",
    category: "Restaurant POS Platform",
    description: "A dual-database Restaurant POS system pairing FastAPI speed with SQLite transaction reliability and MongoDB menu versatility, yielding real-time order tracking and CRUD operation controls.",
    tech: ["React", "FastAPI", "Python", "SQLite", "MongoDB", "SQLAlchemy", "Tailwind CSS"],
    github: "https://github.com/periketiharikrishna/restaurant-pos-system",
    demo: "https://decode-pos-system.vercel.app",
    image: "🍔",
    features: ["Multi-Database Sync", "Real-Time Order Tracking", "Dynamic Menu Builder", "API Validation", "CRUD Dashboards"],
    caseStudy: {
      heroBannerBg: "from-emerald-500 to-teal-600",
      problem: "Restaurants process hundreds of high-speed transactions requiring relational schema consistency (SQL), while their menus feature highly customized toppings, ingredients, and structures requiring unstructured storage (NoSQL). Using a single database type forces structural compromises, causing either order slowdowns or complicated data parsing.",
      objectives: [
        "Design a Point-of-Sale platform that handles transactions in SQLite and custom menu definitions in MongoDB.",
        "Expose a high-speed Python FastAPI backend with full schema validation using Pydantic.",
        "Create an intuitive kitchen order tracker updating order states in real-time."
      ],
      role: "Backend Architecture & API Lead (Decode Labs Internship)",
      architectureText: "The system features a dual-database design. MongoDB stores customizable dishes, while SQLite manages transaction logs, tables, and bills. FastAPI serves as the orchestrator. The React client acts as the waiter terminal and kitchen display board.",
      architectureSteps: [
        "Waiters select customized items, validated by FastAPI's Pydantic schemas.",
        "Validated order transactions are inserted into SQLite ensuring ACID compliance.",
        "Detailed, dynamic ingredient additions are resolved against MongoDB menu configurations.",
        "FastAPI updates the kitchen display interface instantly via REST polling / Event stream channels."
      ],
      techStack: [
        { category: "Frontend", techs: ["React", "Vite", "Tailwind CSS", "Axios"] },
        { category: "Backend Engine", techs: ["Python FastAPI", "SQLAlchemy ORM", "Pydantic", "Uvicorn"] },
        { category: "Databases", techs: ["SQLite (Transactions)", "MongoDB (Dynamic Menus)"] }
      ],
      features: [
        { title: "Dynamic Menu Engine", desc: "Allows managers to append custom categories, pricing variants, and allergy notices to MongoDB instantly." },
        { title: "ACID Compliant Billing", desc: "SQLite guarantees transactions are locked, matching cash registers with generated invoices." },
        { title: "Interactive Kitchen Queue", desc: "Orders transition smoothly from 'Pending' -> 'Cooking' -> 'Ready' -> 'Served' with duration logging." },
        { title: "Advanced Input Validation", desc: "FastAPI checks order bounds, preventing negative quantities, invalid prices, or script injections." }
      ],
      implementation: "To achieve seamless dual-database operation, I designed a backend service layer that initializes database client pools. During order creation, a write lock ensures that order receipts are logged in SQL before dispatching notifications to the kitchen queue. Menu details are read-cached in Python memory, reducing MongoDB load to zero during peak operating hours.",
      challenges: [
        {
          title: "Cross-Database Transaction Failures",
          problem: "If a write to SQLite succeeded but the network dropped before registering custom menu details, database synchronization broke down.",
          solution: "Implemented a rollback mechanism. The SQLite order is written with a 'Pending-Sync' state, which transitions to 'Confirmed' only after successful resolution, rolling back SQLite operations if the process fails."
        },
        {
          title: "Complex Python Dependency Compilations",
          problem: "Simultaneous execution of Async MongoDB drivers (Motor) and Synchronous SQLAlchemy SQLite connections caused thread blocks.",
          solution: "Separated synchronous DB calls into FastAPI's background workers thread pools (`run_in_threadpool`), ensuring async endpoints remained unblocked."
        }
      ],
      results: [
        "Reduced database query times for active kitchen display tickets to under 5ms.",
        "Maintained 100% database synchronicity over 5,000 simulated client orders.",
        "Enabled zero-restart menu changes, improving administrative update efficiency."
      ],
      skillsLearned: ["Dual-database architectures", "Pydantic validation layers", "SQL transaction locks", "Async Python backend design"],
      futureEnhancements: ["Integrate WebSocket events for immediate multi-screen kitchen displays.", "Incorporate Stripe Terminal API for physical tap-to-pay card processing.", "Create AI-driven inventory projections advising chefs on ingredient purchasing based on previous transaction history."]
    }
  },
  {
    id: "ai-interview-prep",
    title: "AI Interview Prep",
    subtitle: "Intelligent Practice & Feedback Portal",
    category: "AI Learning Platform",
    description: "An automated interview training simulator that captures user voice responses, analyzes answer content using AI, logs scores, and tracks preparation history via Supabase.",
    tech: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Framer Motion", "Web Speech API"],
    github: "https://github.com/periketiharikrishna/ai-interview-prep",
    demo: "https://interview-ai-prep.vercel.app",
    image: "🧠",
    features: ["Speech-to-Text Practice", "Instant AI Feedback", "Supabase Session Store", "Responsive Dashboard", "Skill Radar Chart"],
    caseStudy: {
      heroBannerBg: "from-purple-600 to-pink-500",
      problem: "Recruiters use sophisticated screening systems, but job applicants struggle to practice answers under realistic conditions. Mock interview services are either expensive human consultancies or static, non-interactive video recording setups.",
      objectives: [
        "Develop an automated mock interview web app that evaluates user speech responses.",
        "Deliver detailed score breakdowns (Clarity, Technicality, Confidence) using AI API processing.",
        "Store practice metrics and candidate feedback history in a secure Cloud Supabase backend."
      ],
      role: "Lead Full Stack AI Engineer (Decode Labs Internship)",
      architectureText: "The frontend is written in TypeScript and React, leveraging the Web Speech API to capture verbal input. Authentication, profile history, and PostgreSQL storage are managed in the Supabase Cloud. Edge Functions parse text structures to prompt AI systems, returning scores in JSON format.",
      architectureSteps: [
        "Candidate signs in using Supabase Auth, retrieving their previous score records.",
        "A question card is displayed. Clicking 'Record' starts the browser Web Speech API transcription.",
        "Transcribed text is securely routed to an AI engine that reviews key technical terminology.",
        "Returned scores and analysis paragraphs are saved to Supabase Postgres, updating dashboard charts."
      ],
      techStack: [
        { category: "Frontend Core", techs: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
        { category: "Cloud & DB", techs: ["Supabase Core", "PostgreSQL", "Supabase Auth", "Edge Storage"] },
        { category: "AI & Speech", techs: ["Web Speech API", "OpenAI GPT-4 API", "Sentiment Libraries"] }
      ],
      features: [
        { title: "Voice Capture Terminal", desc: "A clean dashboard utilizing browser speech APIs, avoiding external recording dependencies." },
        { title: "Granular Feedback Cards", desc: "Displays ratings from 1-10 on logic, communication, and keyword coverage." },
        { title: "Historical Progress Chart", desc: "Interactive Line graphs showing preparation score gains over weekly intervals." },
        { title: "Real-time Text Typing Stream", desc: "Simulates actual interviewer presence with custom typewriter rendering." }
      ],
      implementation: "Creating a premium AI tool required tight React-Supabase integration. I configured Row Level Security (RLS) policies on Supabase to ensure users only access their personal interview recordings. The Web Speech API is wrapped inside a custom React hook `useSpeechToText` to manage recording states, pausing, and speech synthesis fallback (text-to-speech for questions).",
      challenges: [
        {
          title: "Browser Compatibility of Web Speech API",
          problem: "The speech transcription works flawlessly on Chrome, but failed or returned garbage arrays on Safari/Firefox.",
          solution: "Designed a clean fallback mechanism. If the browser lacks speech recognition support, the app immediately transitions to a text input field, keeping the portal fully functional with a helpful warning badge."
        },
        {
          title: "LLM Prompt Consistency",
          problem: "The AI API occasionally returned raw strings instead of structured JSON, breaking the React UI score dashboard.",
          solution: "Implemented strict JSON schemas in the API prompt, backed by backend verification. If parsing fails, a backup parser extracts numerical patterns and wraps them in standard JSON structure."
        }
      ],
      results: [
        "Enabled applicants to record and grade answers in under 3 seconds per response.",
        "Achieved a 95% voice recognition accuracy rate across standard browser tests.",
        "Built a modular component library compiled in under 12 seconds with TypeScript."
      ],
      skillsLearned: ["Supabase Cloud integrations", "Web Speech API orchestration", "AI Prompt Engineering", "TypeScript architecture design"],
      futureEnhancements: ["Integrate browser camera input to analyze eye contact and facial expressions during practice.", "Create sector-specific tracks (e.g. Finance, Healthcare, Frontend Development) with pre-seeded questions.", "Incorporate live audio feedback giving advice on speed, volume, and filler words like 'like' or 'umm'."]
    }
  }
];
