import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, WORK_EXPERIENCES, PROJECTS, SKILL_CATEGORIES } from "@/data/portfolioData";

const responseCache = new Map<string, string>();
const MAX_CACHE_SIZE = 100;

export async function POST(req: NextRequest) {
  let userQuery = "";
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    userQuery = (messages[messages.length - 1]?.content || "").trim();
    const normalizedKey = userQuery.toLowerCase().trim().replace(/\s+/g, " ");

    if (responseCache.has(normalizedKey)) {
      return NextResponse.json({ reply: responseCache.get(normalizedKey) });
    }

    const apiKey = process.env.GEMINI_API_KEY || "";

    const portfolioContext = `
You are Abhishek AI, representing Software Developer Abhishek Kumar Singh (4+ years experience).
Respond naturally, warmly, intelligently, and conversationally in real-time. Do not use raw asterisks or robotic bullet lists.

Candidate Context:
Summary: ${PERSONAL_INFO.summary}
Work Experiences: ${WORK_EXPERIENCES.map((e) => `${e.role} at ${e.company} (${e.period})`).join(", ")}
Projects:
${PROJECTS.map((p) => `- ${p.title} (${p.subtitle}): ${p.description}. Tech Stack: ${p.techStack.join(", ")}. Highlights: ${p.architectureHighlights.join("; ")}`).join("\n")}
Skills: ${SKILL_CATEGORIES.map((c) => `${c.title}: ${c.skills.map((s) => s.name).join(", ")}`).join("; ")}
`;

    // 1. Try direct HTTP fetch to Google Generative AI REST API with active models (gemini-3.8-flash)
    if (apiKey) {
      const activeModels = [
        "gemini-3.8-flash",
        "gemini-2.5-computer-use-preview-10-2025",
        "antigravity-preview-latest",
      ];

      for (const modelName of activeModels) {
        try {
          const fetchRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      { text: portfolioContext },
                      { text: `User Question: ${userQuery}` },
                    ],
                  },
                ],
              }),
            }
          );

          if (fetchRes.ok) {
            const fetchJson = await fetchRes.json();
            const generatedText = fetchJson.candidates?.[0]?.content?.parts?.[0]?.text;
            if (generatedText && generatedText.trim().length > 5) {
              const cleanReply = generatedText.replace(/\*\*/g, "").replace(/\*/g, "•");
              if (responseCache.size >= MAX_CACHE_SIZE) {
                const firstKey = responseCache.keys().next().value;
                if (firstKey) responseCache.delete(firstKey);
              }
              responseCache.set(normalizedKey, cleanReply);
              return NextResponse.json({ reply: cleanReply });
            }
          }
        } catch (restErr) {
          console.warn(`REST API call note for ${modelName}:`, restErr);
        }
      }

      // 2. Try SDK with active candidate model list
      try {
        const ai = new GoogleGenAI({ apiKey });

        for (const modelName of activeModels) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents: [
                {
                  role: "user",
                  parts: [
                    { text: portfolioContext },
                    { text: `User Question: ${userQuery}` },
                  ],
                },
              ],
            });

            if (response.text && response.text.trim().length > 5) {
              const cleanReply = response.text.replace(/\*\*/g, "").replace(/\*/g, "•");
              if (responseCache.size >= MAX_CACHE_SIZE) {
                const firstKey = responseCache.keys().next().value;
                if (firstKey) responseCache.delete(firstKey);
              }
              responseCache.set(normalizedKey, cleanReply);
              return NextResponse.json({ reply: cleanReply });
            }
          } catch {
            continue;
          }
        }
      } catch (genAiError) {
        console.warn("Live Gemini SDK call note:", genAiError);
      }
    }
  } catch (err) {
    console.warn("Request parsing note:", err);
  }

  // 3. Dynamic Conversational Intelligence Engine (Natural Voice + Typos + RBAC)
  const reply = generateConversationalReply(userQuery);
  const normalizedKey = userQuery.toLowerCase().trim().replace(/\s+/g, " ");
  if (normalizedKey && responseCache.size < MAX_CACHE_SIZE) {
    responseCache.set(normalizedKey, reply);
  }
  return NextResponse.json({ reply });
}

function generateConversationalReply(query: string): string {
  const q = query.toLowerCase().trim();
  const qNorm = q.replace(/\s+/g, "").replace(/[-_]/g, "");

  // Greetings
  if (
    q === "hi" ||
    q === "hello" ||
    q === "hey" ||
    q === "greetings" ||
    q.startsWith("hi ") ||
    q.startsWith("hello ") ||
    q.startsWith("hey ") ||
    qNorm === "hi" ||
    qNorm === "hello" ||
    qNorm === "hey"
  ) {
    return `Hello! I'm Abhishek AI, the portfolio assistant for Software Developer Abhishek Kumar Singh (4+ years experience).\n\nFeel free to ask about his experience in Micro-Frontends (Webpack 5 Module Federation), Next.js 14+ App Router, Nx/Turborepo Monorepos, or product systems like MoneyMax, PlanMate, Swift Security, ChatterBox, and SrisCart!`;
  }

  // RBAC / Security / Authorization queries (Handles rbac and rback typos)
  if (
    qNorm.includes("rbac") ||
    qNorm.includes("rback") ||
    q.includes("role based") ||
    q.includes("access control") ||
    q.includes("permission") ||
    q.includes("security map")
  ) {
    return `RBAC (Role-Based Access Control) is a security model that restricts system access based on assigned user roles.\n\nIn the MoneyMax Enterprise Platform, Abhishek engineered a centralized RBAC Security Engine using a declarative ROUTE_ACCESS_MAP and a custom permission validator. This strictly scopes branch counter staff (limited to daily pawning, valuations, and cash operations) away from HQ administrative workflows (forfeiture, auctions, staff management, and financial auditing), ensuring full compliance under Monetary Authority of Singapore (MAS) and Bank Negara Malaysia regulatory standards.`;
  }

  // Next.js specific queries
  if (qNorm.includes("nextjs") || q.includes("next.js") || q.includes("next js") || q.includes("app router") || q.includes("server component")) {
    return `Yes! Abhishek has extensive production experience with Next.js 14+ and the App Router. He has architected three key projects using Next.js:\n\n1. PlanMate — An Enterprise Agile Scrum platform where he used Next.js 14 App Router, React Server Components, and Recharts to build dynamic sprint planning dashboards.\n\n2. Swift Security — A Cyber Security Management Platform where he built the Next.js host container integrating Webpack 5 Module Federation micro-frontends.\n\n3. MoneyMax Retail & HQ Platform — An enterprise pawn-broking & administrative ecosystem using Next.js routing, Zustand state management, and WebSockets.\n\nAcross these projects, Abhishek focused heavily on performance optimization, sub-2.0s LCP, and parallel server component data fetching.`;
  }

  // Micro-Frontend / MFE / Webpack 5 queries (Handles microfrontend with or without space/hyphen)
  if (
    qNorm.includes("microfrontend") ||
    qNorm.includes("microapp") ||
    q.includes("mfe") ||
    q.includes("federation") ||
    q.includes("webpack")
  ) {
    return `Micro-Frontend architecture is a design pattern where a monolithic web application is decomposed into smaller, independently deployable micro-apps that dynamically integrate at runtime.\n\nAbhishek builds Webpack 5 Module Federation Micro-Frontends. In enterprise projects like Swift Security, he configured a host-remote orchestration framework where independent remote micro-apps (like Auth Module and Policy Engine) deploy independently without host rebuilds, sharing React and Redux singletons to achieve sub-2.0s LCP performance with zero runtime collisions.`;
  }

  // Monorepos (Handles "mono repo", "monorepo", "mono-repo", "nx", "turborepo")
  if (
    qNorm.includes("monorepo") ||
    qNorm.includes("monorepos") ||
    q.includes("nx") ||
    q.includes("turbo") ||
    q.includes("turborepo")
  ) {
    return `A Monorepo (monolithic repository) is an architectural pattern where multiple projects, shared UI libraries, and utility packages live within a single repository.\n\nAbhishek leverages Nx and Turborepo monorepos to unify design system tokens, UI components, and TypeScript utilities across multiple production web apps. He configured remote build caching to achieve 120ms cached pipeline builds, eliminated 40% of code duplication, and enforced strict linting boundaries.`;
  }

  // Why Hire / Senior / Lead Role queries
  if (
    q.includes("why hire") ||
    (q.includes("hire") && q.includes("abhishek")) ||
    q.includes("senior") ||
    q.includes("lead")
  ) {
    return `Abhishek Kumar Singh is a strong candidate for Software Developer roles because of his 4+ years of hands-on software development experience. He has demonstrated leadership in building high-scale Fintech, Pawn-Broking, Agile Management, and Real-Time messaging platforms. He delivers sub-2.0s LCP page load speeds, cuts client bundle sizes by 80%+, and implements robust Micro-Frontend and Monorepo architectures.`;
  }

  // SrisCart & ChatterBox combo or individual queries
  if (q.includes("sriscart") && q.includes("chatterbox")) {
    return `SrisCart and ChatterBox represent two of Abhishek's full-stack product projects:\n\n• SrisCart is an express grocery delivery platform built with Leaflet.js and OpenStreetMap featuring a 4.0 km store hub radius check, dynamic pins, Web Audio API spin wheel rewards, and an 81.7% bundle reduction.\n\n• ChatterBox is a real-time messaging ecosystem across web (React 19, Vite 6) and mobile (React Native, Expo SDK 54), powered by Socket.IO v4.8, Node.js, Express, and MongoDB.`;
  }

  if (
    q.includes("sriscart") ||
    q.includes("grocery") ||
    q.includes("delivery") ||
    q.includes("leaflet") ||
    q.includes("4km") ||
    q.includes("radius")
  ) {
    return `SrisCart is an express grocery delivery platform Abhishek engineered with Leaflet.js and OpenStreetMap. He implemented a strict 4.0 km store hub radius check to validate customer delivery boundaries, enabled draggable pins and Geolocation API pinpoints, and reduced the client bundle size by 81.7% (from 2.4 MB down to 438 KB) using Vite code splitting.`;
  }

  if (
    q.includes("chatterbox") ||
    q.includes("chat") ||
    q.includes("socket") ||
    q.includes("mobile") ||
    q.includes("expo") ||
    q.includes("realtime")
  ) {
    return `ChatterBox is a real-time messaging ecosystem Abhishek built across web and mobile. The web app uses React 19 and Vite 6, while the mobile app is built with React Native and Expo SDK 54. It leverages Socket.IO v4.8, Node.js, and MongoDB for instant messaging, presence indicators, and typing states.`;
  }

  // MoneyMax queries
  if (
    q.includes("moneymax") ||
    q.includes("pawn") ||
    q.includes("retail") ||
    q.includes("hq") ||
    q.includes("biometric") ||
    q.includes("mykad") ||
    q.includes("dual-portal") ||
    q.includes("dual portal")
  ) {
    return `MoneyMax is an enterprise pawn-broking and retail platform Abhishek built for Singapore (S$) and Malaysia (RM) markets under MAS and Bank Negara regulatory compliance. He engineered a dual-portal system for Branch Counter Staff and HQ Administrators, integrated WebSockets for physical scales, MyKad IC card readers, and biometric scanners, and implemented a centralized RBAC route security map.`;
  }

  // PlanMate queries
  if (
    q.includes("planmate") ||
    q.includes("agile") ||
    q.includes("scrum") ||
    q.includes("kanban") ||
    q.includes("sprint")
  ) {
    return `PlanMate is an industry-standard Agile Scrum platform Abhishek built with Next.js 14 App Router. It features drag-and-drop Kanban boards, backlog management, epic tracking, Recharts burndown analytics, and multi-tenant organization workspace management.`;
  }

  // Swift Security queries
  if (q.includes("swift") || q.includes("security")) {
    return `Swift Security is a Micro-Frontend Cyber Security Management Platform where Abhishek configured Webpack 5 Module Federation host-remote orchestration, allowing independent deployment of remote micro-apps (like Auth Module and Policy Engine) with shared singletons for React and Redux.`;
  }

  // Experience / Background
  if (
    q.includes("experience") ||
    q.includes("years") ||
    q.includes("background") ||
    q.includes("who") ||
    q.includes("overview")
  ) {
    return `Abhishek Kumar Singh is a Software Developer with over 4 years of experience building modern enterprise web applications. He specializes in ReactJS, Next.js 14+, Webpack 5 Module Federation, Nx/Turborepo Monorepos, TypeScript, and Node.js. He has built platforms in Fintech, Pawn-Broking, Agile Scrum, Real-Time Messaging, and Express Delivery.`;
  }

  // Contact
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("linkedin") ||
    q.includes("github")
  ) {
    return `You can reach out to Abhishek directly via email at abhisheksingh552000@gmail.com, or connect on LinkedIn (linkedin.com/in/abhishek-kumar-singh-a0a306169) and GitHub (github.com/Abhi552000). He is currently open to Software Developer roles.`;
  }

  // Default Conversational Answer
  return `I'm happy to help! Abhishek Kumar Singh is a Software Developer with 4+ years of experience specializing in ReactJS, Next.js 14+ App Router, Node.js & Express APIs, Webpack 5 Micro-Frontends, and Nx/Turborepo Monorepos. Feel free to ask about any specific project like PlanMate, MoneyMax, ChatterBox, SrisCart, or Swift Security!`;
}

