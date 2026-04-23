import { Node, Edge } from 'reactflow';
import { WorkflowNodeData } from '../types/workflow.types';

export function hasStartNode(nodes: Node<WorkflowNodeData>[]): boolean {
  return nodes.some((n) => n.type === 'start');
}

export function hasEndNode(nodes: Node<WorkflowNodeData>[]): boolean {
  return nodes.some((n) => n.type === 'end');
}

export function findDisconnectedNodes(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): string[] {
  if (nodes.length <= 1) return [];
  const connectedIds = new Set<string>();
  edges.forEach((e) => {
    connectedIds.add(e.source);
    connectedIds.add(e.target);
  });
  return nodes
    .filter((n) => !connectedIds.has(n.id))
    .map((n) => n.id);
}

export function detectCycle(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): boolean {
  const adjList: Record<string, string[]> = {};
  nodes.forEach((n) => (adjList[n.id] = []));
  edges.forEach((e) => {
    if (adjList[e.source]) adjList[e.source].push(e.target);
  });

  const visited = new Set<string>();
  const recStack = new Set<string>();

  function dfs(nodeId: string): boolean {
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
      if (dfs(node.id)) return true;
    }
  }
  return false;
}

export function validateWorkflow(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!hasStartNode(nodes)) errors.push('Workflow must have a Start node.');
  if (!hasEndNode(nodes)) errors.push('Workflow must have an End node.');
  if (detectCycle(nodes, edges)) errors.push('Cycle detected in the workflow.');
  const disconnected = findDisconnectedNodes(nodes, edges);
  if (disconnected.length > 0)
    errors.push(`${disconnected.length} node(s) are disconnected.`);
  return { valid: errors.length === 0, errors };
}
