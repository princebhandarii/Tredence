import { Handle, Position, NodeProps } from 'reactflow';
import { Shield } from 'lucide-react';
import { ApprovalNodeData } from '../../types/workflow.types';

export function ApprovalNode({ data, selected }: NodeProps<ApprovalNodeData>) {
  return (
    <div
      className={`min-w-[180px] rounded-lg border-2 px-4 py-3 shadow-md transition-all bg-white ${
        selected ? 'border-black shadow-black/20 shadow-lg' : 'border-gray-300'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black">
          <Shield size={13} className="text-white" />
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Approval</p>
          <p className="text-sm font-bold text-black leading-tight">{data.title || data.label}</p>
        </div>
      </div>
      {data.approverRole && (
        <p className="text-[11px] text-gray-600 mt-1">🏷️ {data.approverRole}</p>
      )}
      {data.autoApproveThreshold > 0 && (
        <p className="text-[10px] text-gray-500">Auto: {data.autoApproveThreshold}%</p>
      )}
      <Handle type="target" position={Position.Top} className="!bg-black !border-gray-400 !w-3 !h-3" />
      <Handle type="source" position={Position.Bottom} className="!bg-black !border-gray-400 !w-3 !h-3" />
    </div>
  );
}
