import { Handle, Position, NodeProps } from 'reactflow';
import { StopCircle } from 'lucide-react';
import { EndNodeData } from '../../types/workflow.types';

export function EndNode({ data, selected }: NodeProps<EndNodeData>) {
  return (
    <div
      className={`min-w-[160px] rounded-lg border-2 px-4 py-3 shadow-md transition-all bg-white ${
        selected ? 'border-black shadow-black/20 shadow-lg' : 'border-gray-300'
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black">
          <StopCircle size={13} className="text-white" />
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">End</p>
          <p className="text-sm font-bold text-black leading-tight">{data.label}</p>
        </div>
      </div>
      {data.endMessage && (
        <p className="text-[10px] text-gray-500 mt-1.5 italic truncate max-w-[150px]">💬 {data.endMessage}</p>
      )}
      {data.summaryFlag && (
        <p className="text-[9px] text-gray-400 mt-1">📄 Summary report enabled</p>
      )}
      <Handle type="target" position={Position.Top} className="!bg-black !border-gray-400 !w-3 !h-3" />
    </div>
  );
}
