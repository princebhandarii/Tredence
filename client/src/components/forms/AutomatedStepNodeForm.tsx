import { AutomatedStepNodeData } from '../../types/workflow.types';
import { useWorkflowStore } from '../../store/workflowStore';

interface Props {
  data: AutomatedStepNodeData;
  onChange: (data: AutomatedStepNodeData) => void;
}

const inputClass = "w-full rounded-lg bg-white border border-gray-200 px-3 py-2 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors";
const labelClass = "block text-xs font-black text-gray-500 uppercase tracking-wider mb-1";

export function AutomatedStepNodeForm({ data, onChange }: Props) {
  const automations = useWorkflowStore((s) => s.automations);
  const selectedAction = automations.find((a) => a.id === data.actionId);

  const handleActionChange = (actionId: string) => {
    onChange({ ...data, actionId, actionParams: {} });
  };
  const handleParamChange = (param: string, value: string) => {
    onChange({ ...data, actionParams: { ...(data.actionParams || {}), [param]: value } });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClass}>Title</label>
        <input className={inputClass} value={data.title || ''} onChange={(e) => onChange({ ...data, title: e.target.value, label: e.target.value })} placeholder="Step name" />
      </div>
      <div>
        <label className={labelClass}>Action</label>
        <select className={`${inputClass} cursor-pointer`} value={data.actionId || ''} onChange={(e) => handleActionChange(e.target.value)}>
          <option value="">— Select an action —</option>
          {automations.map((a) => (
            <option key={a.id} value={a.id}>{a.label}</option>
          ))}
        </select>
        {automations.length === 0 && (
          <p className="text-[11px] text-gray-400 mt-1">⚠️ Start the backend server to load actions.</p>
        )}
      </div>
      {selectedAction && selectedAction.params.length > 0 && (
        <div className="space-y-3">
          <label className={labelClass}>Action Parameters</label>
          {selectedAction.params.map((param) => (
            <div key={param}>
              <label className="block text-xs text-gray-500 mb-1 capitalize">{param}</label>
              <input className={inputClass} value={(data.actionParams || {})[param] || ''} onChange={(e) => handleParamChange(param, e.target.value)} placeholder={`Enter ${param}...`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
