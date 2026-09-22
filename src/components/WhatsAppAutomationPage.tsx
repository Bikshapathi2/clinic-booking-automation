import React, { useState } from 'react';
import type { WhatsAppMessage, WhatsAppConfig } from '../types';
import { 
  MessageSquare, 
  Zap, 
  CheckCircle2, 
  Smartphone, 
  ShieldCheck, 
  Copy,
  Check
} from 'lucide-react';

interface WhatsAppAutomationPageProps {
  messages: WhatsAppMessage[];
  config: WhatsAppConfig;
  onUpdateConfig: (config: WhatsAppConfig) => void;
  onOpenSimulator: () => void;
}

export const WhatsAppAutomationPage: React.FC<WhatsAppAutomationPageProps> = ({
  messages,
  config,
  onOpenSimulator
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="bg-[#0F111A] border border-emerald-500/30 rounded-2xl p-6 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glow-green">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-black font-extrabold shadow-lg">
            <MessageSquare className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                WHATSAPP BUSINESS AUTOMATION
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {config.mode === 'DEMO' ? 'DEMO MODE (SIMULATED)' : 'CLOUD API ACTIVE'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              WhatsApp Workflow Automations
            </h2>
          </div>
        </div>

        <button
          onClick={onOpenSimulator}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-emerald-400 to-green-400 hover:brightness-110 shadow-[0_0_20px_rgba(0,255,157,0.4)] transition-all flex items-center gap-2 cursor-pointer"
        >
          <Smartphone className="w-4 h-4 text-black" />
          <span>Open Phone WhatsApp Simulator</span>
        </button>
      </div>

      {/* Two Automation Trigger Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: APPOINTMENT CONFIRMATION */}
        <div className="bg-[#0F111A] border border-orange-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-orange-500/60 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold text-orange-400 px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/30">
              AUTOMATION #1
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ✓ Active
            </span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-400" />
            <span>APPOINTMENT CONFIRMATION</span>
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Automatically sends a WhatsApp booking confirmation when a patient schedules an appointment.
          </p>

          <div className="space-y-3 text-xs bg-[#161925] p-4 rounded-xl border border-white/5 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Trigger Event:</span>
              <span className="text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded">
                New appointment created
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Automated Action:</span>
              <span className="text-white font-medium">Send WhatsApp booking details</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Delivery Status:</span>
              <span className="text-emerald-400 font-bold">Instant (0ms delay)</span>
            </div>
          </div>

          {/* Template Box */}
          <div className="bg-[#090A12] p-3.5 rounded-xl border border-white/10 relative">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-2">
              <span>MESSAGE TEMPLATE PREVIEW</span>
              <button 
                onClick={() => handleCopyText(`Hello Rahul,\nYour clinic appointment has been successfully booked.\n\nDoctor: Dr. Anil Kumar\nDate: 21 September 2026\nTime: 6:00 PM\nAppointment ID: CB-1024`, 'tpl1')}
                className="hover:text-white flex items-center gap-1"
              >
                {copiedId === 'tpl1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'tpl1' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-[11px] text-emerald-300 font-mono leading-relaxed whitespace-pre-wrap">
{`"Hello Rahul,
Your clinic appointment has been successfully booked.

Doctor: Dr. Anil Kumar
Date: 21 September 2026
Time: 6:00 PM
Appointment ID: CB-1024

Please visit the clinic at your scheduled time.

Thank you,
Clinic Booking"`}
            </pre>
          </div>
        </div>

        {/* Card 2: ATTENDANCE VERIFICATION */}
        <div className="bg-[#0F111A] border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/60 transition-all glow-green">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
              AUTOMATION #2
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ✓ Active
            </span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>ATTENDANCE VERIFICATION</span>
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Automatically dispatches WhatsApp verification receipt as soon as clinic staff marks patient attendance.
          </p>

          <div className="space-y-3 text-xs bg-[#161925] p-4 rounded-xl border border-white/5 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Trigger Event:</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                Patient marked as ATTENDED
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Automated Action:</span>
              <span className="text-white font-medium">Send verified WhatsApp receipt</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Verification Indicator:</span>
              <span className="text-emerald-300 font-bold">Bright Neon Green ✓</span>
            </div>
          </div>

          {/* Template Box */}
          <div className="bg-[#090A12] p-3.5 rounded-xl border border-white/10 relative">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-2">
              <span>VERIFICATION TEMPLATE PREVIEW</span>
              <button 
                onClick={() => handleCopyText(`Hello Rahul Kumar,\n\nYour attendance at the clinic has been successfully verified.\n\nAppointment ID: CB-1024\nDate: 21 September 2026\nCheck-in Time: 5:54 PM\nStatus: VERIFIED ✓`, 'tpl2')}
                className="hover:text-white flex items-center gap-1"
              >
                {copiedId === 'tpl2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedId === 'tpl2' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-[11px] text-emerald-300 font-mono leading-relaxed whitespace-pre-wrap">
{`"Hello Rahul Kumar,

Your attendance at the clinic has been successfully verified.

Appointment ID: CB-1024
Date: 21 September 2026
Check-in Time: 5:54 PM
Status: VERIFIED ✓

Thank you for visiting us."`}
            </pre>
          </div>
        </div>

      </div>

      {/* WhatsApp Delivery Audit Log Feed */}
      <div className="bg-[#0F111A] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Recent WhatsApp Messages Dispatched ({messages.length})</span>
          </h3>
          <span className="text-xs text-slate-400">Live Delivery Log</span>
        </div>

        <div className="space-y-3">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className="bg-[#161925] p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{msg.patient_name}</span>
                    <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">
                      {msg.appointment_id}
                    </span>
                    <span className="text-[10px] text-slate-400">+91 {msg.phone}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-1 italic">
                    "{msg.message.split('\n')[0]}..."
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-[11px] text-slate-400 font-mono">{msg.sent_at}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  ✓ SENT
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
