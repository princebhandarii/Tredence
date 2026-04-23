import { useCallback, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Connection,
  Node,
  Edge,
  NodeMouseHandler,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { StartNode } from './nodes/StartNode';
import { TaskNode } from './nodes/TaskNode';
import { ApprovalNode } from './nodes/ApprovalNode';
import { AutomatedStepNode } from './nodes/AutomatedStepNode';
import { EndNode } from './nodes/EndNode';
import { NodeFormPanel } from './NodeFormPanel';
import { useWorkflowStore } from '../store/workflowStore';
import { WorkflowNodeData } from '../types/workflow.types';

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automatedStep: AutomatedStepNode,
  end: EndNode,
};

const defaultNodeData: Record<string, WorkflowNodeData> = {
  start: { type: 'start', label: 'Start', title: 'Workflow Start', metadata: [] },
  task: { type: 'task', label: 'New Task', title: 'New Task', description: '', assignee: '', dueDate: '', customFields: [] },
  approval: { type: 'approval', label: 'Approval', title: 'Approval Step', approverRole: 'Manager', autoApproveThreshold: 0 },
  automatedStep: { type: 'automatedStep', label: 'Automated Step', title: 'Automated Step', actionId: '', actionParams: {} },
  end: { type: 'end', label: 'End', endMessage: 'Workflow complete.', summaryFlag: false },
};

interface WorkflowCanvasProps {
  onNodesChange?: (nodes: Node<WorkflowNodeData>[]) => void;
  onEdgesChange?: (edges: Edge[]) => void;
  getFlowState?: (getter: () => { nodes: Node<WorkflowNodeData>[]; edges: Edge[] }) => void;
}

export function WorkflowCanvas({ getFlowState }: WorkflowCanvasProps) {
  const { selectedNodeId, setSelectedNode } = useWorkflowStore();

  const [nodes, setNodes, onNodesChange] = useNodesState<WorkflowNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (getFlowState) {
      getFlowState(() => ({ nodes, edges }));
    }
  });

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#000000', strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const nodeType = e.dataTransfer.getData('nodeType');
      if (!nodeType) return;

      const reactFlowBounds = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const position = {
        x: e.clientX - reactFlowBounds.left - 90,
        y: e.clientY - reactFlowBounds.top - 40,
      };

      const id = `${nodeType}-${Date.now()}`;
      const newNode: Node<WorkflowNodeData> = {
        id,
        type: nodeType,
        position,
        data: { ...(defaultNodeData[nodeType] || { type: nodeType as WorkflowNodeData['type'], label: nodeType }) },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // FIX: Do NOT delete node if the user is typing inside any input, textarea, or select
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable;
      if (isTyping) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedNodeId) {
          setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
          setEdges((eds) => eds.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId));
          setSelectedNode(null);
        }
      }
    },
    [selectedNodeId, setNodes, setEdges, setSelectedNode]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const handleSave = (id: string, data: WorkflowNodeData) => {
    setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data } : n)));
  };

  const handleDelete = (id: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    setSelectedNode(null);
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 relative" style={{ background: '#f9fafb' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode={null}
        >
          <MiniMap
            style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}
            nodeColor={(node) => {
              const colors: Record<string, string> = { start: '#000000', task: '#000000', approval: '#000000', automatedStep: '#000000', end: '#000000' };
              return colors[node.type || ''] || '#64748b';
            }}
          />
          <Controls style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
          <Background variant={BackgroundVariant.Dots} color="#e5e7eb" gap={20} size={1} />
        </ReactFlow>

        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-4xl mb-3">🎯</p>
              <p className="text-gray-400 font-semibold text-lg">Drop nodes here to get started</p>
              <p className="text-gray-300 text-sm mt-1">Drag from the sidebar on the left</p>
            </div>
          </div>
        )}
      </div>

      {selectedNode && (
        <NodeFormPanel
          node={selectedNode}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}