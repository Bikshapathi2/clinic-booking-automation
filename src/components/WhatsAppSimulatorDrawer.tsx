import React from 'react';
import type { WhatsAppMessage } from '../types';
import { CheckCheck, X, ArrowLeft, Send } from 'lucide-react';

interface WhatsAppSimulatorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  message: WhatsAppMessage | null;
}

export const WhatsAppSimulatorDrawer: React.FC<WhatsAppSimulatorDrawerProps> = ({
  isOpen,
  onClose,
  message
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-[3rem] bg-[#0b141a] border-4 border-[#1f2c34] p-3 shadow-2xl glow-green overflow-hidden">
        
        {/* Phone Speaker Notch */}
        <div className="w-32 h-4 bg-[#1f2c34] rounded-b-xl mx-auto mb-2 flex items-center justify-center">
          <div className="w-10 h-1 bg-black/60 rounded-full" />
        </div>

        {/* WhatsApp App Bar */}
        <div className="bg-[#1f2c34] text-white px-3 py-2.5 rounded-t-2xl flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-1 text-slate-300 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs">
              CB
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">Clinic Booking</div>
              <div className="text-[9px] text-emerald-400 font-semibold">Official Verified Business ✓</div>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="bg-[#0b141a] p-4 min-h-[360px] max-h-[460px] overflow-y-auto flex flex-col justify-end space-y-3 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
          
          <div className="mx-auto text-[10px] bg-[#182229] text-amber-300 px-3 py-1 rounded-lg border border-amber-500/20 text-center max-w-[90%] font-medium">
            🔒 End-to-end encrypted. Clinic Booking Automation System
          </div>

          {message ? (
            <div className="self-start max-w-[90%] bg-[#005c4b] text-white p-3.5 rounded-2xl rounded-tl-none shadow-md space-y-2 border border-emerald-400/20">
              <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider flex items-center justify-between border-b border-white/10 pb-1">
                <span>{message.message_type.replace('_', ' ')}</span>
                <span className="text-[9px] text-emerald-200">DEMO PREVIEW</span>
              </div>

              <pre className="text-xs font-sans whitespace-pre-wrap leading-relaxed">
                {message.message}
              </pre>

              <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-200 pt-1">
                <span>{message.sent_at}</span>
                <CheckCheck className="w-3.5 h-3.5 text-cyan-300" />
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 text-xs py-8">
              No message selected. Select an appointment to preview WhatsApp receipt.
            </div>
          )}

        </div>

        {/* Fake Input Footer */}
        <div className="bg-[#1f2c34] p-2 rounded-b-2xl flex items-center gap-2 mt-2">
          <input 
            type="text" 
            disabled 
            placeholder="Type a reply..." 
            className="flex-1 bg-[#2a3942] rounded-full px-3 py-1.5 text-xs text-slate-400 cursor-not-allowed"
          />
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold">
            <Send className="w-4 h-4 text-black" />
          </div>
        </div>

      </div>
    </div>
  );
};
