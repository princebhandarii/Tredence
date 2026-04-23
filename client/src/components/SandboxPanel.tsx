import { X, CheckCircle, AlertTriangle, XCircle, Loader2, Play } from 'lucide-react';
import { useWorkflowStore } from '../store/workflowStore';

export function SandboxPanel() {
  const { simulationResult, isSimulating, setSandboxOpen } = useWorkflowStore();

  const statusIcon = (status: string) => {
    if (status === 'success') return <CheckCircle size={15} className="text-black flex-shrink-0" />;
    if (status === 'warning') return <AlertTriangle size={15} className="text-gray-500 flex-shrink-0" />;
    return <XCircle size={15} className="text-red-500 flex-shrink-0" />;
  };

  const statusBorder = (status: string) => {
    if (status === 'success') return 'border-gray-200 bg-gray-50';
    if (status === 'warning') return 'border-gray-300 bg-gray-100';
    return 'border-red-200 bg-red-50';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl border border-gray-200 shadow-2xl flex flex-col max-h-[80vh] bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
              <Play size={14} className="text-white fill-white" />
            </div>
            <div>
              <p className="text-base font-black text-black">Simulation Results</p>
              <p className="text-xs text-gray-400">Step-by-step workflow execution</p>
            </div>
          </div>
          <button onClick={() => setSandboxOpen(false)} className="text-gray-400 hover:text-black transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {isSimulating && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 size={28} className="text-black animate-spin" />
              <p className="text-gray-500 text-sm">Running simulation...</p>
            </div>
          )}

          {!isSimulating && simulationResult && (
            <>
              {simulationResult.errors.length > 0 && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-bold text-red-600 mb-2">❌ Validation Errors</p>
                  {simulationResult.errors.map((err, i) => (
                    <p key={i} className="text-xs text-red-500 leading-relaxed">{err}</p>
                  ))}
                </div>
              )}

              {simulationResult.valid && (
                <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-3 flex items-center gap-2">
                  <CheckCircle size={15} className="text-black" />
                  <p className="text-sm font-bold text-black">Workflow is valid and ready to run</p>
                </div>
              )}

              {simulationResult.steps.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Execution Steps</p>
                  {simulationResult.steps.map((step, i) => (
                    <div key={step.nodeId} className={`rounded-lg border px-4 py-3 ${statusBorder(step.status)}`}>
                      <div className="flex items-start gap-3">
                        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-black text-gray-400 w-4">{i + 1}</span>
                          {statusIcon(step.status)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-black">{step.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{step.message}</p>
                          <span className="inline-block mt-1.5 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-black text-white">
                            {step.nodeType}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {simulationResult.steps.length === 0 && (
                <p className="text-center text-gray-400 text-sm py-8">No steps to display. Add nodes to your workflow.</p>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <button
            onClick={() => setSandboxOpen(false)}
            className="w-full rounded-lg py-2.5 text-sm font-bold text-black border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
