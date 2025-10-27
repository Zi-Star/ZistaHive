# 🐝 Zista Hive Dev Plan  
> Core App: **Zista**  
> Internal Ecosystem: **Zista Hive**  
> Motto: **Stay Busy. Stay Smart.**  
> Parent Brand: **Z-Star | Life in Motion**

---

## 🌐 Vision
Zista is a web-based smart life hub that merges **daily tools**, **education**, **community**, **fun**, and **business** into one ecosystem.  
It aims to empower Kenya’s youth (and beyond) to **Think. Learn. Earn.**

---

## 🧩 Design System Foundations
**Framework:** Next.js 14 + TailwindCSS + shadcn/ui  
**Typography:** Poppins or Inter (Rounded, friendly)  
**Animation:** Framer Motion for subtle transitions  
**UI Components:** Shared “Zista-UI” library inside `/shared/`  
**Preview System:** Storybook for reusable components  

**Colors**
| Name | Hex | Meaning |
|------|------|----------|
| Golden Honey | #F9C74F | Warmth, productivity |
| Deep Indigo | #312E81 | Knowledge, focus |
| Soft White | #F5F5F7 | Balance, calm |
| Accent Cyan | #3ABFF8 | Freshness, innovation |

---

## 🏗️ Architecture Overview

**Type:** Monorepo  
**Structure:** Modular by feature  
**Language:** TypeScript  
**Stack:** Node.js + Next.js + PostgreSQL  
**Deployment:** Self-hosted via Docker  
**Version Control:** GitHub  

### 🧭 Folder Structure
Z-Star/                    ← acts as the main project root (Hub)
│
├── Docs/                  ← all documentation (PRD, dev plan, tasks)
│    ├── Zista_Hive_PRD_V3_Final.md
│    ├── Zista_Hive_dev_plan.md
│    └── dev_tasks.md
│
└── ZistaHive/             ←  main app (Next.js / React / etc.)
     ├── apps/
     ├── packages/
     ├── tools/
     └── etc...

/zistaHive/
├── apps/
│ ├── web/ # Main Zista app (Next.js frontend)
│ ├── admin/ # Admin dashboard
├── packages/
│ ├── shared/ # UI + logic used across apps (Zista-UI)
│ ├── api/ # Express/Nest API backend
│ ├── db/ # Prisma schema + migrations
│ ├── utils/ # Validation + helpers
│ ├── auth/ # Auth logic + session mgmt
│ ├── bee-trace/ # Error tracking module (logs + monitors)
├── scripts/ # DevOps scripts + build tools
├── docker/ # Docker configs + compose files
├── docs/ # All PRDs, roadmaps, etc.
└── README.md

> 🧠 **Structure for modularity:** each tool or section is a separate module.  
> Shared logic and UI live in `/packages/shared/`.  
> Use aliases for clean imports (e.g. `@zista/shared`, `@zista/api`).

---

## 🧱 Backend Foundation
- Framework: Node.js (NestJS or Express)
- ORM: Prisma with PostgreSQL
- Auth: JWT + NextAuth
- Hosting: Docker self-hosted
- Logging & Monitoring: BeeTrace (custom layer built with Sentry + Grafana)
- APIs: REST + optional GraphQL layer

---

## 🧠 Hive Concept Map
| Bee Term | Feature |
|-----------|----------|
| Hive | The full Zista ecosystem |
| Colony | Community section |
| Comb | Individual section (e.g., Tools Comb, Learning Comb) |
| QueenBee AI | AI assistant + automation core |
| Honey | User rewards (points, earnings) |
| Nectar | Collected data from user activity |
| BeeTrace | Error + analytics tracking layer |

---

## 🛠️ Core Feature Modules

### 🍯 **Combs (Tools Section)**
- Image tools (resize, compress, remove bg, convert JPG/PNG)
- Document tools (merge, split, convert PDF/DOC)
- Calculators (age, BMI, finance, math symbols, unit converter)
- Download & extraction utilities
- QR & Barcode generator
- AI-powered utilities (summarizer, translator, etc.)
- Modular architecture → each tool lives in `/packages/tools/<tool-name>`

---

### 🧠 **Education & Skill Comb**
- Library: free eBooks (Atomic Habits, Rich Dad, etc.)
- Skill hub: access to free online courses + certificate links
- Learning paths (Personal growth, Tech, Design, Business)
- Progress tracker with gamified milestones (Honey rewards)

---

### 🎮 **Activity Comb (Entertainment Section)**
- Games: Chess, Ludo, Puzzles, Quiz, Math games
- Challenges: user vs user, wager-based (honey-to-honey)
- Rewards: unlock games or content with ads or earned honey
- Monetization: optional ad-reward system

---

### 🏘️ **Colony (Community Section)**
- Topic-based groups (Tech, Art, Motivation, Business)
- Real-time chat via Socket.io
- Moderation AI (QueenBee AI)
- Roles: Worker Bees (users), Moderators, Queen Admins
- Auto-clean for spam & offensive content
- Group-level metrics (active users, engagement honey)

---

### 🏪 **HoneyComb Store**
- Youth marketplace (clothing, art, services)
- Seller dashboard + product management
- Commission-based earning system
- Honey → currency for in-app purchases
- AI recommendations for trending items

---

## 🧰 Development Stack Summary
| Layer | Tool |
|-------|------|
| Frontend | Next.js 14 |
| Backend | Node.js + NestJS |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | NextAuth |
| UI | TailwindCSS + shadcn/ui |
| Animation | Framer Motion |
| Monitoring | BeeTrace (Sentry + Grafana) |
| Testing | Jest + Playwright |
| Dev Tools | Storybook, ESLint, Prettier |

---

## 🐝 Workflow Principles
- Monorepo with turborepo or nx
- CI/CD via GitHub Actions
- PR checks: lint → build → test → deploy
- Modular builds per package
- Auto version bump via changesets
- Storybook preview for UI verification

---

## 🔍 Analysis & Error Tracking
- BeeTrace integrated across frontend + backend
- Monitors exceptions, latency, and user flows
- Tracks honey economy (how points move)
- Weekly reports auto-generated by QueenBee AI

---

## 🚀 MVP Roadmap Summary
| Phase | Focus | Output |
|--------|--------|--------|
| 1 | Tools + Education | Working daily tools + basic library |
| 2 | Colony + Activity | Community + Games integration |
| 3 | Store + Monetization | HoneyComb marketplace + reward system |
| 4 | Automation Layer | QueenBee AI + analytics integration |

---

## 💡 Developer Notes
- Use `.env` for configs
- Modular imports via `tsconfig.paths.json`
- Keep PRDs and Docs inside `/docs`
- Use markdown docs for versioned planning

---

## 🧭 Goal
Build a self-sustaining ecosystem that merges utility, learning, and creativity.  
Zista Hive is more than an app — it’s a digital colony where productivity meets purpose.
