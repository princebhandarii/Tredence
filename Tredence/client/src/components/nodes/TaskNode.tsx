import { Handle, Position, NodeProps } from 'reactflow';
import { CheckSquare } from 'lucide-react';
import { TaskNodeData } from '../../types/workflow.types';

export function TaskNode({ data, selected }: NodeProps<TaskNodeData>) {
  return (
    <div
      className={`min-w-[180px] rounded-lg border-2 px-4 py-3 shadow-md transition-all bg-white ${
        selected ? 'border-black shadow-black/20 shadow-lg' : 'border-gray-300'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black">
          <CheckSquare size={13} className="text-white" />
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Task</p>
          <p className="text-sm font-bold text-black leading-tight">{data.title || data.label}</p>
        </div>
      </div>
      {data.assignee && (
        <p className="text-[11px] text-gray-600 mt-1">👤 {data.assignee}</p>
      )}
      {data.dueDate && (
        <p className="text-[11px] text-gray-600">📅 {data.dueDate}</p>
      )}
      {data.description && (
        <p className="text-[10px] text-gray-500 mt-1 italic truncate max-w-[160px]">{data.description}</p>
      )}
      {data.customFields && data.customFields.filter(f => f.key).length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-200 space-y-1">
          {data.customFields.filter(f => f.key).map((f, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-black bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded">
                {f.key}
              </span>
              <span className="text-[9px] text-gray-600 truncate max-w-[110px]">{f.value}</span>
            </div>
          ))}
        </div>
      )}
      <Handle type="target" position={Position.Top} className="!bg-black !border-gray-400 !w-3 !h-3" />
      <Handle type="source" position={Position.Bottom} className="!bg-black !border-gray-400 !w-3 !h-3" />
    </div>
  );
}
