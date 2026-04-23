import { create } from 'zustand';
import { AutomationAction, SimulationResult } from '../types/workflow.types';

interface WorkflowStore {
  selectedNodeId: string | null;
  setSelectedNode: (id: string | null) => void;
  automations: AutomationAction[];
  setAutomations: (actions: AutomationAction[]) => void;
  simulationResult: SimulationResult | null;
  setSimulationResult: (result: SimulationResult | null) => void;
  isSimulating: boolean;
  setIsSimulating: (v: boolean) => void;
  isSandboxOpen: boolean;
  setSandboxOpen: (v: boolean) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  selectedNodeId: null,
  setSelectedNode: (id) => set({ selectedNodeId: id }),
  automations: [],
  setAutomations: (actions) => set({ automations: actions }),
  simulationResult: null,
  setSimulationResult: (result) => set({ simulationResult: result }),
  isSimulating: false,
  setIsSimulating: (v) => set({ isSimulating: v }),
  isSandboxOpen: false,
  setSandboxOpen: (v) => set({ isSandboxOpen: v }),
}));
