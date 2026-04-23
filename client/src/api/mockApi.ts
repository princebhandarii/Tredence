import { AutomationAction, SimulationResult } from '../types/workflow.types';
import { Node, Edge } from 'reactflow';
import { WorkflowNodeData } from '../types/workflow.types';

const BASE_URL = 'https://tredence-19nt.onrender.com';

export async function fetchAutomations(): Promise<AutomationAction[]> {
  const res = await fetch(`${BASE_URL}/automations`);
  if (!res.ok) throw new Error('Failed to fetch automations');
  return res.json();
}

export async function simulateWorkflow(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): Promise<SimulationResult> {
  const res = await fetch(`${BASE_URL}/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodes, edges }),
  });
  if (!res.ok) throw new Error('Simulation request failed');
  return res.json();
}
