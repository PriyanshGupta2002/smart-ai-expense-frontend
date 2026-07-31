# Expense AI — Frontend

Frontend for **Expense AI**, an AI-powered expense tracker that lets users upload receipts, organize expenses automatically, and interact with their financial data through a conversational AI interface.

Built with **Next.js, TypeScript, TanStack Query, Tailwind CSS, and shadcn/ui**.

## What is Expense AI?

Expense AI turns receipt tracking into a simple workflow:

```text
Upload receipts → AI processes them → Ask questions → Get insights
```

Users can ask things like:

- "How much did I spend this month?"
- "What items did I purchase?"
- "Where am I spending the most?"
- "Show my restaurant expenses."
- "Export my July expenses to Excel."

Expense AI connects the conversation to actual expense data instead of providing generic financial responses.

---

## Features

### AI Chat

A conversational interface for interacting with expense data using natural language.

AI responses are streamed in real time for a responsive chat experience.

### Receipt Uploads

Users can upload receipts that are processed asynchronously by the backend.

After uploading, users can continue using the application while receipt extraction runs in the background.

### Receipt Management

View uploaded receipts and extracted information including:

- Merchant
- Date
- Category
- Payment method
- Processing status
- Amount

Users can also:

- Open the original receipt
- View image/PDF receipts
- Delete receipts
- Track processing status

### AI-Generated Downloads

Expense AI can generate files directly from conversation.

For example:

```text
Export my expenses from July to Excel.
```

The generated file appears directly inside the conversation as a downloadable artifact.

Supported formats include:

- CSV
- Excel
- PDF

### Persistent Conversations

Chat threads and messages are persisted, allowing users to leave a conversation and continue it later.

Generated file artifacts also remain associated with the conversation.

### Markdown Responses

AI responses support rich Markdown including:

- Tables
- Lists
- Headings
- Code
- Formatted text

This makes expense summaries and structured reports easier to read.

### Authentication

Authenticated users get their own:

- Receipts
- Expenses
- Conversations
- Generated reports

---

## Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **TanStack Query**
- **Axios**
- **React Markdown**
- **remark-gfm**
- **Clerk**
- **Lucide Icons**

---

## Application Flow

```text
                     ┌─────────────────────┐
                     │      Expense AI     │
                     │      Frontend       │
                     └──────────┬──────────┘
                                │
               ┌────────────────┼────────────────┐
               │                │                │
               ▼                ▼                ▼
          Receipts            Chat           Account
               │                │
               ▼                ▼
          Upload/View      Ask Expenses
          Delete           Stream Answers
          Track Status     Download Reports
               │                │
               └────────┬───────┘
                        ▼
                   FastAPI API
```

---

## Chat Experience

When a user sends:

```text
What did I spend the most on this month?
```

the frontend:

```text
Send message
     ↓
Optimistic UI update
     ↓
Backend AI agent
     ↓
SSE stream starts
     ↓
Tokens rendered in real time
     ↓
Markdown rendered
     ↓
Conversation persisted
```

If the AI generates a file:

```text
Agent generates report
        ↓
Artifact SSE event
        ↓
Download card appears
        ↓
CSV / XLSX / PDF
```

---

## Project Structure

```text
app/
├── chat/
│   └── [threadId]/
│
├── receipts/
│
├── sign-in/
│
├── sign-up/
│
└── ...

components/
├── chat/
│   ├── chat-container.tsx
│   ├── chat-input.tsx
│   ├── chat-messages.tsx
│   ├── chat-artifact-card.tsx
│   └── ai-markdown-renderer.tsx
│
├── receipts/
│   ├── receipts-table.tsx
│   ├── receipt-row-actions.tsx
│   └── receipt-status-badge.tsx
│
└── ui/

hooks/
├── use-chat.ts
├── use-threads.ts
└── ...

services/
├── chat-service.ts
├── thread-service.ts
├── receipt-service.ts
└── ...

types/
├── chat.ts
├── thread.ts
└── receipt.ts
```

The exact structure may evolve as the project develops.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PriyanshGupta2002/smart-ai-expense-frontend.git

cd smart-ai-expense-frontend
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or use the package manager configured in the repository.

### 3. Configure environment variables

Create:

```text
.env.local
```

Add the environment variables required by the application.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000

# Add Clerk/public configuration required
# by your application.
```

Do not commit real secrets to the repository.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown by Next.js in your browser.

---

## Backend

Expense AI requires the backend API for:

- Authentication
- Receipt processing
- Expense data
- AI agent execution
- Chat history
- File exports

Backend repository:

https://github.com/PriyanshGupta2002/smart-ai-expense-backend

---

## Backend Services

For the complete application to work locally, the backend typically requires:

```text
FastAPI
   +
PostgreSQL
   +
Redis
   +
Celery Worker
```

See the backend repository for setup instructions.

---

## Real-Time AI Streaming

Expense AI uses **Server-Sent Events (SSE)** to stream AI responses.

Instead of waiting for:

```text
Request ────────────────> Complete response
```

the UI receives:

```text
Request
   ↓
token
token
token
token
   ↓
done
```

This provides a responsive ChatGPT-like experience while the agent works with expense data.

---

## Server State

**TanStack Query** is used for server state including:

- Threads
- Messages
- Receipts

Optimistic updates are used in chat so user messages and streamed AI responses appear immediately.

---

## Generated Artifacts

When Expense AI generates a report, the conversation can contain an artifact such as:

```text
┌───────────────────────────────────┐
│ 📊 July Expenses.xlsx        ↓    │
│ Excel • 14.2 KB                   │
└───────────────────────────────────┘
```

Artifacts are persisted by the backend, so they remain available when the conversation is reopened.

---

## Roadmap

Some ideas for future versions:

- Expense analytics dashboard
- Interactive spending charts
- Budget tracking
- Spending alerts
- Recurring expense detection
- Bank statement imports
- Better mobile experience
- More AI-powered financial insights

---

## Contributing

Feedback and contributions are welcome.

If you have an idea, find a bug, or want to improve something, feel free to open an issue or pull request.

---

## Related Repository

**Expense AI Backend**

https://github.com/PriyanshGupta2002/smart-ai-expense-backend

---

## Author

Built by **Priyansh Gupta**

GitHub: https://github.com/PriyanshGupta2002