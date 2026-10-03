export interface Project {
  id: string;
  title: string;
  category: 'mfe' | 'enterprise' | 'realtime' | 'personal';
  subtitle: string;
  description: string;
  longDescription: string;
  role: string;
  impactMetrics: string[];
  techStack: string[];
  architectureHighlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  imageBg: string; // Gradient style for thumbnail
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  isCurrent?: boolean;
  summary: string;
  achievements: string[];
  skills: string[];
  impactMetric: string;
}

export interface SkillItem {
  name: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: SkillItem[];
}

export const PERSONAL_INFO = {
  name: "Abhishek Kumar Singh",
  title: "Software Developer | ReactJS, NextJS, Node.js & Web Systems",
  subheading: "4+ Years Experience | ReactJS, NextJS 14+, Node.js & Micro-Frontend Systems",
  location: "Kolkata, India",
  email: "abhisheksingh552000@gmail.com",
  linkedin: "https://linkedin.com/in/abhishek-kumar-singh-a0a306169",
  github: "https://github.com/Abhi552000",
  summary: "Welcome! I'm Abhishek, a passionate Software Developer with over 4 years of experience building modern web applications for product teams. I specialize in ReactJS, NextJS 14+, Node.js, Express, and TypeScript, with a dedicated focus on building clean Micro-Frontend systems (Webpack 5 Module Federation), unified Monorepos (Nx & Turborepo), and scalable REST API integrations.",
  stats: [
    { label: "Years Engineering Experience", value: "4+", accent: "from-cyan-400 to-blue-500" },
    { label: "Code Duplication Reduced", value: "40%", accent: "from-emerald-400 to-teal-400" },
    { label: "Largest Contentful Paint", value: "<2.0s", accent: "from-purple-400 to-indigo-400" },
    { label: "Dev Cycle Time Saved", value: "30%", accent: "from-amber-400 to-orange-400" },
  ],
  education: {
    degree: "B.Tech in Electronics & Communication Engineering",
    institution: "MCKV Institute of Engineering, Kolkata",
    period: "2018 – 2022",
    cgpa: "8.3 / 10",
  }
};

export const WORK_EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Software Developer",
    company: "NextZen Minds",
    period: "Oct 2025 – Present",
    location: "Kolkata, India",
    isCurrent: true,
    summary: "Driving web development and architecture using Next.js 14 App Router, Nx Monorepo, and Turborepo across core product applications.",
    achievements: [
      "Architected an Nx Monorepo unifying shared component libraries, utility hooks, and ESLint/Prettier configs across multiple applications, reducing code duplication by ~40%.",
      "Configured Turborepo with pnpm workspaces to streamline builds across apps, accelerating pipelines through smart remote caching.",
      "Driving web development initiatives in Next.js 14 (App Router) with Tailwind CSS, achieving sub-2s Largest Contentful Paint (LCP) performance.",
      "Established Git branching strategies, PR templates, and collaborative code review standards adopted team-wide."
    ],
    skills: ["Next.js 14", "Nx Monorepo", "Turborepo", "Tailwind CSS", "TypeScript", "pnpm Workspaces"],
    impactMetric: "-40% Code Duplication & Sub-2s LCP"
  },
  {
    id: "exp-2",
    role: "Software Developer",
    company: "NextZen Minds",
    period: "Jun 2024 – Oct 2025",
    location: "Kolkata, India",
    summary: "Pioneered micro-frontend module federation architecture and built reusable React design component libraries & API integrations.",
    achievements: [
      "Built a Micro-Frontend system using Webpack 5 Module Federation, enabling independent deployment of product modules with zero inter-team dependencies.",
      "Engineered a reusable React component library shared across 3 product modules, cutting feature development time by ~30%.",
      "Integrated complex REST APIs with React Query for client-side caching, background refetching, and fluid UI updates."
    ],
    skills: ["Webpack 5 Module Federation", "ReactJS", "React Query", "Micro-Frontends", "Design Systems"],
    impactMetric: "-30% Development Time per Module"
  },
  {
    id: "exp-3",
    role: "Program Analyst",
    company: "CBNITS",
    period: "Aug 2023 – May 2024",
    location: "Kolkata, India",
    summary: "Engineered real-time analytics visualizers and led hospital management module delivery in client-facing Agile teams.",
    achievements: [
      "Built data-rich analytics dashboards using Highcharts and Redux Toolkit for real-time data monitoring.",
      "Guided junior engineers on component architecture, state management patterns, and code quality standards.",
      "Worked directly with enterprise clients to gather requirements and delivered the core hospital management module on schedule."
    ],
    skills: ["Highcharts", "Redux Toolkit", "ReactJS", "Mentorship", "Client Operations"],
    impactMetric: "On-Time Delivery of Hospital Module"
  },
  {
    id: "exp-4",
    role: "Junior Programmer",
    company: "CBNITS",
    period: "Jul 2022 – Jul 2023",
    location: "Kolkata, India",
    summary: "Developed real-time communication tools, backend services, and robotic process automation workflows.",
    achievements: [
      "Developed a real-time messaging feature using Socket.IO integrated with Node.js backend services and MongoDB.",
      "Contributed to multiple web modules across Agile sprint teams.",
      "Automated business workflows using SAP iRPA (Intelligent Robotic Process Automation)."
    ],
    skills: ["Socket.IO", "Node.js", "Express.js", "MongoDB", "ReactJS", "Agile Workflows"],
    impactMetric: "Real-time Socket Engine & Workflow Automation"
  }
];

export const PROJECTS: Project[] = [
  // Professional Enterprise & MFE
  {
    id: "swift-security",
    title: "Swift Security",
    category: "mfe",
    subtitle: "Cloud Security SaaS Platform",
    description: "Multi-tenant cloud security SaaS platform with independent micro-frontend policy engine modules and role-based governance.",
    longDescription: "Swift Security provides enterprise teams with unified cloud protection policy governance. Built on Webpack 5 Module Federation, individual security modules can be dynamically updated and deployed without full application rebuilds.",
    role: "Software Developer",
    impactMetrics: ["Zero-downtime micro-frontend updates", "Granular RBAC access governance", "Multi-tenant isolation UI"],
    techStack: ["ReactJS", "Redux Toolkit", "Ant Design", "Webpack 5 Module Federation", "TypeScript"],
    architectureHighlights: [
      "Dynamic remote module loading at runtime via Module Federation Container",
      "Shared Redux global auth slice with isolated state per module",
      "Role-based UI access control (RBAC) directive components"
    ],
    featured: true,
    imageBg: "from-cyan-900 via-blue-950 to-slate-900"
  },
  {
    id: "moneymax",
    title: "MoneyMax",
    category: "enterprise",
    subtitle: "Pawnbroking & Retail Finance Platform (Singapore & Malaysia)",
    description: "Enterprise pawn-broking & retail platform featuring dual-portal operations (Retail Branch & HQ), IoT peripheral middleware (scales, MyKad, biometrics), MAS & Bank Negara compliance, and granular dual-scope RBAC.",
    longDescription: "MoneyMax Retail Frontend is an enterprise pawnbroking, retail operations, and administrative platform for Singapore (S$) and Malaysia (RM). It features a Dual-Portal architecture: Retail Branch Portal (/app/retail) for tellers and valuers, and HQ Management Portal (/app/hq) for compliance and auction management. Integrates USB/serial IoT hardware via WebSocket daemon (digital precision scales, MyKad card readers, fingerprint biometrics, RFID tag scanners), multi-tenant country domain detection, dual-scope RBAC matrices (HO vs Retail), Datadog RUM monitoring, digital signature captures, and automated electronic invoicing.",
    role: "Software Developer",
    impactMetrics: [
      "Dual-Portal Retail (/app/retail) & HQ (/app/hq)",
      "IoT Scale, MyKad & Biometric Middleware",
      "Singapore S$ & Malaysia RM Multi-Tenant",
      "MAS & Bank Negara AML/CFT Compliance"
    ],
    techStack: [
      "React 18.3",
      "TypeScript 5.8",
      "Webpack 5",
      "Ant Design 5.26",
      "TailwindCSS 3.3",
      "Zustand 5",
      "React Router 6.30",
      "Datadog RUM",
      "WebSockets IoT"
    ],
    architectureHighlights: [
      "Dual-portal architecture separating Retail Counter operations (/app/retail) and HQ Compliance/Auction governance (/app/hq)",
      "IoT device middleware (useDeviceStore) connecting WebSockets to USB precision scales, MyKad identity card readers, & fingerprint biometrics",
      "Dual-scope permission matrix (accessControlHO vs accessControlRetail) with ROUTE_ACCESS_MAP route guards and dynamic menu filtering",
      "Regulatory CDD/ECDD compliance modules meeting MAS (Singapore) & Bank Negara Malaysia AML/CFT governance standards",
      "Hybrid kiosk & WebView container bridge integration (useHandleReactNativeMessage) for React Native mobile deployment"
    ],
    featured: true,
    imageBg: "from-amber-950 via-yellow-900 to-slate-950"
  },
  {
    id: "bidscout",
    title: "Bidscout",
    category: "enterprise",
    subtitle: "Procurement & Vendor Management Platform",
    description: "Enterprise procurement tool with certificate management, vendor registration workflows, and third-party buyer sync.",
    longDescription: "Streamlines vendor onboarding, compliance certificate validation, and buyer contact synchronization for enterprise procurement teams.",
    role: "Software Developer",
    impactMetrics: ["Automated compliance checks", "Third-party buyer API syncing", "Role-based document viewer"],
    techStack: ["ReactJS", "Ant Design", "REST APIs", "Formik", "TypeScript"],
    architectureHighlights: [
      "Modular multi-step dynamic registration form builder",
      "Automated document validation and upload progress handlers",
      "Optimized data grid filtering for 10,000+ vendor directory records"
    ],
    featured: false,
    imageBg: "from-indigo-950 via-slate-900 to-cyan-950"
  },
  {
    id: "connectbud",
    title: "ConnectBud",
    category: "realtime",
    subtitle: "EdTech Gamified Interactive Learning Platform",
    description: "Real-time interactive virtual classroom platform with live whiteboards, instant chat, and integrated Stripe subscriptions.",
    longDescription: "ConnectBud enables tutors and students to interact in dynamic virtual classrooms with low-latency event broadcasting and automated billing.",
    role: "Software Developer",
    impactMetrics: ["Sub-100ms real-time event latency", "Stripe Checkout integration", "Responsive mobile-first classroom UI"],
    techStack: ["ReactJS", "Material UI", "Socket.IO", "Stripe API", "Node.js"],
    architectureHighlights: [
      "Bi-directional WebSocket event channels for classroom whiteboard sync",
      "Modular UI components designed for rapid feature releases",
      "Stripe payment gateway integration with webhooks for plan upgrades"
    ],
    featured: false,
    imageBg: "from-purple-950 via-violet-900 to-slate-950"
  },
  {
    id: "ezhealth",
    title: "eZHealth",
    category: "enterprise",
    subtitle: "Teleconsultation & Healthcare Platform",
    description: "Healthcare platform for online doctor appointments, teleconsultation, and COVID-19 wellness package bookings with Next.js SSR.",
    longDescription: "Provides patients with seamless access to medical consultation booking, medical records, and digital payment receipts with high search engine visibility.",
    role: "Software Developer",
    impactMetrics: ["Next.js SSR for 95+ Lighthouse SEO score", "HIPAA-compliant UI workflows", "Stripe payment integration"],
    techStack: ["ReactJS", "NextJS", "Material UI", "Stripe", "SSR Engine"],
    architectureHighlights: [
      "Server-side rendering (SSR) for dynamic doctor directory SEO",
      "Responsive appointment calendar scheduler component",
      "Secure end-to-end appointment payment flow"
    ],
    featured: false,
    imageBg: "from-teal-950 via-emerald-900 to-slate-950"
  },

  // Personal Projects (Explicitly requested by user)
  {
    id: "planmate",
    title: "PlanMate",
    category: "personal",
    subtitle: "Enterprise Agile Scrum & Project Management Platform",
    description: "Full-stack Agile Scrum command center with interactive Kanban boards, sprint burndown analytics (Recharts), task dependencies, rich comments with @mentions, and multi-tenant RBAC.",
    longDescription: "PlanMate is a full-stack Agile Scrum management platform engineered with React 19, TypeScript, and Node.js/Express 5. It serves as a digital command center featuring interactive multi-column Kanban pipelines, sprint backlog planning, epic tracking, burndown analytics charts (Recharts), task dependency linking (blocks, relates to), activity audit history, rich comments with @user mention notifications, and multi-tenant organization role management.",
    role: "Creator & Software Developer",
    impactMetrics: [
      "Interactive Kanban & Sprint Burndown Analytics",
      "Multi-tenant RBAC Organization Management",
      "Task Dependencies & Rich @Mention Comments",
      "React 19 + TypeScript + Node.js REST API"
    ],
    techStack: [
      "React 19 (TypeScript)",
      "Vite 6",
      "Redux Toolkit 2",
      "Node.js & Express 5",
      "MongoDB & Mongoose 8",
      "Recharts 3",
      "Tailwind CSS 4",
      "React Router 7"
    ],
    architectureHighlights: [
      "Decoupled React 19 SPA + Node.js Express 5 REST API with centralized service layer pattern",
      "Multi-column Kanban board with real-time filters by assignee, priority, epic, and search keyword",
      "Sprint lifecycle management with soft-close state preservation for burndown velocity analytics",
      "Task lifecycle with estimation worklogs, subtask drills, activity audit logs, and @mention comment triggers",
      "Multi-tenant organization RBAC hierarchy (system-admin, org-admin, member) with custom status workflows"
    ],
    githubUrl: "https://github.com/abhisheksingh-dev/planmate",
    featured: true,
    imageBg: "from-indigo-950 via-purple-900 to-slate-950"
  },
  {
    id: "chatterbox",
    title: "ChatterBox",
    category: "personal",
    subtitle: "Full-Stack Real-Time Chat & Messaging Ecosystem",
    description: "Cross-platform messaging ecosystem with Web (React 19, Vite 6, DaisyUI) and Mobile (React Native, Expo SDK 54, TypeScript), Socket.IO v4.8 real-time engine, 6-digit Email OTP auth, and Zustand state.",
    longDescription: "ChatterBox is an enterprise-grade cross-platform real-time messaging application engineered for Web (React 19 + Vite 6 + Tailwind CSS + DaisyUI) and Mobile (React Native + Expo Router SDK 54 + TypeScript 5.9). Powered by Node.js, Express 5, MongoDB, and Socket.IO v4.8, it features instant bidirectional message relays, live online presence tracking, typing indicators, read receipts (messageSeen status), 6-digit Email OTP verification via Nodemailer, HTTP-Only JWT cookie sessions, and Zustand global state management.",
    role: "Creator & Software Developer",
    impactMetrics: [
      "Cross-platform Web & Expo SDK 54 Mobile",
      "Socket.IO real-time presence & read receipts",
      "6-digit Email OTP + JWT auth security",
      "React 19 + Vite 6 + Zustand + Node.js"
    ],
    techStack: [
      "React 19",
      "React Native (Expo SDK 54)",
      "TypeScript 5.9",
      "Socket.IO 4.8",
      "Node.js & Express 5",
      "MongoDB & Mongoose 8",
      "Zustand 5",
      "Tailwind CSS & DaisyUI"
    ],
    architectureHighlights: [
      "Unified Socket.IO v4.8 event relay engine for live presence, typing indicators, read receipts, and last seen pings",
      "Multi-layer auth security combining bcryptjs password hashing, JWT HTTP-Only cookies, and Nodemailer 6-digit Email OTP validation",
      "Expo Router SDK 54 universal file-based routing with Zustand state management & AsyncStorage session caching on Mobile",
      "Conversational schema auto-grouping with unread message badges, latest message preview, and HTML5 emoji picker integration"
    ],
    githubUrl: "https://github.com/abhisheksingh-dev/chatterbox",
    featured: true,
    imageBg: "from-blue-950 via-cyan-900 to-teal-950"
  },
  {
    id: "sriscart",
    title: "Sriscart",
    category: "personal",
    subtitle: "Real-Time Express Grocery & Delivery Platform",
    description: "Express grocery delivery web application featuring dynamic store hub radius boundary checks, Leaflet.js live rider tracking, dual-token JWT auth, 81.7% Vite bundle reduction, and Web Audio API spin wheel.",
    longDescription: "SrisCart is a high-performance express grocery delivery platform. It enforces dynamic store hub radius range checks using Leaflet.js & OpenStreetMap with draggable pin geolocation validation, features a Rider Panel with real-time transit route simulation, database-synced live buyer order tracking (3s polling), dual-token auth (15m access + 7d refresh) with Axios silent rotation interceptors, 81.7% Vite bundle size reduction (682kB to 125kB), Web Audio API synthesized loyalty spin wheel, AI shopping assistant, and Mongoose query indexing.",
    role: "Creator & Software Developer",
    impactMetrics: [
      "Dynamic store hub radius geolocation check",
      "81.7% JS bundle reduction (125kB)",
      "Leaflet.js + OSM live rider tracking",
      "Dual-token JWT auth with Axios refresh"
    ],
    techStack: [
      "React (TypeScript)",
      "Vite",
      "Leaflet.js & OSM",
      "Node.js",
      "Express",
      "MongoDB & Mongoose",
      "Redux Toolkit",
      "Tailwind CSS",
      "Web Audio API"
    ],
    architectureHighlights: [
      "Leaflet.js store hub radius circle & draggable geolocation pin validation for SLA delivery SLA bounds",
      "Dual-token auth flow (15m access + 7d refresh) with Axios 401 interceptor silent rotation",
      "81.7% primary JS bundle size reduction (682kB -> 125kB) with Vite dynamic lazy imports",
      "Live database-synchronized rider tracking engine with 3s polling & street transit simulation",
      "Web Audio API synthesized oscillator tones for gamified HTML5 canvas loyalty spin wheel",
      "AI Shopping Assistant for dynamic catalog search, recommendations & direct cart insertions"
    ],
    githubUrl: "https://github.com/abhisheksingh-dev/sriscart",
    featured: true,
    imageBg: "from-emerald-950 via-teal-900 to-slate-950"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Core Languages & Fundamentals",
    iconName: "Code",
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript (ES6+)" },
      { name: "HTML5 & CSS3" },
      { name: "Node.js (ES Modules)" },
    ]
  },
  {
    title: "Frameworks & State Management",
    iconName: "Layers",
    skills: [
      { name: "ReactJS (18 & 19)" },
      { name: "NextJS 14+ (App Router)" },
      { name: "Redux Toolkit" },
      { name: "Zustand" },
      { name: "React Query (TanStack)" },
      { name: "Tailwind CSS (3 & 4)" },
      { name: "Material UI / Ant Design" }
    ]
  },
  {
    title: "Architecture & Monorepos",
    iconName: "Cpu",
    skills: [
      { name: "Micro-Frontends (Module Federation)" },
      { name: "Nx Monorepo" },
      { name: "Turborepo & pnpm Workspaces" },
      { name: "Component-Driven Design Systems" },
      { name: "Webpack 5 & Vite 6" },
      { name: "Performance Optimization (LCP < 2s)" }
    ]
  },
  {
    title: "Backend, Real-Time & Databases",
    iconName: "Server",
    skills: [
      { name: "Express.js REST APIs" },
      { name: "MongoDB & Mongoose ODM" },
      { name: "Socket.IO (WebSockets)" },
      { name: "Leaflet.js & Geolocation API" },
      { name: "Git & GitHub Actions CI/CD" },
      { name: "Stripe & Payment Gateways" },
      { name: "Datadog RUM & Monitoring" }
    ]
  }
];

export const MFE_MODULES_DEMO = [
  { id: "shell", name: "Host Shell App", port: 3000, color: "border-cyan-500 bg-cyan-950/40", status: "Active Container" },
  { id: "auth", name: "Remote Auth Module", port: 3001, color: "border-blue-500 bg-blue-950/40", status: "Federated Remote" },
  { id: "dashboard", name: "Remote Analytics Engine", port: 3002, color: "border-purple-500 bg-purple-950/40", status: "Federated Remote" },
  { id: "billing", name: "Remote Stripe Billing", port: 3003, color: "border-emerald-500 bg-emerald-950/40", status: "Federated Remote" },
];

export const MONOREPO_GRAPH_NODES = [
  { id: "web-app", label: "apps/web-app", type: "app", desc: "Next.js 14 Main Customer Portal" },
  { id: "admin-app", label: "apps/admin-dashboard", type: "app", desc: "React Administrative Control Center" },
  { id: "ui-lib", label: "packages/ui", type: "pkg", desc: "Shared Tailwind Glass Component Library" },
  { id: "hooks-lib", label: "packages/hooks", type: "pkg", desc: "Custom React Query & Socket Hooks" },
  { id: "config-lib", label: "packages/config", type: "pkg", desc: "Shared ESLint, Prettier & TSConfigs" },
];
