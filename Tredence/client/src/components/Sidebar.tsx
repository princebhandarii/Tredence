import { Play, CheckSquare, Shield, Zap, StopCircle, GitBranch } from 'lucide-react';

const nodeTypes = [
  { type: 'start',         label: 'Start',          description: 'Entry point of the workflow',   icon: Play },
  { type: 'task',          label: 'Task',            description: 'Assign work to a team member', icon: CheckSquare },
  { type: 'approval',      label: 'Approval',        description: 'Request manager sign-off',      icon: Shield },
  { type: 'automatedStep', label: 'Automated Step',  description: 'Trigger an automated action',  icon: Zap },
  { type: 'end',           label: 'End',             description: 'Terminate the workflow',        icon: StopCircle },
];

export function Sidebar() {
  const onDragStart = (e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.setData('nodeType', nodeType);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-60 flex flex-col h-full overflow-y-auto bg-white border-r border-gray-200">
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
            <GitBranch size={15} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-black text-black tracking-widest uppercase">Tredence Designer</p>
           
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Node Palette</p>
        <p className="text-[10px] text-gray-400 mt-0.5">Drag nodes onto the canvas</p>
      </div>

      <div className="px-3 space-y-2 pb-6">
        {nodeTypes.map(({ type, label, description, icon: Icon }) => (
          <div
            key={type}
            draggable
            onDragStart={(e) => onDragStart(e, type)}
            className="rounded-lg p-3 cursor-grab active:cursor-grabbing border border-gray-200 bg-white hover:bg-gray-50 hover:border-black hover:shadow-md transition-all select-none"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black flex-shrink-0">
                <Icon size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-black leading-tight">{label}</p>
                <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto px-4 py-4 border-t border-gray-200">
        <p className="text-[10px] text-gray-400 text-center">Click a node to edit its properties</p>
      </div>
    </div>
  );
}
