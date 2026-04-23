import { Node, Edge } from 'reactflow';
import { WorkflowNodeData } from '../types/workflow.types';
import { simulateWorkflow } from '../api/mockApi';
import { useWorkflowStore } from '../store/workflowStore';

export function useSimulate() {
  const { setIsSimulating, setSimulationResult, setSandboxOpen } = useWorkflowStore();

  const runSimulation = async (nodes: Node<WorkflowNodeData>[], edges: Edge[]) => {
    setIsSimulating(true);
    setSandboxOpen(true);
    setSimulationResult(null);
    try {
      const result = await simulateWorkflow(nodes, edges);
      setSimulationResult(result);
    } catch (err) {
      setSimulationResult({
        steps: [],
        valid: false,
        errors: ['Server unreachable. Make sure the backend is running on port 3001.'],
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return { runSimulation };
}
