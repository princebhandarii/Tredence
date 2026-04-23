const express = require("express");
const cors = require("cors");
const { automations } = require("./mockData");

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// GET /automations
app.get("/automations", (req, res) => {
  res.json(automations);
});

// POST /simulate
app.post("/simulate", (req, res) => {
  const { nodes = [], edges = [] } = req.body;

  const errors = [];
  const steps = [];

  // Check for Start node
  const startNode = nodes.find((n) => n.type === "start");
  if (!startNode) errors.push("Workflow must have a Start node.");

  // Check for End node
  const endNode = nodes.find((n) => n.type === "end");
  if (!endNode) errors.push("Workflow must have an End node.");

  // Check for disconnected nodes (no edges touching them)
  const connectedIds = new Set();
  edges.forEach((e) => {
    connectedIds.add(e.source);
    connectedIds.add(e.target);
  });
  const disconnected = nodes.filter(
    (n) => !connectedIds.has(n.id) && n.type !== "start" && nodes.length > 1
  );

  // Build adjacency list for DFS cycle detection
  const adjList = {};
  nodes.forEach((n) => (adjList[n.id] = []));
  edges.forEach((e) => {
    if (adjList[e.source]) adjList[e.source].push(e.target);
  });

  // DFS cycle detection
  const visited = new Set();
  const recStack = new Set();
  let hasCycle = false;

  function dfs(nodeId) {
    visited.add(nodeId);
    recStack.add(nodeId);
    for (const neighbor of adjList[nodeId] || []) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (recStack.has(neighbor)) {
        return true;
      }
    }
    recStack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) {
        hasCycle = true;
        break;
      }
    }
  }

  if (hasCycle) errors.push("Cycle detected in workflow graph.");

  // Topological sort (Kahn's algorithm)
  const inDegree = {};
  nodes.forEach((n) => (inDegree[n.id] = 0));
  edges.forEach((e) => {
    if (inDegree[e.target] !== undefined) inDegree[e.target]++;
  });

  const queue = nodes.filter((n) => inDegree[n.id] === 0).map((n) => n.id);
  const topoOrder = [];

  while (queue.length > 0) {
    const curr = queue.shift();
    topoOrder.push(curr);
    (adjList[curr] || []).forEach((neighbor) => {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    });
  }

  const nodeMap = {};
  nodes.forEach((n) => (nodeMap[n.id] = n));

  const orderedNodes = hasCycle ? nodes : topoOrder.map((id) => nodeMap[id]).filter(Boolean);

  // Generate steps
  orderedNodes.forEach((node) => {
    const data = node.data || {};
    let message = "";
    let status = "success";

    const isDisconnected = disconnected.find((d) => d.id === node.id);
    if (isDisconnected) status = "warning";

    switch (node.type) {
      case "start":
        message = `Workflow started: "${data.title || "Unnamed Workflow"}"`;
        break;
      case "task":
        message = `Task "${data.title || data.label}" assigned to ${data.assignee || "Unassigned"}${data.dueDate ? ` — due ${data.dueDate}` : ""}`;
        break;
      case "approval":
        message = `Approval requested from ${data.approverRole || "Manager"} for "${data.title || data.label}"${data.autoApproveThreshold > 0 ? ` (auto-approve threshold: ${data.autoApproveThreshold}%)` : ""}`;
        break;
      case "automatedStep":
        const action = automations.find((a) => a.id === data.actionId);
        message = `Automated action "${action ? action.label : data.actionId || "Unknown"}" triggered for "${data.title || data.label}"`;
        break;
      case "end":
        message = `Workflow ended: "${data.endMessage || "Process complete"}"${data.summaryFlag ? " — Summary report generated." : ""}`;
        break;
      default:
        message = `Processed node: ${data.label || node.id}`;
    }

    if (isDisconnected) message += " ⚠️ This node appears disconnected.";

    steps.push({
      nodeId: node.id,
      nodeType: node.type,
      label: data.title || data.label || node.id,
      status,
      message,
    });
  });

  const valid = errors.length === 0;

  res.json({ steps, valid, errors });
});

app.listen(PORT, () => {
  console.log(`HR Workflow API running at http://localhost:${PORT}`);
});
