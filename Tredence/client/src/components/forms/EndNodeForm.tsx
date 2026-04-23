import { EndNodeData } from '../../types/workflow.types';

interface Props {
  data: EndNodeData;
  onChange: (data: EndNodeData) => void;
}

const inputClass = "w-full rounded-lg bg-white border border-gray-200 px-3 py-2 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors";
const labelClass = "block text-xs font-black text-gray-500 uppercase tracking-wider mb-1";

export function EndNodeForm({ data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className={labelClass}>End Message</label>
        <textarea
          className={`${inputClass} resize-none h-24`}
          value={data.endMessage || ''}
          onChange={(e) => onChange({ ...data, endMessage: e.target.value })}
          placeholder="e.g. Onboarding process completed successfully."
        />
      </div>
      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
        <div>
          <p className="text-sm font-bold text-black">Generate Summary Report</p>
          <p className="text-xs text-gray-400">Auto-generate a summary on workflow end</p>
        </div>
        <button
          onClick={() => onChange({ ...data, summaryFlag: !data.summaryFlag })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data.summaryFlag ? 'bg-black' : 'bg-gray-200'}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${data.summaryFlag ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
    </div>
  );
}
