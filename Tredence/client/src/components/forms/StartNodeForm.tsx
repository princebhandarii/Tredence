import { StartNodeData } from '../../types/workflow.types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  data: StartNodeData;
  onChange: (data: StartNodeData) => void;
}

const inputClass = "w-full rounded-lg bg-white border border-gray-200 px-3 py-2 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors";
const labelClass = "block text-xs font-black text-gray-500 uppercase tracking-wider mb-1";

export function StartNodeForm({ data, onChange }: Props) {
  const addMetadata = () => {
    onChange({ ...data, metadata: [...(data.metadata || []), { key: '', value: '' }] });
  };
  const removeMetadata = (i: number) => {
    onChange({ ...data, metadata: data.metadata.filter((_, idx) => idx !== i) });
  };
  const updateMetadata = (i: number, field: 'key' | 'value', val: string) => {
    const updated = data.metadata.map((m, idx) => (idx === i ? { ...m, [field]: val } : m));
    onChange({ ...data, metadata: updated });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClass}>Workflow Title</label>
        <input
          className={inputClass}
          value={data.title || ''}
          onChange={(e) => onChange({ ...data, title: e.target.value, label: e.target.value })}
          placeholder="e.g. New Employee Onboarding"
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={labelClass.replace('mb-1', '')}>Metadata</label>
          <button onClick={addMetadata} className="flex items-center gap-1 text-xs font-bold text-black hover:text-gray-600 transition-colors">
            <Plus size={12} /> Add
          </button>
        </div>
        {(data.metadata || []).map((m, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className="flex-1 rounded-lg bg-white border border-gray-200 px-2 py-1.5 text-xs text-black placeholder-gray-400 focus:outline-none focus:border-black" value={m.key} onChange={(e) => updateMetadata(i, 'key', e.target.value)} placeholder="Key" />
            <input className="flex-1 rounded-lg bg-white border border-gray-200 px-2 py-1.5 text-xs text-black placeholder-gray-400 focus:outline-none focus:border-black" value={m.value} onChange={(e) => updateMetadata(i, 'value', e.target.value)} placeholder="Value" />
            <button onClick={() => removeMetadata(i)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
          </div>
        ))}
        {(data.metadata || []).length === 0 && (
          <p className="text-xs text-gray-400 italic">No metadata yet. Click Add to create key-value pairs.</p>
        )}
      </div>
    </div>
  );
}
