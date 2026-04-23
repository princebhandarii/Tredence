import { Node } from 'reactflow';
import { X, Trash2, Save, Play, CheckSquare, Shield, Zap, StopCircle } from 'lucide-react';
import { WorkflowNodeData } from '../types/workflow.types';
import { StartNodeForm } from './forms/StartNodeForm';
import { TaskNodeForm } from './forms/TaskNodeForm';
import { ApprovalNodeForm } from './forms/ApprovalNodeForm';
import { AutomatedStepNodeForm } from './forms/AutomatedStepNodeForm';
import { EndNodeForm } from './forms/EndNodeForm';
import { useState, useEffect } from 'react';

interface Props {
  node: Node<WorkflowNodeData>;
  onSave: (id: string, data: WorkflowNodeData) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

const typeConfig = {
  start:         { label: 'Start Node',     icon: Play },
  task:          { label: 'Task Node',       icon: CheckSquare },
  approval:      { label: 'Approval Node',   icon: Shield },
  automatedStep: { label: 'Automated Step',  icon: Zap },
  end:           { label: 'End Node',        icon: StopCircle },
};

export function NodeFormPanel({ node, onSave, onDelete, onClose }: Props) {
  const [localData, setLocalData] = useState<WorkflowNodeData>(node.data);

  useEffect(() => {
    setLocalData(node.data);
  }, [node.id]);

  const type = node.type as keyof typeof typeConfig;
  const config = typeConfig[type] || typeConfig.task;
  const Icon = config.icon;

  const renderForm = () => {
    switch (type) {
      case 'start':
        return <StartNodeForm data={localData as Parameters<typeof StartNodeForm>[0]['data']} onChange={(d) => setLocalData(d)} />;
      case 'task':
        return <TaskNodeForm data={localData as Parameters<typeof TaskNodeForm>[0]['data']} onChange={(d) => setLocalData(d)} />;
      case 'approval':
        return <ApprovalNodeForm data={localData as Parameters<typeof ApprovalNodeForm>[0]['data']} onChange={(d) => setLocalData(d)} />;
      case 'automatedStep':
        return <AutomatedStepNodeForm data={localData as Parameters<typeof AutomatedStepNodeForm>[0]['data']} onChange={(d) => setLocalData(d)} />;
      case 'end':
        return <EndNodeForm data={localData as Parameters<typeof EndNodeForm>[0]['data']} onChange={(d) => setLocalData(d)} />;
      default:
        return <p className="text-gray-400 text-sm">No form for this node type.</p>;
    }
  };

  return (
    <div className="w-72 flex flex-col h-full border-l border-gray-200 bg-white animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 border-l-4 border-l-black">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black">
            <Icon size={13} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">{config.label}</p>
            <p className="text-[10px] text-gray-400 truncate max-w-[150px]">ID: {node.id}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {renderForm()}
      </div>

      {/* Actions */}
      <div className="px-4 py-4 border-t border-gray-200 space-y-2">
        <button
          onClick={() => onSave(node.id, localData)}
          className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white bg-black hover:bg-gray-800 active:scale-95 transition-all"
        >
          <Save size={14} />
          Save Changes
        </button>
        <button
          onClick={() => onDelete(node.id)}
          className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-red-500 border border-red-200 hover:bg-red-50 transition-all"
        >
          <Trash2 size={14} />
          Delete Node
        </button>
      </div>
    </div>
  );
}
