# T3 Clone of T3 Chat

This is a clone of T3 Chat.

## Features

- Chat with multiple LLMs (OpenAI, Claude, Anthropic, DeepSeek)
- Chat history stored locally accessible via shortcut `ctrl + k`
- Social login (GitHub) with Supabase
- Dark mode

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS 4
- TypeScript
- Shadcn
- Zustand
- Supabase
- Vercel AI SDK

## Getting Started

### Environment Variables

You need to create project in Supabase and add the following environment variables to your `.env.local` file:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Install dependencies

```bash
npm install
```

## Development

```bash
npm run dev
```
