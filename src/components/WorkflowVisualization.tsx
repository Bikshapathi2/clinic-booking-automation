import React, { useState } from 'react';
import { 
  CalendarCheck, 
  MessageSquare, 
  Database, 
  UserCheck, 
  ShieldCheck, 
  Send,
  Sparkles,
  Info,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface WorkflowVisualizationProps {
  activeStep: number | null;
  onSelectStep?: (step: number) => void;
  onRunDemoFlow: () => void;
  isSimulating: boolean;
}

export const WorkflowVisualization: React.FC<WorkflowVisualizationProps> = ({
  activeStep,
  onSelectStep,
  onRunDemoFlow,
  isSimulating
}) => {
  const [selectedStepModal, setSelectedStepModal] = useState<number | null>(null);

  const workflowSteps = [
    {
      id: 1,
      title: 'Appointment Booking',
      subtitle: 'Patient schedules appointment',
      icon: CalendarCheck,
      color: 'from-orange-500 to-amber-500',
      borderColor: 'border-orange-500/40',
      glowClass: 'shadow-[0_0_20px_rgba(249,115,22,0.25)]',
      badge: 'PATIENT',
      description: 'System receives booking via Web Portal or Staff desk. Patient details and scheduled time are registered.',
      details: ['Generates unique ID (e.g., CB-1024)', 'Validates doctor availability', 'Stores initial appointment status as BOOKED']
    },
    {
      id: 2,
      title: 'WhatsApp Message Sent',
      subtitle: 'Auto booking notification',
      icon: MessageSquare,
      color: 'from-emerald-500 to-teal-500',
      borderColor: 'border-emerald-500/40',
      glowClass: 'shadow-[0_0_20px_rgba(16,185,129,0.25)]',
      badge: '✓ Message Sent',
      description: 'Instant WhatsApp booking confirmation dispatch to patient with Doctor name, Date, Time, and Appointment ID.',
      details: ['Dispatches WhatsApp Cloud API payload', 'Shows "✓ Message Sent & Patient notified"', 'Displays green WhatsApp icon status']
    },
    {
      id: 3,
      title: 'Google Sheet / Database',
      subtitle: 'Supabase real-time record',
      icon: Database,
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/40',
      glowClass: 'shadow-[0_0_20px_rgba(59,130,246,0.25)]',
      badge: 'SYNCED',
      description: 'Stores record in PostgreSQL database / Google Sheet sync. Enables search, filter, edit, and staff view.',
      details: ['Real-time sync to Supabase DB', 'Searchable by Name, Phone or ID', 'Track check-in status & timestamps']
    },
    {
      id: 4,
      title: 'Patient Check-In Attendance',
      subtitle: 'Clinic staff marks arrival',
      icon: UserCheck,
      color: 'from-amber-500 to-orange-500',
      borderColor: 'border-amber-500/40',
      glowClass: 'shadow-[0_0_20px_rgba(245,158,11,0.25)]',
      badge: 'ATTENDANCE',
      description: 'When patient arrives at clinic desk, staff searches ID & clicks explicit [ MARK AS ATTENDED ] button.',
      details: ['Explicit staff click trigger', 'Captures exact current timestamp (e.g. 5:54 PM)', 'Updates Attendance Status to ATTENDED']
    },
    {
      id: 5,
      title: 'Verified Attendance',
      subtitle: 'Neon green status update',
      icon: ShieldCheck,
      color: 'from-emerald-400 to-green-500',
      borderColor: 'border-emerald-400',
      glowClass: 'shadow-[0_0_25px_rgba(0,255,157,0.35)]',
      badge: 'VERIFIED ✓',
      description: 'System automatically promotes status to VERIFIED with timestamped log audit trail.',
      details: ['Promotes status: BOOKED → ATTENDED → VERIFIED', 'Generates neon-green verification checkmark', 'Logs precise audit event']
    },
    {
      id: 6,
      title: 'WhatsApp Confirmation',
      subtitle: 'Auto attendance receipt',
      icon: Send,
      color: 'from-green-500 to-emerald-400',
      borderColor: 'border-green-400',
      glowClass: 'shadow-[0_0_25px_rgba(16,185,129,0.35)]',
      badge: '✓ CONFIRMED',
      description: 'Triggers automatic WhatsApp verification receipt: "Hello Rahul Kumar, Your attendance has been successfully verified..."',
      details: ['Triggers auto verification message', 'Shows final VERIFIED status indicator', 'Saves delivery status in database']
    }
  ];

  return (
    <div className="w-full bg-[#0F111A]/90 border border-white/10 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-2xl backdrop-blur-xl mb-8">
      
      {/* Background Subtle Gradient Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      {/* Header Banner inside Box */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
              CORE AUTOMATION WORKFLOW
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
            Clinic Booking & Attendance Verification Pipeline
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRunDemoFlow}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] ${
              isSimulating ? 'animate-pulse cursor-wait' : 'transform hover:scale-105'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSimulating ? 'SIMULATING WORKFLOW...' : 'RUN LIVE WORKFLOW TEST'}</span>
          </button>
        </div>
      </div>

      {/* Grid Flow Layout */}
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-3 items-stretch">
          {workflowSteps.map((step, idx) => {
            const StepIcon = step.icon;
            const isActive = activeStep === step.id;
            
            return (
              <React.Fragment key={step.id}>
                <div
                  onClick={() => {
                    if (onSelectStep) onSelectStep(step.id);
                    setSelectedStepModal(step.id);
                  }}
                  className={`group relative flex flex-col justify-between p-4 rounded-xl border transition-all cursor-pointer bg-[#161925]/90 hover:bg-[#1f2434] ${
                    isActive
                      ? `${step.borderColor} ${step.glowClass} scale-105 border-2 bg-gradient-to-b from-[#1a2035] to-[#0f111a]`
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {isActive && (
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_12px_#00ff9d] animate-ping" />
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                      STEP 0{step.id}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      step.id === 5 || step.id === 6 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    }`}>
                      {step.badge}
                    </span>
                  </div>

                  <div className="flex flex-col items-center text-center my-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${step.color} text-black font-bold mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                      <StepIcon className="w-6 h-6 text-black" />
                    </div>

                    <h3 className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {step.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-slate-200">
                    <span>Inspect</span>
                    <Info className="w-3 h-3 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {idx < workflowSteps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center -mx-2 pointer-events-none">
                    <div className="flex items-center justify-center text-slate-600">
                      <ArrowRight className={`w-5 h-5 ${activeStep === step.id ? 'text-emerald-400 animate-pulse' : 'text-slate-600'}`} />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Inspector Modal */}
      {selectedStepModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0F111A] border border-orange-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl relative glow-orange">
            {(() => {
              const step = workflowSteps.find(s => s.id === selectedStepModal)!;
              const StepIcon = step.icon;
              return (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${step.color} text-black font-bold`}>
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-orange-400 font-bold uppercase">
                          STAGE 0{step.id} INSIGHT
                        </span>
                        <h4 className="text-base font-bold text-white">{step.title}</h4>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedStepModal(null)}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 mb-4 bg-white/5 p-3 rounded-lg border border-white/10 leading-relaxed">
                    {step.description}
                  </p>

                  <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Automated Operations</span>
                  </h5>
                  <ul className="space-y-1.5 mb-6 text-xs text-slate-300">
                    {step.details.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 bg-[#161925] p-2 rounded border border-white/5">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedStepModal(null)}
                    className="w-full py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 transition-all"
                  >
                    Close Inspector
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
