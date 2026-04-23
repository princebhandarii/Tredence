import { useEffect, useRef } from 'react';
import { Node, Edge } from 'reactflow';
import { GitBranch, Play, Download, Undo2 } from 'lucide-react';
import { WorkflowCanvas } from './components/WorkflowCanvas';
import { Sidebar } from './components/Sidebar';
import { SandboxPanel } from './components/SandboxPanel';
import { useWorkflowStore } from './store/workflowStore';
import { fetchAutomations } from './api/mockApi';
import { useSimulate } from './hooks/useSimulate';
import { WorkflowNodeData } from './types/workflow.types';
import './index.css';

export default function App() {
  const { setAutomations, isSandboxOpen } = useWorkflowStore();
  const { runSimulation } = useSimulate();
  const flowStateRef = useRef<() => { nodes: Node<WorkflowNodeData>[]; edges: Edge[] }>(() => ({ nodes: [], edges: [] }));

  useEffect(() => {
    fetchAutomations()
      .then(setAutomations)
      .catch(() => console.warn('Backend not running – automation actions unavailable.'));
  }, [setAutomations]);

  const handleSimulate = () => {
    const { nodes, edges } = flowStateRef.current();
    runSimulation(nodes, edges);
  };

  const handleExportJson = () => {
    const { nodes, edges } = flowStateRef.current();
    const json = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hr-workflow.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Toolbar */}
      <header className="flex items-center justify-between px-5 py-3 flex-shrink-0 border-b border-gray-200 bg-white z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black shadow-sm">
            <GitBranch size={17} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-black text-black leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Tredence
            </h1>
            <p className="text-[10px] text-gray-400">Made By Prince Bhandari</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            title="Undo"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-black transition-all"
          >
            <Undo2 size={13} />
            Undo
          </button>

          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-black transition-all"
          >
            <Download size={13} />
            Export JSON
          </button>

          <button
            onClick={handleSimulate}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-black text-white bg-black hover:bg-gray-800 active:scale-95 transition-all shadow-sm"
          >
            <Play size={13} className="fill-white" />
            Run Simulation
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <WorkflowCanvas
          getFlowState={(getter) => {
            flowStateRef.current = getter;
          }}
        />
      </div>

      {isSandboxOpen && <SandboxPanel />}
    </div>
  );
}
