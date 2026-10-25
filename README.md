# FocusFlow — Smart Student Companion

> AI-powered academic task planning for college students.

## Problem
Students manage assignments, exams, projects and deadlines across scattered notes, chat messages and calendars. This causes missed deadlines, poor prioritization and inefficient study sessions.

## Solution
FocusFlow combines a priority engine, AI study planning, deadline awareness, progress analytics and behavioral insights in one student-focused web app.

## Demo MVP
- Dashboard with AI Daily Brief
- Priority queue
- One-click task completion
- Add-task modal
- AI Planner with available-time input
- Progress analytics
- Local persistence with browser localStorage
- Responsive mobile layout

## Winning differentiator
Instead of being another to-do list, FocusFlow is a **decision engine**: it recommends what the student should do next based on urgency, effort, available time and focus patterns.

## Production architecture
Frontend: Next.js / React + Tailwind + shadcn/ui  
Backend: FastAPI or Node.js/NestJS  
Database: PostgreSQL + Redis  
AI: Gemini/Groq/OpenAI-compatible LLM endpoint  
Auth: Supabase Auth / Clerk  
Notifications: Firebase Cloud Messaging  
Deployment: Vercel + Render/Railway + Supabase

## Suggested API
- `POST /api/tasks`
- `GET /api/tasks?status=open`
- `PATCH /api/tasks/:id`
- `POST /api/ai/plan`
- `GET /api/analytics/weekly`
- `POST /api/focus/session`
- `POST /api/notifications/test`

## Data model
### users
id, name, email, course, year, timezone, created_at

### tasks
id, user_id, title, subject, deadline, estimated_minutes, priority, status, created_at

### focus_sessions
id, user_id, task_id, started_at, ended_at, interruption_count

### plans
id, user_id, generated_at, available_minutes, plan_json, model

### events
id, user_id, event_type, metadata_json, created_at

## 24-hour build plan
0–2h: problem validation, wireframe, Git setup  
2–6h: responsive frontend + task CRUD  
6–10h: database + authentication  
10–13h: AI planner + priority scoring  
13–16h: analytics + notifications  
16–19h: polish, mobile, loading/error states  
19–21h: deploy + seed demo data  
21–23h: test + record backup demo  
23–24h: PPT + pitch + judge Q&A

## Folder structure
```
focusflow/
├── app/
│   ├── dashboard/
│   ├── tasks/
│   ├── planner/
│   └── analytics/
├── components/
├── lib/
│   ├── ai/
│   ├── scoring/
│   └── db/
├── api/
├── public/
├── tests/
├── README.md
└── package.json
```

## Resume description
Built FocusFlow, an AI-powered student productivity platform that prioritizes academic tasks using deadline urgency, estimated effort and available study time, with personalized study-plan generation, progress analytics and responsive web UX.
