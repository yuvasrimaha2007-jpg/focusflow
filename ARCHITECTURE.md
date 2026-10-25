# Technical Blueprint

## System flow
Student → Next.js UI → API Gateway → Auth → Task Service → Priority Engine
                                      ↘ AI Planner → LLM
                                      ↘ Analytics → PostgreSQL
                                      ↘ Notification Worker → FCM/Email

## Priority formula
priority_score =
  urgency_weight * deadline_pressure
+ effort_weight * estimated_effort
+ importance_weight * user_priority
+ context_weight * available_time_fit

The score is deterministic and explainable. The LLM receives structured tasks and constraints and returns a plan JSON. A validator checks duration totals, deadline violations and duplicate tasks.

## Example AI contract
Input:
{
  "available_minutes": 180,
  "energy": "normal",
  "tasks": [
    {"title":"Python quiz","minutes":35,"deadline":"today 18:00","priority":"high"}
  ]
}

Output:
{
  "blocks": [
    {"start":"17:30","minutes":35,"task_id":"...","reason":"deadline proximity"},
    {"start":"18:05","minutes":10,"type":"break"}
  ]
}

## Security
- Supabase/Auth JWT
- Row-level authorization by user_id
- Server-side validation
- Rate limit AI endpoint
- Never expose model API keys in frontend
- Minimal personal data collection

## Free/low-cost stack for hackathon
- Vercel — frontend deployment
- Supabase — Postgres + auth
- Render/Railway — backend
- Gemini or Groq free/low-cost developer access where available
- Firebase Cloud Messaging — push notifications
- GitHub — source control and CI
- Figma — UI wireframes
