export type NodeType = 'start' | 'task' | 'approval' | 'automatedStep' | 'end';

export interface BaseNodeData {
  type: NodeType;
  label: string;
}

export interface StartNodeData extends BaseNodeData {
  type: 'start';
  title: string;
  metadata: { key: string; value: string }[];
}

export interface TaskNodeData extends BaseNodeData {
  type: 'task';
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: { key: string; value: string }[];
}

export interface ApprovalNodeData extends BaseNodeData {
  type: 'approval';
  title: string;
  approverRole: 'Manager' | 'HRBP' | 'Director';
  autoApproveThreshold: number;
}

export interface AutomatedStepNodeData extends BaseNodeData {
  type: 'automatedStep';
  title: string;
  actionId: string;
  actionParams: Record<string, string>;
}

export interface EndNodeData extends BaseNodeData {
  type: 'end';
  endMessage: string;
  summaryFlag: boolean;
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedStepNodeData
  | EndNodeData;

export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

export interface SimulationResult {
  steps: {
    nodeId: string;
    nodeType: NodeType;
    label: string;
    status: 'success' | 'warning' | 'error';
    message: string;
  }[];
  valid: boolean;
  errors: string[];
}
