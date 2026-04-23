import { ApprovalNodeData } from '../../types/workflow.types';

interface Props {
  data: ApprovalNodeData;
  onChange: (data: ApprovalNodeData) => void;
}

const inputClass = "w-full rounded-lg bg-white border border-gray-200 px-3 py-2 text-sm text-black focus:outline-none focus:border-black transition-colors";
const labelClass = "block text-xs font-black text-gray-500 uppercase tracking-wider mb-1";

export function ApprovalNodeForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className={labelClass}>Title</label>
        <input className={inputClass} value={data.title || ''} onChange={(e) => onChange({ ...data, title: e.target.value, label: e.target.value })} placeholder="Approval step name" />
      </div>
      <div>
        <label className={labelClass}>Approver Role</label>
        <select className={`${inputClass} cursor-pointer`} value={data.approverRole || 'Manager'} onChange={(e) => onChange({ ...data, approverRole: e.target.value as ApprovalNodeData['approverRole'] })}>
          <option value="Manager">Manager</option>
          <option value="HRBP">HRBP</option>
          <option value="Director">Director</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Auto-Approve Threshold (%)</label>
        <input type="number" min={0} max={100} className={inputClass} value={data.autoApproveThreshold ?? 0} onChange={(e) => onChange({ ...data, autoApproveThreshold: Number(e.target.value) })} placeholder="0 = disabled" />
        <p className="text-[11px] text-gray-400 mt-1">Set to 0 to disable auto-approval</p>
      </div>
    </div>
  );
}
