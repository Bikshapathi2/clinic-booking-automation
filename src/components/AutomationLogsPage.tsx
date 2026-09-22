import React, { useState } from 'react';
import type { AutomationLog } from '../types';
import { Activity, Clock, Search, CheckCircle2, ShieldCheck, MessageSquare, Calendar } from 'lucide-react';

interface AutomationLogsPageProps {
  logs: AutomationLog[];
}

export const AutomationLogsPage: React.FC<AutomationLogsPageProps> = ({ logs }) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.appointment_id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === 'ALL' || log.event_type === filterType;
    return matchesSearch && matchesType;
  });

  const getLogIcon = (type: AutomationLog['event_type']) => {
    switch (type) {
      case 'APPOINTMENT_CREATED':
        return <Calendar className="w-4 h-4 text-orange-400" />;
      case 'WHATSAPP_BOOKING_SENT':
      case 'WHATSAPP_VERIFICATION_SENT':
        return <MessageSquare className="w-4 h-4 text-emerald-400" />;
      case 'PATIENT_CHECKED_IN':
        return <Clock className="w-4 h-4 text-amber-400" />;
      case 'ATTENDANCE_VERIFIED':
        return <ShieldCheck className="w-4 h-4 text-emerald-300" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#0F111A] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-black font-extrabold shadow-lg">
            <Activity className="w-6 h-6 text-black" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              AUDIT & DISPATCH TRAIL
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Automation Execution Logs
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Real-time Timeline Logger</span>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-[#0F111A] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter logs by keyword, patient name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#161925] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-auto bg-[#161925] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-orange-500 cursor-pointer"
          >
            <option value="ALL">All Event Types</option>
            <option value="APPOINTMENT_CREATED">Appointment Created</option>
            <option value="WHATSAPP_BOOKING_SENT">WhatsApp Booking Sent</option>
            <option value="PATIENT_CHECKED_IN">Patient Checked In</option>
            <option value="ATTENDANCE_VERIFIED">Attendance Verified</option>
            <option value="WHATSAPP_VERIFICATION_SENT">WhatsApp Verification Sent</option>
          </select>
        </div>
      </div>

      {/* Timeline List */}
      <div className="bg-[#0F111A] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
        <div className="absolute left-9 top-8 bottom-8 w-0.5 bg-gradient-to-b from-orange-500 via-emerald-500 to-emerald-400 opacity-30 pointer-events-none" />

        <div className="space-y-6">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No automation logs match the filter criteria.
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div 
                key={log.id}
                className="relative pl-10 group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#161925]/60 hover:bg-[#161925] p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all"
              >
                {/* Timeline Bullet */}
                <div className="absolute left-1.5 top-5 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0F111A] border border-white/20 flex items-center justify-center shadow-md group-hover:border-emerald-400 transition-colors">
                  {getLogIcon(log.event_type)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold text-xs">✓</span>
                    <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                      {log.appointment_id}
                    </span>
                    <span className="text-xs font-bold text-white">{log.patient_name}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {log.description}
                  </p>
                </div>

                <div className="self-end sm:self-center">
                  <span className="text-[11px] font-mono font-semibold text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                    {log.timestamp}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
