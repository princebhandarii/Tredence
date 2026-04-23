import { Handle, Position, NodeProps } from 'reactflow';
import { Zap } from 'lucide-react';
import { AutomatedStepNodeData } from '../../types/workflow.types';

export function AutomatedStepNode({ data, selected }: NodeProps<AutomatedStepNodeData>) {
  const params = Object.entries(data.actionParams || {}).filter(([, v]) => v);
  return (
    <div
      className={`min-w-[180px] rounded-lg border-2 px-4 py-3 shadow-md transition-all bg-white ${
        selected ? 'border-black shadow-black/20 shadow-lg' : 'border-gray-300'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black">
          <Zap size={13} className="text-white fill-white" />
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Automated</p>
          <p className="text-sm font-bold text-black leading-tight">{data.title || data.label}</p>
        </div>
      </div>
      {data.actionId && (
        <p className="text-[11px] text-gray-600 mt-1">⚡ {data.actionId}</p>
      )}
      {params.length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-200 space-y-1">
          {params.map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-black bg-gray-100 border border-gray-300 px-1.5 py-0.5 rounded">{k}</span>
              <span className="text-[9px] text-gray-600 truncate max-w-[110px]">{v}</span>
            </div>
          ))}
        </div>
      )}
      <Handle type="target" position={Position.Top} className="!bg-black !border-gray-400 !w-3 !h-3" />
      <Handle type="source" position={Position.Bottom} className="!bg-black !border-gray-400 !w-3 !h-3" />
    </div>
  );
}
