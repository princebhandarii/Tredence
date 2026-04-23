import { TaskNodeData } from '../../types/workflow.types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  data: TaskNodeData;
  onChange: (data: TaskNodeData) => void;
}

const inputClass = "w-full rounded-lg bg-white border border-gray-200 px-3 py-2 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors";
const labelClass = "block text-xs font-black text-gray-500 uppercase tracking-wider mb-1";

export function TaskNodeForm({ data, onChange }: Props) {
  const addField = () => {
    onChange({ ...data, customFields: [...(data.customFields || []), { key: '', value: '' }] });
  };
  const removeField = (i: number) => {
    onChange({ ...data, customFields: data.customFields.filter((_, idx) => idx !== i) });
  };
  const updateField = (i: number, field: 'key' | 'value', val: string) => {
    const updated = data.customFields.map((f, idx) => (idx === i ? { ...f, [field]: val } : f));
    onChange({ ...data, customFields: updated });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClass}>Title *</label>
        <input className={inputClass} value={data.title || ''} onChange={(e) => onChange({ ...data, title: e.target.value, label: e.target.value })} placeholder="Task title" />
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <textarea className={`${inputClass} resize-none h-20`} value={data.description || ''} onChange={(e) => onChange({ ...data, description: e.target.value })} placeholder="Describe what needs to be done..." />
      </div>
      <div>
        <label className={labelClass}>Assignee</label>
        <input className={inputClass} value={data.assignee || ''} onChange={(e) => onChange({ ...data, assignee: e.target.value })} placeholder="e.g. John Smith" />
      </div>
      <div>
        <label className={labelClass}>Due Date</label>
        <input type="date" className={inputClass} value={data.dueDate || ''} onChange={(e) => onChange({ ...data, dueDate: e.target.value })} />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={labelClass.replace('mb-1', '')}>Custom Fields</label>
          <button onClick={addField} className="flex items-center gap-1 text-xs font-bold text-black hover:text-gray-600 transition-colors">
            <Plus size={12} /> Add
          </button>
        </div>
        {(data.customFields || []).map((f, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className="flex-1 rounded-lg bg-white border border-gray-200 px-2 py-1.5 text-xs text-black placeholder-gray-400 focus:outline-none focus:border-black" value={f.key} onChange={(e) => updateField(i, 'key', e.target.value)} placeholder="Key" />
            <input className="flex-1 rounded-lg bg-white border border-gray-200 px-2 py-1.5 text-xs text-black placeholder-gray-400 focus:outline-none focus:border-black" value={f.value} onChange={(e) => updateField(i, 'value', e.target.value)} placeholder="Value" />
            <button onClick={() => removeField(i)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
          </div>
        ))}
        {(data.customFields || []).length === 0 && (
          <p className="text-xs text-gray-400 italic">No custom fields yet.</p>
        )}
      </div>
    </div>
  );
}
