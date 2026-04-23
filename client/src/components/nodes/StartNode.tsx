import { Handle, Position, NodeProps } from 'reactflow';
import { Play } from 'lucide-react';
import { StartNodeData } from '../../types/workflow.types';

export function StartNode({ data, selected }: NodeProps<StartNodeData>) {
  return (
    <div
      className={`min-w-[180px] rounded-lg border-2 px-4 py-3 shadow-md transition-all bg-white ${
        selected ? 'border-black shadow-black/20 shadow-lg' : 'border-gray-300'
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black">
          <Play size={13} className="text-white fill-white" />
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Start</p>
          <p className="text-sm font-bold text-black leading-tight">{data.title || data.label}</p>
        </div>
      </div>
      {data.metadata && data.metadata.filter(m => m.key).length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-200 space-y-1">
          {data.metadata.filter(m => m.key).map((m, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-black bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded">
                {m.key}
              </span>
              <span className="text-[9px] text-gray-600 truncate max-w-[110px]">{m.value}</span>
            </div>
          ))}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-black !border-gray-400 !w-3 !h-3" />
    </div>
  );
}
