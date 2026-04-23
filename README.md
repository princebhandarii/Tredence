 Tredence Analytics Full Stack Engineering - Case study work

A professional visual workflow builder for HR process automation. Built with React + React Flow + Node.js, this application allows HR teams to design, configure, and simulate complex workflows like employee onboarding, leave approvals, and offboarding — all through an intuitive drag-and-drop interface.

---

## 📸 Preview

> Drop a screenshot of your app here after deployment
> Example: ![HR Workflow Designer](./screenshot.png)

---

## 🔗 Live Demo

- **Frontend (Vercel):https://tredence-cyan.vercel.app/
- **Backend (Render):https://tredence-19nt.onrender.com/automations

---

## 🎯 Problem Statement

HR teams often manage complex multi-step processes (onboarding, approvals, offboarding) using spreadsheets or emails — which are error-prone and hard to track. This tool provides a **visual no-code workflow builder** where HR managers can:

- Design workflows by dragging and connecting nodes
- Configure each step with detailed properties
- Simulate the workflow to validate it before going live
- Export the workflow as JSON for integration with other systems

---

## ✨ Features

- 🖱️ **Drag & Drop Canvas** — Drag nodes from the sidebar onto the canvas and connect them
- 🟦 **5 Node Types** — Start, Task, Approval, Automated Step, End
- ✏️ **Node Configuration** — Click any node to open a property panel and fill in details
- ▶️ **Workflow Simulation** — Run a step-by-step simulation with validation results
- 🔍 **Graph Validation** — Detects missing Start/End nodes, disconnected nodes, and cycles
- 📤 **Export JSON** — Download the full workflow as a `.json` file
- 🗑️ **Delete Nodes** — Press Delete key on canvas or use the Delete Node button in panel
- 📦 **MiniMap** — Bird's eye view of the entire workflow
- 🎨 **Clean Black & White UI** — Professional minimal design

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Canvas / Flow | React Flow v11 |
| State Management | Zustand |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Backend | Node.js + Express |
| API Communication | Fetch API (REST) |
| Deployment (Frontend) | Vercel |
| Deployment (Backend) | Render |

---

## 📁 Project Structure


hr-workflow-designer/
├── client/                          # React frontend
│   └── src/
│       ├── components/
│       │   ├── nodes/              
│       │   │   ├── StartNode.tsx
│       │   │   ├── TaskNode.tsx
│       │   │   ├── ApprovalNode.tsx
│       │   │   ├── AutomatedStepNode.tsx
│       │   │   └── EndNode.tsx
│       │   ├── forms/               # Node config forms
│       │   │   ├── StartNodeForm.tsx
│       │   │   ├── TaskNodeForm.tsx
│       │   │   ├── ApprovalNodeForm.tsx
│       │   │   ├── AutomatedStepNodeForm.tsx
│       │   │   └── EndNodeForm.tsx
│       │   ├── Sidebar.tsx          # Draggable node palette
│       │   ├── NodeFormPanel.tsx    # Right side config panel
│       │   ├── SandboxPanel.tsx     # Simulation results modal
│       │   └── WorkflowCanvas.tsx   # React Flow canvas
│       ├── hooks/
│       │   └── useSimulate.ts       # Simulation API hook
│       ├── api/
│       │   └── mockApi.ts           # API fetch layer
│       ├── store/
│       │   └── workflowStore.ts     # Zustand global store
│       ├── types/
│       │   └── workflow.types.ts    # All TypeScript interfaces
│       └── utils/
│           └── graphValidation.ts   # Cycle detection + validation
└── server/                          # Express backend
    ├── index.js                     # API routes
    └── mockData.js                  # Static automation actions



## ⚙️ How to Run Locally

### Prerequisites
- Node.js 18 or above
- npm 9 or above

### Step 1 — Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/hr-workflow-designer.git
cd hr-workflow-designer
```

### Step 2 — Start the Backend

```bash
cd server
npm install
node index.js
```

Server runs at: `http://localhost:3001`

### Step 3 — Start the Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

App runs at: `http://localhost:5173`

### Step 4 — Open in Browser

Go to **http://localhost:5173**

---

## 🔌 API Endpoints

### GET /automations
Returns list of available automated actions.

**Response:**
```json
[
  { "id": "send_email", "label": "Send Email", "params": ["to", "subject"] },
  { "id": "generate_doc", "label": "Generate Document", "params": ["template", "recipient"] },
  { "id": "notify_slack", "label": "Notify Slack", "params": ["channel", "message"] },
  { "id": "create_ticket", "label": "Create Ticket", "params": ["title", "priority"] }
]
```

### POST /simulate
Accepts workflow JSON and returns step-by-step simulation results.

**Request Body:**
```json
{
  "nodes": [...],
  "edges": [...]
}
```

**Response:**
```json
{
  "steps": [
    {
      "nodeId": "start-123",
      "nodeType": "start",
      "label": "Workflow Start",
      "status": "success",
      "message": "Workflow started: Onboarding"
    }
  ],
  "valid": true,
  "errors": []
}
```

---

## 🧠 Design Decisions

### Why Zustand over Context API?
Zustand has zero boilerplate and avoids unnecessary re-renders. Since React Flow manages its own internal state, we only needed a lightweight store for cross-component concerns like selected node ID, simulation results, and panel visibility. Zustand was the perfect fit.

### Why Vite over Create React App?
Vite's ESM-native dev server offers significantly faster hot module replacement (HMR) and cold start times. For a canvas-heavy application with many components, this makes development much smoother.

### Why React Flow?
React Flow provides production-grade canvas primitives (nodes, edges, handles, minimap, controls) out of the box. Building this from scratch with plain SVG would take 10x more time and introduce many edge cases. React Flow let us focus on business logic instead.

### How Forms Are Extensible
Every node form is a controlled component that receives `data` and `onChange` as props. Adding a new node type in the future only requires:
1. A new type in `workflow.types.ts`
2. A new node visual in `nodes/`
3. A new form in `forms/`
4. One line each in `WorkflowCanvas.tsx` and `NodeFormPanel.tsx`

### Graph Validation
Validation uses a **DFS (Depth First Search)** algorithm for cycle detection and **Kahn's algorithm** for topological sorting — the same algorithms used in real workflow engines and build systems.

---

## ✅ What Was Completed

- [x] Full drag-and-drop canvas with React Flow
- [x] All 5 node types with distinct icons and styling
- [x] All 5 node configuration forms with dynamic fields
- [x] Metadata display on Start node card
- [x] Custom fields display on Task node card
- [x] Action params display on Automated Step card
- [x] Express mock API with `/automations` and `/simulate`
- [x] DFS cycle detection and full graph validation
- [x] Step-by-step simulation results panel
- [x] Export workflow as JSON
- [x] Zustand global state management
- [x] TypeScript strict mode throughout
- [x] Backspace bug fix — typing in forms no longer deletes nodes
- [x] Clean black and white professional UI
- [x] Deployed on Vercel + Render

---

## 🔮 Future Scope

| Feature | Description |
|---|---|
| Undo / Redo | Full history stack using command pattern |
| Node Templates | Save and reuse subgraphs as templates |
| Auto Layout | Automatic node positioning using dagre or elkjs |
| Backend Persistence | Save and load workflows from MongoDB/PostgreSQL |
| Authentication | JWT-based login for team collaboration |
| Conditional Edges | Branching logic based on approval outcomes |
| Real-time Collaboration | Multiple users editing the same workflow |
| Workflow Versioning | Track changes and roll back to previous versions |

---

## 🐛 Known Bug Fixed

**Bug:** Pressing Backspace inside any input field (e.g. Workflow Title, Metadata) was automatically deleting the selected node on the canvas.

**Root Cause:** The `keydown` event listener was attached to the entire `document`, so it fired even when the user was typing in form inputs.

**Fix:** Added a check at the start of the `onKeyDown` handler in `WorkflowCanvas.tsx` to detect if the active element is an `INPUT`, `TEXTAREA`, `SELECT`, or `contentEditable` element — and if so, skip the delete logic entirely.

---

## 👨‍💻 Author

**Prince Bhandari**
- GitHub:https://github.com/princebhandarii/
- LinkedIn:https://www.linkedin.com/in/princebhandarii/
- Email:princebhandari22@gmail.com

---

## 📄 License

This project was built as a case study for the Tredence Analytics Full Stack Engineering Intern role.

Built with ❤️ using React, React Flow, Node.js, and Tailwind CSS
