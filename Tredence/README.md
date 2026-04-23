# HR Workflow Designer

A full-stack visual workflow builder built for HR process automation. Designed as a case study submission for the **Tredence Analytics Full Stack Engineering Intern** role.

---

## Overview

HR Workflow Designer lets users visually construct HR workflows (e.g., employee onboarding, leave approvals, offboarding) by dragging and connecting nodes on an interactive canvas. Each node type represents a step in the process and can be configured via a dedicated properties panel. Workflows can be simulated end-to-end via a mock backend API.

---

## Architecture

```
hr-workflow-designer/
├── client/                    # React 18 + Vite frontend
│   └── src/
│       ├── components/
│       │   ├── nodes/         # 5 custom React Flow node types
│       │   ├── forms/         # Per-node configuration forms
│       │   ├── Sidebar.tsx    # Draggable node palette
│       │   ├── NodeFormPanel.tsx  # Right panel for selected node
│       │   ├── SandboxPanel.tsx   # Simulation results modal
│       │   └── WorkflowCanvas.tsx # React Flow wrapper
│       ├── hooks/             # useSimulate (API call abstraction)
│       ├── api/               # mockApi.ts (fetch layer)
│       ├── store/             # Zustand global state
│       ├── types/             # Shared TypeScript interfaces
│       └── utils/             # Graph validation (DFS cycle detection)
└── server/                    # Express mock API (port 3001)
    ├── index.js               # Routes: GET /automations, POST /simulate
    └── mockData.js            # Static automation actions
```

**Separation of concerns:**
- Node visual rendering is fully decoupled from form logic
- Graph validation is a pure utility — no UI dependencies
- The Zustand store holds only cross-component state (selected node, simulation result, open panels)

---

## How to Run

### Prerequisites
- Node.js 18+ installed
- npm 9+

### 1. Start the backend

```bash
cd server
npm install
node index.js
# Server runs at http://localhost:3001
```

### 2. Start the frontend

```bash
cd client
npm install
npm run dev
# App runs at http://localhost:5173
```

### 3. Open the app

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Features

- **Drag-and-drop canvas** — 5 node types (Start, Task, Approval, AutomatedStep, End)
- **Node configuration panel** — click any node to edit properties in a right-side panel
- **Dynamic forms** — AutomatedStep form fetches actions from `/automations` and dynamically renders param inputs
- **Workflow simulation** — POST to `/simulate` performs topological execution and returns step-by-step results
- **Graph validation** — DFS-based cycle detection, disconnected node warnings, start/end checks
- **Export JSON** — download the current workflow as a `.json` file
- **Dark theme** — Tredence-branded dark UI with orange accent

---

## Design Decisions

**Why Zustand over Context API?**
Zustand avoids boilerplate and re-render overhead. With React Flow managing its own state internally, Zustand was ideal for lightweight cross-cutting state (selected node ID, simulation result, panel visibility).

**Why Vite over CRA?**
Vite's ESM-native dev server offers significantly faster HMR and cold start times, critical for a component-heavy canvas application.

**How forms are extensible**
Each form is a controlled component receiving `data` and `onChange` — adding a new node type requires only: a new type in `workflow.types.ts`, a new form component, a new node visual, and one line each in `WorkflowCanvas` and `NodeFormPanel`.

---

## What Was Completed

- [x] Full drag-and-drop canvas with React Flow
- [x] All 5 node types with distinct styling and handles
- [x] All 5 node configuration forms (including dynamic fields)
- [x] Express mock API with `/automations` and `/simulate` endpoints
- [x] DFS cycle detection and graph validation utilities
- [x] Simulation results panel with step-by-step timeline
- [x] Export workflow as JSON
- [x] Zustand global store
- [x] TypeScript strict mode throughout
- [x] Tailwind CSS dark theme

## Future Scope

- **Undo/Redo** — full history stack using React Flow's `useUndoable` or a custom command pattern
- **Node templates** — save frequently used subgraphs as reusable templates
- **Auto-layout** — dagre or elkjs integration for automatic node positioning
- **Backend persistence** — MongoDB/PostgreSQL storage for saving and loading workflows
- **Authentication** — JWT-based login so teams can share and version workflows
- **Conditional edges** — branching logic based on approval outcomes

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Canvas | React Flow v11 |
| State | Zustand |
| Styling | Tailwind CSS |
| Backend | Node.js, Express |
| Validation | Custom DFS graph utilities |
